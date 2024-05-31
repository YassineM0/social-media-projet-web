"use client";
import React, { useEffect, useState } from "react";
import LastColumn from "../components/LastColumn";
import FeedProfile from "./FeedProfile";
import { useAuthContext } from "../context/authContext";

const ProfileHeader1 = () => {
  const { userId, token } = useAuthContext();
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingField, setEditingField] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const response = await fetch(
            `http://localhost:4001/api/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          setUser(data);
          setEditableData(data);
          setFullName(`${data.firstName} ${data.lastName}`);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [userId, token]);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleFieldSelect = (field) => {
    setEditingField(field);
    setIsEditing(true);
    if (field === "fullName") {
      setFullName(`${editableData.firstName} ${editableData.lastName}`);
    }
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData({ ...editableData, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts.slice(0, -1).join(" ");
      const lastName = nameParts.slice(-1).join(" ");
      const updatedData = {
        ...editableData,
        firstName,
        lastName,
      };
      const response = await fetch(
        `http://localhost:4001/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setEditableData(updatedUser);
        setFullName(`${updatedUser.firstName} ${updatedUser.lastName}`);
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        console.error("Failed to save user data", errorData);
        window.location.reload(); // à supprimer
      }
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-5 w-auto mx-1.5 mt-1.5 ">
        <img
          src="im11.jpg"
          className="w-full h-full rounded-3xl object-cover"
        />
        <div className="absolute bottom-0 right-2 translate-y-1/2 ">
          <img
            src="tarik.png"
            className="w-4 h-4 rounded-full border-4 border-gray"
          />
        </div>
        <div className="flex float-right mr-56 space-x-1">
          <div className="bg-gray1 text-center w-3 h-1 text-white hover:bg-blue hover:text-black hover:tracking-wider rounded-md transition-smooth duration-500 p-1 right-7 translate-y-1/2 ">
            <button
              className="inline text-sm font-sans"
              onClick={handleEditClick}
            >
              Edit Profile
            </button>
          </div>
          <div className="right-4.25 translate-y-1/4 text-3xl font-bold text-gray-800">
            {isEditing && editingField === "fullName" ? (
              <input
                type="text"
                value={fullName}
                onChange={handleFullNameChange}
                className="w-full p-2 border rounded"
              />
            ) : (
              <h1 className="inline">{`${user.firstName} ${user.lastName}`}</h1>
            )}
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="flex flex-col mx-2">
          <div className="bg-white border-3 border-gray2 rounded-mdd mx-2 mt-4 w-10 h-fit">
            <div className="font-bold text-2xl mt-1 text-gray-800 ml-1">
              <h1>About me</h1>
            </div>
            <div className="m-1 font-sans text-gray-600">
              {isEditing && editingField === "bioContent" ? (
                <textarea
                  name="bioContent"
                  value={editableData.bioContent}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              ) : (
                <p>{user.bioContent || "Pas de bio."}</p>
              )}
            </div>
          </div>
          <div className="mx-2">
            <FeedProfile />
          </div>
        </div>
        <div className="flex flex-col mr-5">
          <div className="flex flex-col items-center p-2 bg-white border-3 border-gray2 rounded-mdd space-y-2 mt-4 h-fit">
            <div className="flex flex-col space-y-1 text-center w-full">
              <div className="border-b-2 border-gray3 pb-2">
                <p className="text-sm text-gray2">Date of Birth:</p>
                {isEditing && editingField === "dateOfBirth" ? (
                  <input
                    type="text"
                    name="dateOfBirth"
                    value={editableData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-700">
                    {user.dateOfBirth || ""}
                  </p>
                )}
              </div>
              <div className="border-b-2 border-gray3 pb-2">
                <p className="text-sm text-gray2">Location:</p>
                {isEditing && editingField === "location" ? (
                  <input
                    type="text"
                    name="location"
                    value={editableData.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-700">
                    {user.location || ""}
                  </p>
                )}
              </div>
              <div className="">
                <p className="text-sm text-gray2">Occupation:</p>
                {isEditing && editingField === "occupation" ? (
                  <input
                    type="text"
                    name="occupation"
                    value={editableData.occupation}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-700">
                    {user.occupation || ""}
                  </p>
                )}
              </div>
            </div>
          </div>
          {isEditing && (
            <div className="flex justify-center">
              <button
                onClick={handleSaveClick}
                className="bg-gray1 text-center w-3 h-1 text-white hover:bg-blue hover:text-black hover:tracking-wider rounded-md transition-smooth duration-500 p-1 right-7 translate-y-1/2 "
              >
                Save
              </button>
            </div>
          )}
          <div className="mt-1">
            <LastColumn />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white h-fit p-2 rounded-2xl w-5">
            <h2 className="text-xl mb-2">Edit Profile</h2>
            <div className="flex flex-col space-y-1">
              <button
                className="text-left p-2 border rounded hover:bg-gray-200"
                onClick={() => handleFieldSelect("fullName")}
              >
                Full Name
              </button>
              <button
                className="text-left p-2 border rounded hover:bg-gray-200"
                onClick={() => handleFieldSelect("bioContent")}
              >
                About You
              </button>
              <button
                className="text-left p-2 border rounded hover:bg-gray-200"
                onClick={() => handleFieldSelect("dateOfBirth")}
              >
                Date of Birth
              </button>
              <button
                className="text-left p-2 border rounded hover:bg-gray-200"
                onClick={() => handleFieldSelect("location")}
              >
                Location
              </button>
              <button
                className="text-left p-2 border rounded hover:bg-gray-200"
                onClick={() => handleFieldSelect("occupation")}
              >
                Occupation
              </button>
            </div>
            <div className="mt-1 flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-black py-1 px-3 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader1;
