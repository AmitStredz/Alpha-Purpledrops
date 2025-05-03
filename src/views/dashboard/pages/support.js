import React from "react";
import { CiCircleInfo } from "react-icons/ci";

export default function Support() {
  const links = [
    "Mai us purpledrops@gmail.com",
    "Call us +812345678",
    "Update Email",
    "Update Password",
    "Update Payement Method",
    "Cancel Account",
    "Review Payment History",
  ];
  return (
    <div className="flex flex-col p-5 sm:p-10 w-full min-h-screen">
      <div className="flex ">
        <span className="text-[38px] text-white">Support</span>
      </div>
      <div className="flex flex-col gap-5 font-extralight items-start p-5 bg-white rounded-2xl w-full">
        <div className="flex flex-col w-full items-start">
          <span className="text-[22px] font-normal">Hi, Hari</span>
          <p>Looks like your are having trouble trading</p>
        </div>
        <div className="flex flex-col items-start w-full">
          <span className="text-[22px] font-normal">Contact Us</span>
          <p>Tell us more and we'll find te best solution for you</p>
          <select className="p-2 border border-black rounded-lg">
            <option disabled>Tell us your issue</option>
            <option>Cant understand UI</option>
            <option>Others</option>
          </select>
        </div>
        <div>
          <span className="flex flex-col items-start text-[22px] font-normal">Quick Links</span>
          <div className="flex flex-col gap-3">
            {links?.map((item, index)=>(
                <div className="flex gap-2 " key={index}>
                    <CiCircleInfo />
                    <span>{item}</span>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
