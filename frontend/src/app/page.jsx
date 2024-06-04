"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "./context/authContext";
import Image from "next/image";
import { useToast } from "@chakra-ui/react";

const page = () => {
  const { login } = useAuthContext();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:4001/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      localStorage.setItem("userInfo", JSON.stringify(data));
      //const current = JSON.stringify(data);
      setCurrentUser(data);
      if (response.ok) {
        login(data.user._id, data.token);
        toast({
          title: "you logged successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        router.push("/accueil");
      } else {
        toast({
          title: `${data.message}`,
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setError(data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred while logging in.");
    }
  };

  return (
    <div
      className="relative bg-cover bg-center h-screen w-screen flex justify-center item-center "
      style={{ backgroundImage: "url('zlijj.png')" }}
    >
      <div className="flex m-auto justify-center items-center h-7 gap-3 bg-white border-gray2 border-3 w-xx  rounded-llg shadow-lg p-2.15">
        <div className="flex flex-col">
          <Image
            src="/AtlasNet.png"
            alt="Logo"
            width={350}
            height={10}
            priority
          />
          <div className="font-display text-xl text-darkBlue">
            Welcome to Moroccan Comunity!
          </div>
        </div>
        <div className="flex flex-col gap-0.5 bg-white  ">
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
            placeholder="enter your password"
            className="border-2 border-brd hover:border-blue rounded-mdd p-1.5"
          />
          <button
            onClick={handleLogin}
            className="border-2 rounded-mdd py-1.5 mt-1.5 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue hover:text-white hover:font-bold gap-2"
          >
            SUBMIT
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="bg-blue hover:bg-darkBlue text-white font-bold pl-2 pr-2 py-1.5 border-2 rounded-mdd  transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
