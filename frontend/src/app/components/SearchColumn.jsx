"use client";
import React from "react";
import { CiSearch } from "react-icons/ci";
import ProfileCard from "./ProfileCard";

const SearchRow = ({ users }) => {
  const rec = [
    {
      name: "katarina mid",
      src: "/katarina.png",
    },
    {
      name: "tarik support",
      src: "/tarik.png",
    },
    {
      name: "lux mid",
      src: "/lux.png",
    },
    {
      name: "ezreal adc",
      src: "/ezreal.png",
    },
  ];
  const bufferToBase64 = (buffer) => {
    const base64String = Buffer.from(buffer).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };
  console.log(users);
  return (
    <div className="mt-1.5 w-full">
      <div className="">
        <img src="/AtlasNet.png" alt="" className="w-4.25 m-auto" />
      </div>
      <div className="flex align-items w-full border-3 border-gray2 p-1.15 mt-1 h-10 bg-white rounded-mdd">
        <img src="Search.png" size={25} className="mr-1 ml-0.5" />
        <input
          type=""
          className="w-[80%] px-1 focus:outline-none"
          placeholder="search ..."
        />
      </div>
      <div className="mt-0.7 py-1 border-3 border-gray2 bg-white rounded-mdd px-2.15">
        <h2 className="text-183153 font-bold pb-1.5 pt-2">
          Add to your friend list
        </h2>
        {users.map((user, index) => (
          <ProfileCard
            key={index}
            image={bufferToBase64(user.profilePicture.data.data)}
            name={user.firstName}
            lastName={user.lastName}
            friendId={user._id}
            friends={user.friends}
          />
        ))}
        <p className="text-center text-gray-500">view all</p>
      </div>
    </div>
  );
};

export default SearchRow;
