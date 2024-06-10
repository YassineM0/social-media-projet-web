"use client";
import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useAuthContext } from "../context/authContext";
import { useRouter } from "next/navigation";

const Profile = ({curentUserProfil, currentUser}) => {
  const { logout } = useAuthContext();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="mt-1 border-3 border-gray2 rounded-mdd bg-white w-full">
      <div className="bg-gray3 p-2 mx-1.25 mt-1.25 rounded-mdd">
        <div className="flex flex-row">
          <div className="bg-black w-1 h-1 rounded-full overflow-hidden flex justify-center items-center">
            <img src={curentUserProfil} alt="" className="object-center w-full" />
          </div>
          <div className="ml-1.25">
            <h4 className="text-blue-500 font-bold">yassine bg</h4>
            <h6 className="text-sm">{currentUser.user.occupation}</h6>
          </div>
        </div>
        <div className="flex pt-2.15 gap-1 text-blue-900 font-semibold flex justify-center">
          <div className="flex flex-col">
            <p className="text-center">
              69 <br />
            </p>
            <p>friends</p>
          </div>
          <div className="flex flex-col ">
            <p className="text-center">
              69 <br />
            </p>
            <p>followers</p>
          </div>
          <div className="flex flex-col">
            <p className="text-center">
              69 <br />
            </p>
            <p>posts</p>
          </div>
        </div>
        <div className="flex justify-center mt-1">
          <button className="bg-[#538DD7] text-white w-95 font-bold py-1.15 px-2 h-1 rounded-mdd">
            View My Profile
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="flex my-1 hover:bg-blueHover p-1 pr-2 pl-2 rounded-llg"
          onClick={handleLogout}
        >
          <img src="/Logout.png" width={25} height={25} className="mr-1" />
          <p>Logout</p>
        </button>
      </div>
    </div>
  );
};

export default Profile;
