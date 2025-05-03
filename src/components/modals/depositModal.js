import React, { useState } from "react";
import checkImg from "..//assets/check.png";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { BASE_URL } from "../../api/api";
import axios from "axios";
import ConfirmModal from "./confirmModal";

export default function DepositModal({ onClose, onConfirm, usdtBal}) {
  const [balValue, setBalValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const handleConfirmClick = async () => {
    // e.preventDefault();
    // if (isLoading) return;
    // setIsLoading(true);

      
    const token = localStorage.getItem("token");
    console.log("token: ", token);

    if (!token) {
      alert("token not found. Please login again");
      // setIsLoading(false);
      return;
    }
    let data = {
      is_enabled: true,
      initial_capital: balValue,
    };
    if (balValue <= 0) {
      data = {
        is_enabled: false,
        initial_capital: balValue,
      };
    }

    try {
      const response = await axios.post(`${BASE_URL}/bot/config/`, data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      console.log("bot/config: ", response.data);
      if (response?.status === 200) {
        setIsSuccessModal(true);
        setTimeout(() => {
          setIsSuccessModal(false);
          onConfirm();
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      if (error?.response?.data) {
        setErrorMessage(error?.response?.data?.error);
      }
    } finally {
      // setIsLoading(false);  // ✅ Ensures loading state resets
    }
  };

  const handleInputChange = (e) => {
    const balance = e.target.value;
    if (!isNaN(balance)) {
      setBalValue(balance);
    }
  };
  return (
    <div
      className="w-screen h-screen fixed top-0 left-0 flex text-black font-poppins justify-center items-center backdrop-blur-xl z-[100]"
      data-aos="fade-in"
    >
      <div
        className="fixed flex flex-col gap-5  items-center bg-white rounded-3xl shadow-lg p-3 sm:p-10 w-[90%] sm:w-[30rem] text-center max-w-4xl"
        data-aos="zoom-in"
      >
        <div className="flex w-full justify-end">
          <IoClose size={30} onClick={onClose} className="cursor-pointer" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[#8601FF] text-[20px]">
            Set Initial Capital for Bot to Trade
          </span>
          <span className="text-[14px] sm:text-[16px]">
            You have <span className="text-[#8601FF]">{usdtBal || 0} USDT</span>{" "}
            available in your wallet. To add more transfer funds from your
            funding wallet to spot or make a deposit.
          </span>
        </div>
        <div className="w-full h-[0.5px] bg-black bg-opacity-40"></div>
        <div className="flex flex-col gap-2">
          {/* <span className="text-[#8601FF] text-[20px]">Deposit USDT </span> */}
          <span className="text-[14px] sm:text-[16px]">
            Please enter the initial USDT amount you want to use for trading/
          </span>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <input
            value={balValue}
            onChange={handleInputChange}
            placeholder="0.00"
            className="border rounded-lg p-3 "
          />
          <button
            className="bg-[#8601FF] text-white p-3 px-6 rounded-lg"
            onClick={() => handleConfirmClick()}
          >
            Confirm
          </button>
        </div>
        {errorMessage && (
          <span className="text-red-500 text-[12px] ">{errorMessage}</span>
        )}
      </div>

      {isSuccessModal && (
              <ConfirmModal
                isClose={false}
                title="Success"
                message1={`Initial Capital Set as ${balValue} USDT`}
              />
            )}
    </div>
  );
}
