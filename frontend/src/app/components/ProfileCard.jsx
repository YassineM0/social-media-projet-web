
import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/authContext";

const ProfileCard = ({ name, image, lastName, friendId, friends }) => {
  const { userId, token } = useAuthContext();
  const [isFriend, setIsFriend] = useState();

  useEffect(() => {
    const isFriendUpdated = friends.includes(friendId);
    setIsFriend(isFriendUpdated);
    console.log("Friends array:", friends);
    console.log("Friend ID to check:", friendId);
    console.log("isFriend:", isFriendUpdated);
  }, [friends, friendId]);

  const handleFriendToggle = async () => {
    try {
      await fetch(`http://localhost:4001/api/users/${userId}/${friendId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setIsFriend((prevIsFriend) => !prevIsFriend);
    } catch (error) {
      console.error("Error toggling friend status:", error);
    }
  };



  return (
    <div className="flex gap-0.5 pt-1 pb-1.5 border-b-2 ">
      <img src={image} alt="" className="w-1.25 rounded-lg" />
      <div className="">
      <h6 className="font-bold">
          {name} {lastName}
        </h6>
        <button
          className="text-sm font-medium  pl-1.15 pr-1.15  bg-gray3 rounded-md"
          onClick={handleFriendToggle}
        >
          {isFriend ? "Remove friend" : "Add now"}
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
