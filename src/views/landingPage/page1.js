import React from "react";

export default function Page1() {
  return (
    <div className=" w-scr">
      <div className="flex flex-col items-center gap-3 sm:pt-20 p-3 sm:p-10 xl:px-[22rem] text-center w-screen">
        <span className="text-[14px] sm:text-[20px]">Purpledrops AI</span>

        <span className="text-[32px] sm:text-[60px] leading-8 sm:leading-[4.5rem]">
          The Fastest and Secure Trading Bot
        </span>
        <span className="text-[12px] sm:text-[14px]">
          Purpledrops AI enhances business performance globally by providing
          unique and inventive technology solu-tions through a mix of skills and
          imagination for growth and improved working conditions.
        </span>
      </div>
      <div className="flex w-screen h-full px-3 sm:px-10">
        <img src="/hello2.png" alt="helloLogo" className="w-[10rem] sm:w-[25rem] animate-slide"></img>
      </div>
    </div>
  );
}
