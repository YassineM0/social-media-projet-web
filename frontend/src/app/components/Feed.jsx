"use client";
import React, { useEffect, useState } from "react";
import Poste from "../components/Poste";
import PostFeature from "./PostFeature";
import { usePostContext } from "../context/postsContext";
import { useAuthContext } from "../context/authContext";
import { useDataContexte } from "../page";

const Feed = () => {
  const { userId } = useAuthContext();
  const { posts, fetchPosts } = usePostContext();
  const [likes, setLikes] = useState(0);
  useEffect(() => {
    if (userId) {
      fetchPosts(userId);
    }
  }, [posts, userId]);  
  const bufferToBase64 = (buffer) => {
    const base64String = Buffer.from(buffer).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };


  const currentUser = JSON.parse(localStorage.getItem('userInfo'))
  let curentUserProfil = currentUser.user.profilePicture.data.data;
  curentUserProfil= curentUserProfil ? bufferToBase64(curentUserProfil) : "";
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <PostFeature curentUserProfil={curentUserProfil} />
      <div className="">
        {posts.map((post) => (
          <Poste
            key={post._id}
            name={post.userId.lastName}
            caption={post.description}
            profilePic={post.userId.profilePicture.data.data}
            src={post.postPicture}
            likes={Object.keys(post.likes).length}
            setLikes = {setLikes}
            post = {post}
            postId={post._id}
            commentList={post.comments}
            currentUser={currentUser}
            buffer={bufferToBase64}
            curentUserProfil={curentUserProfil}
            share=""
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
