import { TfiStatsUp } from "react-icons/tfi";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";
import { IoMdWallet } from "react-icons/io";

const StatsSideBar = ({
  usdtBal,
  currentProfit,
  totalUsdtUsed,
  remainingUsdt,
  tradeNumber,
}) => {
  return (
    <div className="text-left w-full my-5 mx-auto bg-white rounded-lg">
      <div className="py-2 px-4">
        <span className="text-lg font-semibold"> Stats</span>

        <div className="flex flex-col">
          <div className="flex flex-row justify-start gap-4 items-center">
            <div className="">
              <TfiStatsUp className="text-5xl text-green-500 font-bold" />
            </div>
            <div className=" flex flex-col items-start">
              <span className="font-extralight uppercase text-[14px]">
                Current Profit
                <span className="text-alphaBlack font-normal">
                  <BsFillQuestionCircleFill className="inline " />
                </span>
              </span>
              <span
                className={`text-xl  font-bold ${
                  currentProfit > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {parseFloat(currentProfit || 0)?.toFixed(3)} USDT (
                {(
                  (parseFloat(currentProfit || 0) / parseFloat(usdtBal || 1)) *
                  100
                )?.toFixed(4)}
                {"%"})
              </span>
              {/* <span className="mb-1">reset |</span> */}
            </div>
          </div>
        </div>
      </div>

      <hr class="border-alphaGray " />

      <div className="py-2 px-4">
        <div className="flex flex-col mb-2">
          <div className=" flex flex-row justify-start gap-4 items-center">
            <div className="">
              <IoMdWallet className="text-5xl   font-bold" />
            </div>
            <div className=" flex flex-col items-start">
              <span className="text-alphaGray uppercase text-[12px]">
                Total <span className=" text-alphaBlack">USDT</span> set as
                Initial capital for the bot to trade:
                <span className="text-alphaBlack font-normal">
                  <BsFillQuestionCircleFill />
                </span>
              </span>
              <span className="text-2xl text-green-500 font-bold">
                {Number(usdtBal || 0)?.toFixed(3)}
                {/* {usdtBal} */}
                {/* 1650 */}
                {/* <span className="text-red-500">{" (-0.05%)"} </span> */}
                {/* 1650 - 1645/100 = -0.05% */}
              </span>

              <span className="text-alphaGray">
                Start balance:
                <span className="font-bold">
                  {Number(usdtBal || 0)?.toFixed(3)}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[14px]  flex flex-col items-start">
              Total USDT{" "}
              <span className=" text-[12px] text-yellow-500 rounded-md p-1 bg-yellow-100">
                (TC: {tradeNumber})
              </span>{" "}
            </span>
            <span className="text-yellow-500 rounded-md p-2 bg-yellow-100">
              {parseFloat(totalUsdtUsed || 0).toFixed(3)}{" "}
              <span className="text-[12px]">USDT</span>
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[14px] flex flex-col items-start">
              Remaining USDT{" "}
              <span className="text-[12px] text-green-500 rounded-md p-1 bg-green-100">
                (TC: {tradeNumber})
              </span>
            </span>
            <span className="text-green-500 rounded-md p-2 bg-green-100">
              {parseFloat(remainingUsdt || 0).toFixed(3)}{" "}
              <span className="text-[12px]">USDT</span>
            </span>
          </div>
        </div>
      </div>
      {/* <hr class="border-alphaGray " /> */}

      {/* <div className="text-center">
        <button className="m-2 rounded-xl bg-white border-solid border-l border-alphaGray w-1/2 md:w-2/3">
          <FiRefreshCcw className="inline m-2" /> Convert to USDT
        </button>
      </div> */}
    </div>
  );
};
export default StatsSideBar;
