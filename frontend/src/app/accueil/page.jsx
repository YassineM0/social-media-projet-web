"use client";
import React, { useEffect } from "react";
import AuthGuard from "../components/AuthGuard";
import SideBar from "../components/SideBar";
import Profile from "../components/Profile";
import Feed from "../components/Feed";
import SearchColumn from "../components/SearchColumn";
import LastColumn from "../components/LastColumn";
import { useRouter } from "next/navigation";



const Page = () => {
  const router = useRouter()
  useEffect(() => {
    const data = localStorage.getItem("authToken");

    if (!data) {
      router.push("/"); 
    }
  },[])
  return (
    <div
      className="bg-cover bg-center h-screen flex"
      style={{ backgroundImage: "url('zlijj.png')" }}
    >
      <div className="w-3 fixed top-0 h-screen ">
        <SideBar />
      </div>
      <div className=" ml-3 overflow-y-auto grid-cols-1 w-screen">
        <div className="flex flex-row h-full">
          <div className="w-1/4 fixed z-50">
            <SearchColumn className="" />
          </div>
          <div className="w-1/2 flex justify-center m-auto mt-0 translate-x-0.7">
            <Feed />
          </div>
          <div className="w-1/5 flex flex-col items-center fixed right-1  ">
            <LastColumn className="" />
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
