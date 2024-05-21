"use client";
import React, { createContext, useState, useContext } from "react";

const PostContext = createContext();

export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [profilePosts, setProfilePosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`http://localhost:4001/api/posts/`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const fetchProfilePosts = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4001/api/posts/${userId}`);
      const data = await response.json();
      setProfilePosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <PostContext.Provider value={{ posts, fetchPosts, profilePosts,fetchProfilePosts }}>
      {children}
    </PostContext.Provider>
  );
};
