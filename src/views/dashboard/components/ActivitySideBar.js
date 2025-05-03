import { MdAccessAlarm } from "react-icons/md";
import { BiTargetLock } from "react-icons/bi";
import { RiBnbFill } from "react-icons/ri";
import { SiBinance } from "react-icons/si";

const ActivitySideBar = ({ status, reason, liveMarketPrice, tradeCycleNo }) => {
  return (
    <div className="text-left w-full my-5 mx-auto bg-white rounded-lg">
      <div className="py-2 px-4">
        <span className="text-lg font-semibold"> Activity</span>

        <div className="flex flex-col">
          <div className="flex justify-start gap-4 items-center">
            <div className="">
                <MdAccessAlarm className="text-5xl text-slate-400 font-bold" />
            </div>
            <div className=" flex flex-col items-start">
              {tradeCycleNo ? (
                <span className="text-slate-400 text-[14px]">
                  Trade Cycle {tradeCycleNo} in Progress
                </span>
              ) : (
                <span className="text-slate-400">
                  Trade Cycle waiting for signal...
                </span>
              )}
              <span className="text-[18px] mb-1 font-normal">
                Bot status: {status || "waiting for signal..."}
              </span>
              <span className="text-slate-400 text-[14px]">
                {new Date().toLocaleString()}
              </span>
              {reason && (
                <span className="text-[14px] font-normal">
                  Reason: {reason}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="border-slate-400 " />
      <div className="py-2 px-4">
        <div className="flex flex-col">
          <div className=" flex flex-row justify-start gap-4 items-center">
            <div className="">
                <BiTargetLock className="text-5xl text-[#8601FF] font-bold" />
            </div>
            <div className=" flex flex-col items-start">
              <span className="text-slate-400 text-[14px]">Live Market Price:</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{liveMarketPrice || 0.0}</span>
                <SiBinance color="orange" size={25} />
              </div>
              <span className="text-slate-400 text-[14px]">
                {new Date().toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ActivitySideBar;
