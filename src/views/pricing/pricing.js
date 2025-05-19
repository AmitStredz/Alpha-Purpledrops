import React, { useState } from "react";
import PaymentModal from "../../components/modals/paymentModal";

import Footer from "../../components/footer/footer";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import HomeHeader from "../../components/navbar/homeHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../components/modals/confirmModal";
export default function Pricing() {
  const [isPaymentModal, setIsPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const navigate = useNavigate();
  const cardList = [
    {
      title: "Purpledrops AI Trading Bot",
      plan: "One Year Plan",
      primaryPrice: "₹15,250",
      secondaryPrice: "+ 18% GST",
      secondaryPrice2: "₹2,745",
      totalInPaise: 1799500,
      descriptionList: [
        "Access to Purpledrops AI Bot for 12 months",
        "Smart AI-based trading strategies",
        "Real-time market monitoring",
        "Automatic trade execution",
        "24/7 customer support",
      ],
    },
    // {
    //   title: "Life Time Plan",
    //   primaryPrice: "$500.00",
    //   secondaryPrice: "$600.00",
    //   descriptionList: [
    //     "Everything in Innovator, plus",
    //     "Competitoe Benchmarking",
    //     "Holistic Market Visualization",
    //     "Adaptive Stategy Planner",
    //     "24/7 Priority Support",
    //   ],
    //   planType: "1_year",
    // },
    // {
    //   title: "1 Year Plan",
    //   primaryPrice: "$200.00",
    //   secondaryPrice: "$300.00",
    //   descriptionList: [
    //     "Everything in Innovator, plus",
    //     "Competitoe Benchmarking",
    //     "Holistic Market Visualization",
    //     "Adaptive Stategy Planner",
    //     "24/7 Priority Support",
    //   ],
    //   planType: "lifetime",
    // },
  ];

  const pricingFooter = ["Free trial", "Cancel anytime", "Support included"];

  const handleBuyNow = async () => {
    let userData = JSON.parse(localStorage.getItem("userData"));

    if (!userData) {
      alert("Please login again.");
      setLoading(false);
      navigate("/login");
      // window.location.reload();
      localStorage.clear();
      return;
    }
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first.");
        setLoading(false);
        return;
      }
      const headers = { Authorization: `Token ${token}` };

      const createOrderResp = await axios.post(
        "https://dca-alpha-bot-be-do.alpharoboticsllp.com/api/users/create-razorpay-order/",
        {
          amount: cardList[0].totalInPaise,
          currency: "INR",
        },
        { headers }
      );

      const { order_id, amount, currency } = createOrderResp.data;
      console.log("createOrderResp", createOrderResp);

      const options = {
        key: "rzp_test_i2PpkMQpHSbv4w",
        amount: amount,
        currency: currency,
        name: "Purpledrops AI",
        description: "One Year Plan",
        order_id: order_id,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;
          console.log("Razorpay success:", response);

          try {
            const verifyResp = await axios.post(
              "https://dca-alpha-bot-be-do.alpharoboticsllp.com/api/users/payment-success/",
              {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
              },
              { headers }
            );
            if (verifyResp.data.message) {
              // alert("Payment success! Subscription activated.");
              console.log("Before update:", userData);
              userData.plan = "1_year"; // Set to whatever plan value you need
              localStorage.setItem("userData", JSON.stringify(userData));
              setIsSuccessModal(true);
            }
          } catch (err) {
            console.error("Verification error:", err?.response?.data);
            alert(
              "Error verifying payment. Contact support if money was deducted."
            );
          }
        },
        prefill: {
          // prefill your user's info
          name: userData.username,
          email: userData.email,
          contact: userData.phone_number,
        },
        notes: {
          plan: "One Year Plan",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      alert("Error creating order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-white font-poppins justify-center h-full bg-gradient-to-br from-[#0D3225] via-[#172631] to-[#545767]  overflow-hidden">
      <HomeHeader />

      <div className="flex flex-col gap-5 sm:gap-10 items-center p-3 sm:p-20 w-full">
        <div className="text-center text-white">
          <h1 className="text-[18px] sm:text-4xl font-bold">
            Start making <span className="text-green-400">smarter</span>{" "}
            decisions
          </h1>
          {/* <h2 className="text-[18px] sm:text-4xl font-bold">Choose a plan</h2> */}
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 w-full">
          {cardList?.map((items, index) => (
            <div
              key={index}
              className=" bg-white rounded-xl p-3 sm:p-5 sm:px-10 flex flex-col gap-3 items-center sm:w-[25rem]"
            >
              <div>
                <h3 className="text-xl font-400 text-gray-800 text-center">
                  {items.title}
                </h3>
                <h2 className="text-lg font-400 text-gray-800 text-center">
                  {items.plan}
                </h2>
                <div className="flex items-end justify-center gap-3 font-zona">
                  <span className="text-3xl font-bold text-[#8601FF] ">
                    {items.primaryPrice}/
                  </span>
                  <div className="text-[15px] text-gray-500 font-semibold text-center w-full flex flex-col flex-nowrap">
                    <span>{items.secondaryPrice}</span>
                    <span className="text-[#8601FF]">
                      {items.secondaryPrice2}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full h-[1px] bg-slate-400"></div>
              <ul className="text-gray-700 space-y-2">
                {items.descriptionList?.map((desc, index) => (
                  <li key={index} className="text-[14px] sm:text-[16px]">
                    ✔ {desc}
                  </li>
                ))}
              </ul>
              <div
                className={`flex justify-center items-center text-black py-2 px-4 w-full mt-10 rounded-lg shadow-md  cursor-pointer ${
                  index === 0
                    ? "bg-gradient-to-b from-[#1BAA4C] to-[#34CD69] text-white"
                    : "border border-slate-400"
                }`}
                onClick={handleBuyNow}
              >
                {loading ? (
                  "Processing..."
                ) : (
                  <>
                    <span>Buy Now</span>
                    <IoIosArrowRoundForward size={30} />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Icons */}
        <div className="flex gap-2 sm:gap-5 justify-center items-center text-[#8601FF] text-center">
          {pricingFooter?.map((item, index) => (
            <div className="flex flex-col sm:flex-row gap-1 items-center text-[12px] sm:text-[16px]">
              <FaCircleCheck className="text-[#8601FF]" />
              {item}
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {isPaymentModal && (
        <PaymentModal onclose={() => setIsPaymentModal(false)} />
      )}
      {isSuccessModal && (
        <ConfirmModal
          isClose={true}
          onClose={() => {
            setIsSuccessModal(false);
            navigate("/connect-binance");
          }}
          title="Payment Success"
          message1="Payment success! Subscription activated."
        />
      )}
    </div>
  );
}
