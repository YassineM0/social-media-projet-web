"use client";

import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import UpdateGroupChatModal from "./Diverse/UpdateGroupChatModal";
import axios from "axios";
import "./styles.css";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4001";
let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { userInfo, selectedChat, setSelectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);

  const toast = useToast();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:4001/api/message/${selectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);

    } catch (error) {
      toast({
        title: `Error Occured when fetching messages. ${error.response.data}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (newMessage) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.post(
          "http://localhost:4001/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        setNewMessage("");
        socket.emit("new message", data); 
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: `Error Occured when sending message. ${error.response.data}`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  
useEffect(()=>{
  socket= io(ENDPOINT) 
  socket.emit("setup", userInfo.user)
  socket.on("connection", ()=>{setSocketConnected(true)})
}, [])

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //give notification
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  return (
    <>
      {selectedChat ? (
        <>
          <Flex
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily={"Work sans"}
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex alignItems="center">
              <IconButton
                d={{ base: "flex", md: "none" }}
                mr={5}
                icon={<ArrowBackIcon />}
                onClick={() => setSelectedChat("")}
              />
              {!selectedChat.isGroupChat ? (
                <Text>
                  {selectedChat.users[0]._id == userInfo.user._id
                    ? selectedChat.users[1].firstName
                    : selectedChat.users[0].firstName}
                </Text>
              ) : (
                <Text>{selectedChat.chatName}</Text>
              )}
            </Flex>
            {selectedChat.isGroupChat && (
              <Box ml="auto">
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </Box>
            )}
          </Flex>
          <Flex
            flexDir="column"
            p={3}
            //bg={"#E8E8E8"}
            className="bg-contain"
            style={{ backgroundImage: "url('chatBackground.jpg')" }}
            w="100%"
            h="90%"
            borderRadius={"lg"}
            overflowY="hidden"
          >
            {loading ? (
              <Center flex="1">
                <Spinner size={"xl"} w={20} h={20} />
              </Center>
            ) : (
              <Box flex="1" overflowY="auto">
                <div className="messages">
                  <ScrollableChat messages={messages} />
                </div>
              </Box>
            )}

            <Flex mt={3}>
              <Input
                className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                variant={"filled"}
                bg={"white"}
                value={newMessage}
                placeholder="Enter a message..."
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(event) => {
                  if (event.key === "Enter") sendMessage();
                }}
              />
              <Button onClick={sendMessage} ml={3}>
                Send
              </Button>
            </Flex>
          </Flex>
        </>
      ) : (
        <Center height="81vh" className="">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Center>
      )}
    </>
  );
};

export default SingleChat;
