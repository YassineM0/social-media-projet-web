
import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/authContext";
import { useToast } from "@chakra-ui/react";


const ProfileCard = ({ name, image, lastName, friendId, friends }) => {
  const { userId, token } = useAuthContext();
  const [isFriend, setIsFriend] = useState();
  const toast = useToast();

  useEffect(() => {
    const isFriendUpdated = friends.includes(friendId);
    setIsFriend(isFriendUpdated);
    console.log("Friends array:", friends);
    console.log("Friend ID to check:", friendId);
    console.log("isFriend:", isFriendUpdated);
  }, [friends, friendId]);

  const handleFriendToggle = async () => {
    try {
      const response = await fetch(`http://localhost:4001/api/users/${userId}/${friendId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(userId, friendId);
      setIsFriend((prevIsFriend) => !prevIsFriend);
      const data = await response.json();
      if (response.ok) {
        toast({
          title: `${data.message}`,
          description: "Your Post has been updated successfuly.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
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
