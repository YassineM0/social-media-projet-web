"use client";
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
  const bufferToBase64 = (buffer) => {
    const base64String = Buffer.from(buffer).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };


  const currentUser = JSON.parse(localStorage.getItem('userInfo'))
  let curentUserProfil = currentUser.user.profilePicture.data.data;
  curentUserProfil= curentUserProfil ? bufferToBase64(curentUserProfil) : "";

  return (
    <div
      className="bg-cover bg-center h-screen flex w-screen overflow-y-auto "
      style={{ backgroundImage: "url('zlijj.png')" }}
    >
      <div className="w-3 fixed top-0 h-screen">
        <SideBar />
      </div>
      <div className="flex ml-3.5 w-screen">
        <ProfileHeader1 buffer={bufferToBase64} currentUser={currentUser} currentUserProfil={curentUserProfil} />
      </div>
    </div>
  );
};

export default Page;
