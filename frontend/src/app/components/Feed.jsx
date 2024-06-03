"use client";
import React, { useEffect, useState } from "react";
import Poste from "../components/Poste";
import PostFeature from "./PostFeature";
import { usePostContext } from "../context/postsContext";
import { useAuthContext } from "../context/authContext";

const Feed = () => {
  const { userId } = useAuthContext();
  const { posts, fetchPosts } = usePostContext();
  const [likes, setLikes] = useState(0);
  useEffect(() => {
    if (userId) {
      fetchPosts(userId);
    }
  }, [posts, userId]);

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <PostFeature/>
      <div className="">
        {posts.map((post) => (
          <Poste
            key={post._id}
            name={post.userId.lastName}
            caption={post.description}
            profilePic={post.userId.profilePicture.data.data}
            src={post.postPicture}
            likes={likes}
            setLikes = {setLikes}
            post = {post}
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
