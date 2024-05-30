"use client";
import React, { useEffect, useState } from "react";
import LastColumn from "../components/LastColumn";
import Feed from "./Feed";
import { useAuthContext } from "../context/authContext";

const ProfileHeader1 = () => {
  const { userId } = useAuthContext();
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const response = await fetch(
            `http://localhost:4001/api/users/${userId}`
          );
          const data = await response.json();
          setUser(data);
          setEditableData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData({ ...editableData, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editableData),
        }
      );
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsEditing(false);
      } else {
        console.error("Failed to save user data");
      }
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-5 w-auto mx-1.5 mt-1.5 ">
        <img
          src="/defaultBackground.png"
          className="w-full h-full rounded-3xl object-cover"
        />
        <div className="absolute bottom-0 right-2 translate-y-1/2 ">
          <img
            src="tarik.png"
            className="w-4 h-4 rounded-full border-4 border-gray"
          />
        </div>
        <div className="flex float-right mr-56 space-x-1">
          <div className=" bg-gray1 text-center w-3 h-1 text-white hover:bg-blue hover:text-black hover:tracking-wider rounded-md       transition-smooth duration-500 p-1 right-7 translate-y-1/2 ">
            <button
              className="inline text-sm font-sans"
              onClick={handleEditClick}
            >
              Edit Profile
            </button>
          </div>
          <div className=" right-4.25 translate-y-1/4 text-3xl font-bold text-gray-800  ">
            <h1 className="inline">{`${user.firstName} ${user.lastName}`}</h1>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className=" flex flex-col mx-2 ">
          <div className="bg-white border-3 border-gray2 rounded-mdd  mx-2 mt-4 w-10 h-fit ">
            <div className="font-bold text-2xl mt-1 text-gray-800 ml-1 ">
              <h1>About me</h1>
            </div>
            <div className="m-1 font-sans text-gray-600">
              {isEditing ? (
                <textarea
                  name="bioContent"
                  value={editableData.bioContent}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              ) : (
                <p>{user.bioContent || "makaynch bio."}</p>
              )}
            </div>
          </div>
          <div className="mx-2">
            <Feed />
          </div>
        </div>
        <div className="flex flex-col mr-2 ">
          <div className="flex flex-col items-center w-4.5 p-2 bg-white border-3 border-gray2 rounded-mdd space-y-2 ml-3  mt-4 h-fit ">
            <div className="flex flex-col space-y-1 text-center w-full">
              <div className="border-b-2 border-gray3 pb-2 ">
                <p className="text-sm text-gray2">Date of Birth:</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="dateOfBirth"
                    value={editableData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-700">
                    {user.dateOfBirth}
                  </p>
                )}
              </div>
              <div className="border-b-2 border-gray3 pb-2">
                <p className="text-sm text-gray2">Location:</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={editableData.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-700">
                    {user.location}
                  </p>
                )}
              </div>
              <div className="">
                <p className="text-sm text-gray2">Occupation:</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="occupation"
                    value={editableData.occupation}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-700">
                    {user.occupation}
                  </p>
                )}
              </div>
            </div>
          </div>
          {isEditing && (
            <div className="mt-2 flex justify-center">
              <button
                onClick={handleSaveClick}
                className=" bg-gray1 text-center w-3 h-1 text-white hover:bg-blue hover:text-black hover:tracking-wider rounded-md       transition-smooth duration-500 p-1"
              >
                Save
              </button>
            </div>
          )}
          <div className="mt-1 mr-3 w-5.5">
            <LastColumn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader1;
