"use client";

import { SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateGroupName, setUpdateGroupName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState();
  const [renameLoading, setRenameLoading] = useState(false);

  const toast = useToast();
  const { selectedChat, setSelectedChat, userInfo } = ChatState();

  const handleRemove = async (user) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        "http://localhost:4001/api/chat/groupRemove",
        { userId: user._id, chatId: selectedChat._id },
        config
      );

      user._id === userInfo.user._id
        ? setSelectedChat()
        : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      // fetchMessages()
      setLoading(false);
    } catch (error) {
      toast({
        title: `Error Occured when removing User. ${error.response.data}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!updateGroupName) return;

    setRenameLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        "http://localhost:4001/api/chat/rename",
        { groupId: selectedChat._id, newGroupName: updateGroupName },
        config
      );
      setSelectedChat(data); //Because the old chat has an old group name
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
      onClose();
      toast({
        title: "The Group is Updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error Occured when Renaming the Group",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false);
    }
    setUpdateGroupName("");
  };

  const handleSearch = async (query) => {
    if (!query) return;

    setSearch(query);

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:4001/api/users?search=${search}`,
        config
      );

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error)
      toast({
        title: "Error Occured",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleAddUser = async (user) => {
    if (selectedChat.users.find((u) => u._id === user._id)) {
      toast({
        title: "User is Already in Group",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== userInfo.user._id) {
      toast({
        title: "Only Admin can add someone",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        "http://localhost:4001/api/chat/groupAdd",
        {
          chatId: selectedChat._id,
          userId: user._id,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: `Error Occured when adding a new user. ${error.response.data}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setLoading(false);
    }
  };

  return (
    <>
      <IconButton onClick={onOpen} icon={<SettingsIcon />} />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"30px"}
            fontFamily={"Work sans"}
            d="flex"
            textAlign={"center"}
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              {selectedChat.users.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleRemove(user)}
                />
              ))}
            </Box>
            <Flex d="flex" alignItems="center" mt={3}>
              <Input
                placeholder="Update the Group Name"
                value={updateGroupName}
                onChange={(e) => setUpdateGroupName(e.target.value)}
                flex="1"
                mr={2}
              />
              <Button
                variant={"solid"}
                colorScheme="teal"
                ml={2}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </Flex>
            <FormControl>
              <Input
                placeholder="Add User to group"
                my={3}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Spinner size={"lg"} />
            ) : (
              searchResult?.map((user) => {
                return (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={handleAddUser}
                  />
                );
              })
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => handleRemove(userInfo.user)}
              colorScheme="red"
            >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
