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

  return (
    <div
      className="bg-repeat		"
      style={{ backgroundImage: "url('zlijj.png')" }}
    >
      <div className="flex ">
        <div className="w-2.5 sticky h-fit  top-0 ">
          <SideBar />
        </div>
        <ProfileHeader1 />
      </div>
    </div>
  );
};

export default Page;
