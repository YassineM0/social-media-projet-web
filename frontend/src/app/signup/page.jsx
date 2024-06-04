"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [picture, setPicture] = useState(null);

  const toast = useToast();

  const submitHandler = async () => {
    if (!firstName || !lastName || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    const formData = new FormData();
    if (picture) {
      formData.append("profilePicture", picture);
    }
    // else {
    //   toast({
    //     title: "No profile picture selected",
    //     status: "warning",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "bottom",
    //   });
    //   return;
    // }
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    //formData.append("profilePicture", picture);
    formData.append("dateOfBirth", 2004); // 2004 is just an example, because this field is obligatory to be filled

    try {

      const response = await fetch("http://localhost:4001/api/auth/register", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      toast({
        title: "Rgistration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      router.push('/');
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        toast({
          title: `Error: ${data}`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } else if (error.request) {
        toast({
          title: "Network Error",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } else {
        toast({
          title: "Error",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };
  return (
    <div
      className="relative bg-cover bg-center h-screen w-screen flex justify-center item-center "
      style={{ backgroundImage: "url('zlijj.png')" }}
    >
      <div className="flex m-auto justify-center items-center max-h-9 gap-3 bg-white border-gray2 border-3 w-xx  rounded-llg shadow-lg p-2.15">
        <div className="flex flex-col">
          <Image
            src="/AtlasNet.png"
            alt="Logo"
            width={350}
            height={10}
            priority
          />
        </div>
        <div className="flex flex-col gap-0.5 bg-white  ">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter First Name"
            className=" border-2 border-brd hover:border-blue rounded-mdd p-1.5"
          />

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter Last Name"
            className=" border-2 border-brd hover:border-blue rounded-mdd p-1.5"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setPicture(e.target.files[0]);
            }}
            className=" border-2 border-brd hover:border-blue rounded-mdd p-1.5"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter your mail"
            className=" border-2 border-brd hover:border-blue rounded-mdd p-1.5"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="border-2 border-brd hover:border-blue rounded-mdd p-1.5"
          />
          <input
            type="password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            placeholder="Confirm password"
            className="border-2 border-brd hover:border-blue rounded-mdd p-1.5"
          />
          <button
            onClick={submitHandler}
            className="border-2 rounded-mdd py-1.5 mt-1.5 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue hover:text-white hover:font-bold gap-2"
          >
            Sign Up
          </button>
          <div className="text-center mt-2">Already registred?  <button className="bg-blue hover:bg-darkBlue text-white font-bold pl-2 pr-2 py-1 border-2 rounded-mdd  transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:shadow-outline" onClick={ () => router.push('/') } >Sign In</button>  </div>
        </div>
      </div>
    </div>
  );
};

export default page;
