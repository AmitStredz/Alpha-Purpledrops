import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center  w-screen sm:h-24 p-3 sm:px-10 bg-gradient-to-r from-[#09241A] to-[#121624]">
      <img
        alt="logo"
        src="/logo.png"
        className="w-14 sm:w-20 cursor-pointer"
        onClick={() => navigate("/")}
      ></img>
      <div className="flex gap-5 text-[14px]">
        <Link
          to="/signup"
          className="p-2 px-4  sm:px-10 bg-white text-[#8601FF] rounded-full"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="p-2 px-4  sm:px-10 bg-[#8601FF] text-white rounded-full"
        >
          Log In
        </Link>

        {/* <button className='p-2 px-10 bg-[#8601FF] text-white rounded-full' onClick={() => navigate('/login')}>
                    Login
                </button> */}
      </div>
    </div>
  );
}
