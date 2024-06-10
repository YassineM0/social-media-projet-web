"use client";
import React, { useEffect, useState } from "react";
import AuthGuard from "../components/AuthGuard";
import SideBar from "../components/SideBar";
import Profile from "../components/Profile";
import Feed from "../components/Feed";
import SearchColumn from "../components/SearchColumn";
import LastColumn from "../components/LastColumn";
import { useAuthContext } from "../context/authContext";

const Page = () => {
  const { token } = useAuthContext();
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      console.log("Token:", token);
      const response = await fetch(`http://localhost:4001/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsers(data)
      console.log("fetch users", data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  useEffect(() => {
    console.log("users::", users);
  }, [users]);
  const bufferToBase64 = (buffer) => {
    const base64String = Buffer.from(buffer).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };
  const currentUser = JSON.parse(localStorage.getItem('userInfo'))
  let curentUserProfil = currentUser.user.profilePicture.data.data;
  curentUserProfil= curentUserProfil ? bufferToBase64(curentUserProfil) : "";
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
            <SearchColumn className="" users={users} />
          </div>
          <div className="w-1/2 flex justify-center m-auto mt-0 translate-x-0.7">
            <Feed className="" />
          </div>
          <div className="w-1/5 flex flex-col items-center fixed right-1 max-w-6">
            <LastColumn className="" />
            <Profile curentUserProfil={curentUserProfil} currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
