import React from "react";
import img1 from "./asses/img1.png";
import img2 from "./asses/img2.png";
import img3 from "./asses/img3.png";

export default function Page4() {
  const cardItems = [
    {
      title: "Advanced Automated Trading Solutions",
      description:
        "Purpledrops AI offers sophisticated trading solutions designed to enhance your investment journey. Our cutting-edge PurpleDrops AI Bot is the core of our services, providing seamless automation to maximize user profits. The bot continuously scans the market, detects trends, and optimizes trading positions using advanced algorithms and high-precision strategies.",
      redirectTo: "",
      logo: img1,
    },
    {
      title: "Smart & Efficient Trading Execution",
      description:
        "Our trading bot is engineered for speed and efficiency, adapting to various market conditions. Whether the market is bullish or bearish, the PurpleDrops AI Bot ensures you stay ahead with real-time analytics and dynamic trade execution. It is built to react swiftly to market movements, making intelligent trade decisions on your behalf to increase profitability.",
      redirectTo: "",
      logo: img2,
    },
    {
      title: " ⁠User-Friendly Yet Powerful",
      description:
        "The PurpleDrops AI Bot is designed for both experienced traders and beginners. With an intuitive and easy-to-use interface, users can trade with confidence without requiring extensive trading knowledge. Whether you are a seasoned trader or just starting, our automated system empowers you to reach your financial goals effortlessly.",
      redirectTo: "",
      logo: img3,
    },
  ];
  return (
    <div className="flex flex-col gap-5 items-center p-3 sm:p-10">
      <div className="flex flex-col gap-3 lg:px-[22rem] text-center">
        <span className="text-[32px] sm:text-[60px] leading-10 sm:leading-[4.5rem]">
          Power your Crypto Trading Bot
        </span>
        <p className="text-[12px] sm:text-[16px]">
          presented complicated trading solutions that are intended to
          streamline your investment experience.{" "}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row p-3 sm:p-10 gap-5 justify-between rounded-3xl border border-slate-600 backdrop-blur-sm bg-white bg-opacity-5">
        {cardItems?.map((item, index) => (
          <div className="flex flex-col sm:flex-row">
            {index !== 0 && (
              <div className="w-full sm:w-[0.5px] h-[0.5px] sm:h-full bg-slate-300 max-sm:my-5 sm:mx-10"></div>
            )}
            <div className="flex flex-col gap-3">
              <img
                src={item.logo}
                alt={item.logo}
                className="w-10 sm:w-20 p-2 bg-white bg-opacity-10 rounded-full"
              ></img>
              <span className="text-[20px]">{item.title}</span>
              <p className="text-[14px] font-extralight"> {item.description}</p>
              <div>
                <button className=" text-[#8601FF]">Get Started</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
