import React, { useEffect, useState } from "react";
import ActivitySideBar from "../components/ActivitySideBar";
import StatsSideBar from "../components/StatsSideBar";
import SwitchBoxSideBar from "../components/SwitchBoxSideBar";
import SuccessBar from "../components/SuccessBar";
import { SiTether } from "react-icons/si";
import { RiBnbFill } from "react-icons/ri";
import axios from "axios";
import { BASE_URL } from "../../../api/api";
import DepositModal from "../../../components/modals/depositModal";
import FailureModal from "../../../components/modals/failureModal";
import ConfirmModal from "../../../components/modals/confirmModal";
import { RotatingLines } from "react-loader-spinner";
import TradeCyclesBar from "../components/TradeCyclesBar";
import PanicBar from "../components/PanicBar";
import TradeHistoryBar from "../components/TradeHistoryBar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [isDepositModal, setIsDepositModal] = useState(false);
  const [bal, setBal] = useState("");
  const [currentProfit, setCurrentProfit] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successModalMessage, setSuccessModalMessage] = useState("");
  const [successModalTitle, setSuccessModalTitle] = useState("");
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [botisLoading, setBotisLoading] = useState(false);
  const [botStatus, setBotStatus] = useState(null);
  const [tradeCycleNo, setTradeCycleNo] = useState(null);
  const [botIsEnabled, setBotIsEnabled] = useState(false);
  const [botReason, setBotReason] = useState(null);
  const [liveMarketPrice, setLiveMarketPrice] = useState(null);
  const [totalUsdtUsed, setTotalUsdtUsed] = useState(null);
  const [remainingUsdt, setRemainingUsdt] = useState(null);
  const [fetchTradeCycleData, setFetchTradeCycleData] = useState(true);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert("token not found. Please login again");
      navigate("/login");
      window.location.reload();
      localStorage.clear();
      return;
    }
  }, []);

  // /binance/data
  const fetchUserData = async () => {
    // e.preventDefault();
    // if (isLoading) return;
    // setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/binance/data/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      console.log("response: ", response.data);
      if (response?.status === 200) {
        return response?.data;
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    } finally {
      // setIsLoading(false);  // ✅ Ensures loading state resets
    }
  };

  const fetchBalance = async () => {
    // e.preventDefault();
    // if (isLoading) return;
    // setIsLoading(true);

    try {
      console.log("fetching balance...");

      const response = await axios.get(`${BASE_URL}/bot/config/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      console.log("bot/config: ", response.data);
      if (response?.status === 200) {
        setBal(response?.data?.initial_capital);
        return response?.data;
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      return error;
    } finally {
      // setIsLoading(false);  // ✅ Ensures loading state resets
    }
  };
  const startTrade = async () => {
    // e.preventDefault();
    // if (isLoading) return;
    // setIsLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/bot/start-trade/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      console.log("bot/config: ", response.data);
      if (response?.status === 200) {
        return response?.data;
      }
    } catch (error) {
      console.error("Error:", error?.response?.data);
      console.error("ErrorMessage:", error?.message);
      if (error?.response?.data?.error) {
        setErrorMessage("Bot is disabled. Enable it.");
      }
      return error;
    } finally {
      // setIsLoading(false);  // ✅ Ensures loading state resets
    }
  };

  // const fetch
  const handleStartBotClick = async () => {
    // if (!botIsEnabled) {
    //   setErrorMessage("Enable bot to Start BOT.");
    //   return;
    // }
    setBotisLoading(true);
    const response1 = await fetchBalance();
    console.log(response1?.response?.data?.detail);
    if (response1?.is_enabled === false) {
      console.log("is_enabled is false.");
      setErrorMessage("Set initial capital to start the bot.");
      setIsDepositModal(true);
      setBotisLoading(false);
      return;
    } else if (response1?.response?.data?.detail) {
      setErrorMessage(response1?.response?.data?.detail);
    }

    const response2 = await startTrade();
    console.log("response2: ", response2);
    if (response2?.message === "Trade cycle initiated.") {
      setSuccessModalMessage("Bot has been successfully initiated.");
      setSuccessModalTitle("Hey! Congratulations");
      setIsSuccessModal(true);
      setTimeout(() => {
        setIsSuccessModal(false);
      }, 3000);
    }
    setBotisLoading(false);
  };

  useEffect(() => {
    async function fetchDta() {
      const data = await fetchBalance();
      setBal(data?.initial_capital);
      if (data?.is_enabled === false) {
        setIsDepositModal(true);
      }

      const data2 = await fetchUserData();
      setUserData(data2);
    }
    fetchDta();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row w-full transition-all">
        {/* side tabs section */}
        <div className="w-full lg:w-2/5 bg-transparent p-2 sm:p-4">
          <ActivitySideBar
            status={botStatus}
            liveMarketPrice={liveMarketPrice}
            reason={botReason}
            tradeCycleNo={tradeCycleNo}
          />
          <StatsSideBar
            usdtBal={bal || 0}
            currentProfit={currentProfit}
            totalUsdtUsed={totalUsdtUsed}
            remainingUsdt={remainingUsdt}
          />
          <SwitchBoxSideBar
            botStatus={botStatus}
            botIsEnabled={(e) => {
              setBotIsEnabled(e);
            }}
          />
          <PanicBar
            panicTriggered={() => {
              setBotStatus("PAUSED");
              setFetchTradeCycleData(!fetchTradeCycleData);
            }}
          />
        </div>

        {/* main tabs section */}
        <div className="order-first w-full bg-transparent p-2 sm:p-4">
          <div className="my-3 sm:my-5">
            <SuccessBar />
          </div>

          <div className="grid grid-cols-3 gap-1 sm:gap-3 w-full my-3 sm:my-5  text-start">
            <div className="flex items-center gap-1 sm:gap-3 p-2 sm:p-5 rounded-lg bg-white">
              <div className="p-1 sm:p-2 rounded-full bg-green-600 flex-shrink-0">
                <SiTether
                  color="white"
                  size={window.innerWidth < 640 ? 20 : 40}
                />
              </div>

              <div className="flex flex-col items-start text-[12px] sm:text-[20px] min-w-0">
                <span className="font-medium whitespace-nowrap">
                  Total USDT:
                </span>
                <span className="text-[9px] sm:text-[14px] text-center text-slate-400 -mt-1 sm:-mt-2 ml-1 hidden sm:block">
                  in your binance
                </span>
                <span className="font-semibold text-ellipsis overflow-hidden w-full">
                  {Number(userData?.relevantBalances?.[1]?.free || 0).toFixed(4)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-3 p-2 sm:p-5 rounded-lg bg-white">
              <div className="p-1 sm:p-2 rounded-full bg-yellow-500 flex-shrink-0">
                <RiBnbFill
                  color="white"
                  size={window.innerWidth < 640 ? 20 : 40}
                />
              </div>

              <div className="flex flex-col items-start text-[12px] sm:text-[20px] min-w-0">
                <span className="font-medium whitespace-nowrap">
                  Total BNB:
                </span>
                <span className="text-[9px] sm:text-[14px] text-center text-slate-400 -mt-1 sm:-mt-2 ml-1 hidden sm:block">
                  in your binance
                </span>
                <span className="font-semibold text-ellipsis overflow-hidden w-full">
                  {Number(userData?.relevantBalances?.[0]?.free || 0).toFixed(4)}
                </span>
              </div>
            </div>

            <button
              disabled={botisLoading || botStatus?.toLowerCase() !== "inactive"}
              className={`flex items-center justify-center gap-1 sm:gap-3 p-2 sm:p-5 rounded-lg bg-[#8601FF] ${
                botisLoading ||
                botStatus?.toLowerCase() !== "inactive"
                  ? " cursor-not-allowed"
                  : "bg-opacity-80 hover:bg-[#8601FF]"
              }`}
              onClick={() => handleStartBotClick()}
            >
              <div className="flex items-center justify-center rounded-xl bg-white w-10 h-10 sm:w-16 sm:h-16">
                <img
                  src="/hello3.png"
                  alt="logo"
                  className="w-8 sm:w-10 h-full aspect-square object-cover"
                />
              </div>
              {botisLoading ? (
                <div className="flex justify-center">
                  <RotatingLines
                    visible={true}
                    height={window.innerWidth < 640 ? "24" : "40"}
                    width={window.innerWidth < 640 ? "24" : "40"}
                    color="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                  />
                </div>
              ) : (
                <span className="text-white text-[12px] sm:text-[20px] font-medium  overflow-hidden text-ellipsis">
                  {botStatus?.toLowerCase() !== "inactive"
                    ? `Bot is ${botStatus}`
                    : botStatus?.toLowerCase() === "inactive" && botIsEnabled
                    ? "Bot is Enabled."
                    : "Start Bot"}
                </span>
              )}
            </button>
          </div>

          <div className="my-3 sm:my-5">
            <TradeCyclesBar
              setCurrentProfit={(e) => setCurrentProfit(e)}
              setBotReason={(e) => setBotReason(e)}
              setBotStatus={(e) => setBotStatus(e)}
              setTradeCycleNo={(e) => setTradeCycleNo(e)}
              setLiveMarketPrice={(e) => setLiveMarketPrice(e)}
              setTotalUsdtUsed={(e) => setTotalUsdtUsed(e)}
              setRemainingUsdt={(e) => setRemainingUsdt(e)}
              isBotEnabled={botIsEnabled}
              fetchData={fetchTradeCycleData}
            />
          </div>
          <TradeHistoryBar />
        </div>
      </div>
      {isDepositModal && (
        <DepositModal
          usdtBal={userData?.relevantBalances[1]?.free || 0}
          onClose={() => setIsDepositModal(false)}
          onConfirm={() => {
            fetchBalance();
            setIsDepositModal(false);
          }}
        />
      )}
      {errorMessage && (
        <FailureModal
          message1={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
      {isSuccessModal && (
        <ConfirmModal
          isClose={false}
          title={successModalTitle}
          message1={successModalMessage}
        />
      )}
    </div>
  );
}

// const style = document.createElement('style');
// style.textContent = `
//   @media (max-width: 640px) {
//     .success-bar-container {
//       transform: scale(0.9);
//       transform-origin: left top;
//     }
//   }
// `;
// document.head.appendChild(style);
