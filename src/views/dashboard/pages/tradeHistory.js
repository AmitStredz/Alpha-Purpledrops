import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../api/api";
import axios from "axios";

export default function TradeHistory() {
  const [tradeHistory, setTradeHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchtradeData = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/bot/full-trade-history/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log("tradeData response: ", response?.data);

      setTradeHistory(response.data);
    } catch (error) {
      console.error(
        "Error fetching cycle status:",
        error.response?.data || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchtradeData();
  }, []);

  return (
    <div className="flex flex-col p-5 sm:p-10 w-full min-h-screen">
      <div className="flex ">
        <span className="text-[28px] sm:text-[38px] text-white">Trade History</span>
      </div>

      {/* Table */}
      <div className="flex flex-col bg-white rounded-2xl w-full shadow-sm">
       
        <div className="header flex justify-between items-center w-full bg-slate-200 p-5 rounded-t-2xl">
          <span>All History</span>
          <div className="flex gap-5">
            <div className="flex gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="border text-black"
                name="usd"
              />
              <label htmlFor="usd">USD</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="bnb" />
              <label htmlFor="usd">BNB</label>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Symbol</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Side</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Profit</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                {tradeHistory?.trades.length > 0 ? (
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tradeHistory?.trades?.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-150 text-left">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item?.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item?.symbol}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${item?.side === "BUY" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"}`}>
                            {item?.side}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item?.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item?.price}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium
                          ${parseFloat(item?.profit) >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {item?.profit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(item?.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(item?.created_at).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                        No trading history found.
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
