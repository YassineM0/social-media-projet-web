"use client";
import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/Diverse/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import SideBar from "../components/SideBar";

const Page = () => {
  const { userInfo } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div
      className="bg-cover bg-center h-screen w-screen overflow-y-hidden fixed"
      style={{backgroundImage: "url('zlijj.png')" }}
    >
      <div className="w-3 fixed top-0 h-screen">
        <SideBar />
      </div>
      <div className="ml-3.5 mt-1">
        {userInfo && <SideDrawer />}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          width="98%"
          height="87vh"
        >
          {userInfo && (
            <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
          {userInfo && (
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Box>
      </div>
    </div>
  );
};

export default Page;
