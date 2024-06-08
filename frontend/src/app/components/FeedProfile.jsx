"use client";
import React, { useEffect, useState } from "react";
import Poste from "../components/Poste";
import PostFeature from "./PostFeature";
import { usePostContext } from "../context/postsContext";
import { useAuthContext } from "../context/authContext";

const FeedProfile = ({ buffer }) => {
  const { userId } = useAuthContext();
  const { profilePosts, fetchProfilePosts } = usePostContext();

  useEffect(() => {
    if (userId) {
      fetchProfilePosts(userId);
    }
  }, [profilePosts, userId]);


  const currentUser = JSON.parse(localStorage.getItem('userInfo'))
  let curentUserProfil = currentUser.user.profilePicture.data.data;
  curentUserProfil= curentUserProfil ? buffer(curentUserProfil) : "";
  return (
    <div className="flex flex-col w-10">
      <PostFeature
        currentUser={currentUser}
        curentUserProfil={curentUserProfil}
      />
      <div className="">
        {profilePosts.map((post) => (
          <Poste
            key={post._id}
            name={post.userId.lastName}
            caption={post.description}
            profilePic={post.userId.profilePicture.data.data}
            src={post.postPicture}
            likes={Object.keys(post.likes).length}
            postId={post._id}
            post = {post}
            commentList={post.comments}
            currentUser={currentUser}
            curentUserProfil={curentUserProfil}
            buffer={buffer}
            share=""
          />
        ))}
      </div>
    </div>
  );
};

export default FeedProfile;
