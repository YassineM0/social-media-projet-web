"use client";
import React, { useEffect, useState } from "react";
import Poste from "../components/Poste";
import PostFeature from "./PostFeature";
import { usePostContext } from "../context/postsContext";
import { useAuthContext } from "../context/authContext";

const Feed = () => {
  const { userId } = useAuthContext();
  const { posts, fetchPosts } = usePostContext();

  useEffect(() => {
    if (userId) {
      fetchPosts(userId);
    }
  }, [posts, userId]);

  return (
    <div className="flex flex-col w-10">
      <PostFeature />
      <div className="">
        {posts.map((post) => (
          <Poste
            key={post._id}
            name={post.userId.lastName}
            caption={post.description}
            profilePic=""
            src={post.postPicture}
            likes={post.likes ? Object.keys(post.likes).length : 0}
            postId={post._id}
            commentList={post.comments}
            share=""
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
