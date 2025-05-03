import React from "react";
import checkImg from "..//assets/check.png";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function ConfirmModal({
  title,
  message1,
  message2,
  onClose,
  isClose,
}) {
  return (
    <div
      className="w-screen h-screen fixed top-0 left-0 flex p-3 text-black font-poppins justify-center items-center backdrop-blur-xl z-[100]"
      data-aos="fade-in"
    >
      <div
        className="fixed flex flex-col gap-5 items-center bg-white rounded-3xl shadow-lg p-3 sm:p-10 w-[90%] sm:w-[30rem] text-center "
        data-aos="zoom-in"
      >
        {isClose && (
          <div className="flex w-full justify-end">
            <IoMdCloseCircleOutline
              size={30}
              onClick={onClose}
              className="cursor-pointer"
            />
          </div>
        )}
        <img src={checkImg} alt="checkImg" className="w-32 sm:w-44" />
        <span className="text-[#8601FF] text-[24px] sm:text-[32px]">{title}</span>
        <div className="flex flex-col gap-2">
          <span className="text-[12px] sm:text-[16px]">{message1}</span>
          {message2 && <span className="text-[12px] sm:text-[16px]">{message2}</span>}
        </div>
      </div>
    </div>
  );
}
