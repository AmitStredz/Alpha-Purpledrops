import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HomeHeader() {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    console.log("userData: ", userData);
  }, [userData]);

  return (
    <div className="flex justify-between items-center  w-screen sm:h-24 p-3  sm:px-10 bg-gradient-to-r from-[#09241A] to-[#121624]">
      <div className="flex">
        <img
          src="/logo.png"
          alt="logo"
          className="w-14 sm:w-20 cursor-pointer"
          onClick={() => navigate("/")}
        ></img>
      </div>
      <div className="relative">
        <div
          className="flex items-center justify-center gap-5 cursor-pointer hover:border  p-3 rounded-md"
          onClick={() => setShowOptions(!showOptions)}
        >
          <img src="avatar.png" alt="avatar" className="w-8 sm:w-16" />

          <span className="text-[12px] sm:text-[14px]">{userData?.username}</span>
        </div>
        <div
          className={`top-20 right-0 flex justify-center items-center p-5 px-10 rounded-lg bg-black bg-opacity-40 ${
            showOptions ? "absolute" : "hidden"
          }`}
        >
          <button
            className="p-2 px-4 border rounded-lg"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
