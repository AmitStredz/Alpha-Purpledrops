import React, { useState } from "react";
import img1 from "./assets/img1.png";

import Footer from "../../components/footer/footer";
import ConfirmModal from "../../components/modals/confirmModal";
import { BASE_URL } from "../../api/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeHeader from "../../components/navbar/homeHeader";
import FailureModal from "../../components/modals/failureModal";
import { RotatingLines } from "react-loader-spinner";
import { IoCopyOutline } from "react-icons/io5";
import { TbCopyCheck } from "react-icons/tb";

export default function ConnectBinance() {
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [isFailureModal, setIsFailureModal] = useState(false);
  const [isCopied1, setIsCopied1] = useState(false);
  const [isCopied2, setIsCopied2] = useState(false);

  const [inputs, setInputs] = useState({
    api_key: "",
    api_secret: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("token not found. Please login again");
      setIsLoading(false);
      navigate("/login");
      // window.location.reload();
      localStorage.clear();
      return;
    }

    console.log("inputs: ", inputs);
    console.log("token: ", token);
    try {
      const response = await axios.post(
        `${BASE_URL}/binance/connect/`,
        inputs,
        {
          headers: {
            Authorization: `Token ${token}`, // ✅ Ensure correct format
          },
        }
      );

      console.log("response: ", response);
      if (response?.status === 200) {
        let userData = JSON.parse(localStorage.getItem("userData"));
        userData.binance_connected = true; // Set to whatever plan value you need
        localStorage.setItem("userData", JSON.stringify(userData));
        setIsSuccessModal(true);
        setTimeout(() => {
          setIsSuccessModal(false);
          navigate("/dashboard");
          // window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message); // ✅ Improved error handling
      setIsFailureModal(true);
    } finally {
      setIsLoading(false); // ✅ Ensures loading state resets
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const ip = ["52.51.148.88", "52.208.145.228"];

  return (
    <div className="flex flex-col items-center font-poppins text-white justify-center h-full bg-gradient-to-br from-[#0D3225] via-[#172631] to-[#545767]  overflow-hidden">
      <HomeHeader />

      <div className="flex flex-col gap-5 p-3 sm:p-10 max-sm:items-center w-full">
        <div className="flex flex-col gap-3 h-full max-sm:text-center">
          <span className="text-[28px] sm:text-[40px]">
            Connection to Exchange 
          </span>
          <span className="text-[24px] sm:text-[28px]">Purpledrops AI Bot</span>
          <span className="text-[12px] sm:text-[16px] sm:w-[30rem] font-extralight">
            Kindly watch the video tutorial on how to connect your Binance
            account to the PurpleDrops AI trading bot
          </span>
          {/* <img src={img1} alt="img1" className="rounded-[3rem]"></img> */}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 justify-between w-full p-3 sm:p-10">
        <form className="flex flex-col max-sm:order-last gap-3 w-full text-[14px] sm:text-[16px]" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">API Label:</label>
            <input
              name="name"
              placeholder="Enter name of your API label"
              value={inputs.name}
              onChange={handleInputChange}
              className="p-2 sm:p-4 px-4 rounded-xl outline-none text-black sm:w-[30rem]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">API Key:</label>
            <input
              name="api_key"
              placeholder="QKSH2882"
              value={inputs.api_key}
              onChange={handleInputChange}
              className="p-2 sm:p-4 px-4 rounded-xl outline-none text-black sm:w-[30rem]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Secret Key:</label>
            <input
              name="api_secret"
              placeholder="QKSH2882API"
              value={inputs.api_secret}
              onChange={handleInputChange}
              className="p-2 sm:p-4 px-4 rounded-xl outline-none text-black sm:w-[30rem]"
            />
          </div>
          {/* <div className="flex flex-col gap-2">
            <label htmlFor="name">Passphrase:</label>
            <input
              name="passphrase"
              placeholder="2782781891278"
              value={inputs.passphrase}
              onChange={handleInputChange}
              className="p-4 px-4 rounded-xl outline-none text-black w-[30rem]"
            />
          </div> */}
          <div className="flex justify-center w-full my-5">
            <button
              className={`p-4 px-8 rounded-xl  text-white ${
                isLoading ? "px-16 bg-green-300" : "bg-[#8601FF]"
              }`}
              type="submit"
            >
              {isLoading ? (
                <RotatingLines
                  visible={true}
                  height="40"
                  width="40"
                  color="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                <span >Connect to Binance</span>
              )}
            </button>
          </div>
        </form>

        <div className="sm:px-10 rounded-lg w-full">
          <div className="flex flex-col gap-1 sm:gap-3 text-[14px] max-sm:text-center items-center">
            <span>Add these APIs to Binance:</span>
            <div className="flex flex-col  items-center sm:items-start gap-1 sm:gap-3">
              <div
                className={`flex items-center p-2 rounded-lg bg-black bg-opacity-20 gap-2 hover:text-green-300 hover:bg-opacity-40 cursor-pointer ${
                  isCopied1 ? "text-[#8601FF]" : ""
                }`}
                onClick={() =>
                  navigator.clipboard.writeText("52.51.148.88").then(
                    setIsCopied1(true),
                    setTimeout(() => {
                      setIsCopied1(false);
                    }, 2000)
                  )
                }
              >
                <span>52.51.148.88</span>
                {isCopied1 ? <TbCopyCheck color="green" /> : <IoCopyOutline />}
              </div>
              <div
                className={`flex items-center p-2 rounded-lg bg-black bg-opacity-20 gap-2 hover:text-green-300 hover:bg-opacity-40 cursor-pointer ${
                  isCopied2 ? "text-[#8601FF]" : ""
                }`}
                onClick={() =>
                  navigator.clipboard.writeText("52.208.145.228").then(
                    setIsCopied2(true),
                    setTimeout(() => {
                      setIsCopied2(false);
                    }, 2000)
                  )
                }
              >
                <span>52.208.145.228</span>
                {isCopied2 ? <TbCopyCheck color="green" /> : <IoCopyOutline />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {isSuccessModal && (
        <ConfirmModal
          isClose={false}
          title="Connect Confirmation"
          message1="Your binance account is sucessfully connected to PurpleDrops AI Bot"
        />
      )}
      {isFailureModal && (
        <FailureModal
          message="Please Check your API KEY & SECRET KEY and Try again."
          onClose={() => setIsFailureModal(false)}
        />
      )}
    </div>
  );
}
