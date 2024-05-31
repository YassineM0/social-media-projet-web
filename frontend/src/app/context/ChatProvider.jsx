"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const router = useRouter(); 
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(data);

    if (!data) {
      router.push("/"); 
    }
  }, [router]);

  return (
    <ChatContext.Provider
      value={{
        userInfo,
        setUserInfo,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
