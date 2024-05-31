"use client";
import React, { useEffect, useState } from "react";
import Poste from "../components/Poste";
import PostFeature from "./PostFeature";
import { usePostContext } from "../context/postsContext";
import { useAuthContext } from "../context/authContext";

const FeedProfile = () => {
  const { userId } = useAuthContext();
  const { profilePosts, fetchProfilePosts } = usePostContext();

  useEffect(() => {
    console.log(userId);
    console.log(profilePosts);
    if (userId) {
        fetchProfilePosts(userId);
    }
  }, [profilePosts, userId]);

  return (
    <div className="flex flex-col w-10">
      <PostFeature/>
      <div className="">
        {profilePosts.map((post) => (
          <Poste
            key={post._id}
            name={post.userId.lastName}
            caption={post.description}
            profilePic=""
            src={post.postPicture}
            likes={Object.keys(post.likes).length}
            postId={post._id}
            commentList={post.comments}
            share=""
          />
        ))}
      </div>
    </div>
  );
};

export default FeedProfile;
