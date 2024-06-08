"use client";

import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import GroupChatModel from "./Diverse/GroupChatModel";

const MyChats = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, userInfo, chats, setChats } =
    ChatState();

  const { token } = userInfo;

  const toast = useToast();

    const sender = (chat) => {
      return chat.users[0]._id == userInfo.user._id
        ? chat.users[1].firstName
        : chat.users[0].firstName;
    };

  const fetchChats = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {

      const { data } = await axios.get(
        "http://localhost:4001/api/chat",
        config
      );
      console.log(data)
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured when fetching chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      className="border-gray2 border-3 rounded-mdd mt-1"
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir={"column"}
      alignItems={"center"}
      p={3}
      bg={"white"}
      w={{ base: "100%", md: "31%" }}
    >
      <Box
        pb={3}
        px={2}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily={"Work sans"}
        d="flex"
        w={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        My chats
        <GroupChatModel fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}>
          <Button
            d="flex"
            ml={6}
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModel>
      </Box>
      <div
        d="flex"
        flexDir={"column"}
        p={3}
        //bg={"#F8F8F8"}
        w="100%"
        className="h-fit max-h-8 overflow-y-auto"
        borderRadius="lg"
        // overflowY="auto"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY={"auto"} maxHeight="420px">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor={"pointer"}
                _hover={
                  !selectedChat && {
                    background: "#BEE3F8",
                    color: "black",
                  }
                }
                bg={selectedChat === chat ? "#BEE3F8" : "#E8E8E8"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>{!chat.isGroupChat ? sender(chat) : chat.chatName}</Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </div>
    </Box>
  );
};

export default MyChats;
