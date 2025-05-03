import React from "react";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { SiBinance } from "react-icons/si";

export default function SuccessBar() {
  return (
    <div className="flex flex-col sm:flex-row justify-between w-full bg-white rounded-xl p-3 sm:p-5">
      <div className="flex flex-col gap-2 sm:gap-5 sm:w-3/4">
        <div className="flex gap-1 text-[#8601FF] items-center">
          <span className="">Successfully Connected</span>
          <HiMiniCheckBadge />
        </div>
        <div className="flex w-full text-start font-extralight">
            <span className="text-[14px] sm:text-[16px]">Hey Congrats your account successfully connected</span>
        </div>
      </div>
      <div className="flex items-center justify-center  h-full sm:w-1/4 ">
        <div className="flex gap-2 p-2 rounded-lg bg-yellow-100 text-yellow-500">
          <SiBinance />
          <span>Binance</span>
        </div>
      </div>
    </div>
  );
}
