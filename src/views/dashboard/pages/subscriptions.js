import React, { useState } from "react";
import PaymentModal from "../../../components/modals/paymentModal";
import { IoIosArrowRoundForward } from "react-icons/io";
import { CiExport } from "react-icons/ci";

export default function Subscriptions() {
  const [isPaymentModal, setIsPaymentModal] = useState(false);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")));
  const [history, setHistory] = useState([
    {
      planName: "Purpledrops AI Trading Bot",
      tenure: "One Year Plan",
      purchaseDate: new Date(userData?.subscription_start).toLocaleDateString(),
      purchaseTime: new Date(userData?.subscription_start).toLocaleTimeString(),
      endDate: new Date(userData.subscription_end).toLocaleDateString(),
      endTime: new Date(userData.subscription_end).toLocaleTimeString(),
    },
    
  ]);

  const cardList = [
    {
      title: "Purpledrops AI Trading Bot",
      plan: "One Year Plan",
      primaryPrice: "₹18,500 /-",
      // secondaryPrice: "+ 18% GST",
      // secondaryPrice2: "₹2,745",
      totalInPaise: 1799500,
      descriptionList: [
        "Access to PurpleDrops AI Trading Bot for 12 months",
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

  return (
    <div className="flex flex-col gap-5 p-3 sm:p-10 w-full min-h-screen">
      <div className="flex max-sm:justify-center w-full">
        <span className="text-[28px] sm:text-[38px] text-white">Billing & Subscriptions</span>
      </div>
      {/* <div className="flex justify-between gap-5">
      <div className="flex flex-col p-5 bg-white rounded-2xl w-full">
        <div className="flex justify-between items-center w-full">
          <span>Total Profits</span>
          <div className="flex gap-5">
            <span>Months</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-5 bg-white rounded-2xl w-full">
        <div className="flex justify-between items-center w-full">
          <span>Capital Used</span>
          <div className="flex gap-5">
          <div className="flex gap-5">
            <span>Months</span>
          </div>
          </div>
        </div>
      </div>
      </div> */}

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
              <div className="flex items-end justify-center gap-3 w-full">
                <span className="text-3xl font-bold text-[#8601FF]">
                  {items.primaryPrice}
                </span>
                {/* <div className="text-[15px] font-bold text-gray-500 text-center flex flex-col flex-nowrap">
                  <span>{items.secondaryPrice}</span>
                  <span className="text-[#8601FF]">
                    {items.secondaryPrice2}
                  </span>
                </div> */}
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
            {/* <div
                className={`flex justify-center items-center text-black py-2 px-4 w-full mt-10 rounded-lg shadow-md  cursor-pointer ${
                  index === 0
                    ? "bg-gradient-to-b from-[#1BAA4C] to-[#34CD69] text-white"
                    : "border border-slate-400"
                }`}
                // onClick={handleBuyNow}
              >
                {loading ? (
                  "Processing..."
                ) : (
                  <>
                    <span>Buy Now</span>
                    <IoIosArrowRoundForward size={30} />
                  </>
                )}
              </div> */}
          </div>
        ))}
      </div>

      <div className="flex flex-col bg-white rounded-2xl w-full shadow-sm">
       
        <div className="header flex justify-between items-center w-full bg-slate-200 p-5 rounded-t-2xl">
          <span>Subscription History</span>
          
        </div>

        <div className="w-full overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Plan Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tenure</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Purchase Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Purchase Time</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">End Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">End Time</th>
                  </tr>
                </thead>
                {history.length > 0 ? (
                  <tbody className="bg-white divide-y divide-gray-200">
                    {history?.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-150 text-left">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item?.planName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item?.tenure}</td>
                       
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item?.purchaseDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item?.purchaseTime}</td>
                       
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item?.endDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item?.endTime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                        No subscription history found.
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
      {isPaymentModal && (
        <PaymentModal onclose={() => setIsPaymentModal(false)} />
      )}
    </div>
  );
}
