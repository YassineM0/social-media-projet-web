"use client";
import React from "react";
import AuthGuard from "../components/AuthGuard";
import SideBar from "../components/SideBar";
import Profile from "../components/Profile";
import Feed from "../components/Feed";
import SearchColumn from "../components/SearchColumn";
import LastColumn from "../components/LastColumn";

const Page = () => {
  return (
    <div
      className="bg-cover bg-center h-screen flex w-screen"
      style={{ backgroundImage: "url('zlijj.png')" }}
    >
      <div className="w-3 fixed top-0 h-screen">
        <SideBar />
      </div>
      <div className=" ml-3.5 overflow-y-auto grid-cols-1 w-screen">
        <div className="flex flex-row h-full">
          <div className="w-1/5 fixed  max-w-6 min-w-2">
            <SearchColumn className="" />
          </div>
          <div className="w-1/2 flex justify-center m-auto mt-0 translate-x-0.7">
            <Feed className="" />
          </div>
          <div className="w-1/5 flex flex-col items-center fixed right-1 max-w-6">
            <LastColumn className="" />
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
