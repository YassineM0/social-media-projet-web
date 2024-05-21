'use client'
import React from "react";
import { useEffect } from "react";
import SideBar from "../components/SideBar";
import LastColumn from "../components/LastColumn";
import Feed from "../components/Feed";
import ProfileHeader1 from "../components/ProfileHeader1";
import Poste from "../components/Poste";
import { usePostContext } from "../context/postsContext";
import { useAuthContext } from "../context/authContext";

const Page = () => {
  const {profilePosts, fetchProfilePosts} = usePostContext();
  const {userId} = useAuthContext();
  useEffect(() => {
    console.log(userId);
    console.log(profilePosts);
    if (userId) {
      fetchProfilePosts(userId);
    }
  }, [profilePosts, userId]);

  return (
    <div className="bg-cover bg-center bg-scroll bg-gray3 flex flex-col h-fit "  style={{backgroundImage: "url('zlijj.png')"}}>
      <div className='flex '>
        <div className="w-5 sticky h-fit  top-0 ">
          <SideBar /> 
        </div>

          <ProfileHeader1 />
          <div>
          {profilePosts.map((post) => (
          <Poste
            key={post._id}
            name={post.userId.lastName}
            caption={post.description}
            profilePic=""
            src={post.picturePath}
            likes={Object.keys(post.likes).length}
            comments=""
            share=""
          />
        ))}
          </div>
      </div>
    </div>
  );
};

export default Page;
