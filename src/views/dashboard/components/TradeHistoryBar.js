import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../api/api";
import axios from "axios";

export default function TradeHistoryBar() {
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
    <div className="flex flex-col w-full bg-white rounded-xl p-3 sm:p-5">
      <div className="flex items-start">
        <span className="">Latest 8 Buy/Sells</span>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50  text-left text-xs font-medium uppercase tracking-wider">
                <tr>
                  <th scope="col" className="px-3 py-3">id</th>
                  <th scope="col" className="px-3 py-3">Symbol</th>
                  <th scope="col" className="px-3 py-3">Side</th>
                  <th scope="col" className="px-3 py-3">Quantity</th>
                  <th scope="col" className="px-3 py-3">Price</th>
                  <th scope="col" className="px-3 py-3">Profit</th>
                  <th scope="col" className="px-3 py-3">Date</th>
                  <th scope="col" className="px-3 py-3">Time</th>
                </tr>
              </thead> 
              {tradeHistory?.trades.length > 0 ? (
                <tbody className="bg-white divide-y divide-gray-200">
                  {tradeHistory?.trades?.slice(0,8).map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 text-left text-sm text-gray-500">
                      <td className="px-3 py-3">{item?.id}</td>
                      <td className="px-3 py-3">{item?.symbol}</td>
                      <td className={`px-3 py-3 whitespace-nowrap text-sm ${item?.side === "BUY" ? "text-[#8601FF]" : "text-red-500"}`}>
                        {item?.side}
                      </td>
                      <td className="px-3 py-3">{item?.quantity}</td>
                      <td className="px-3 py-3">{item?.price}</td>
                      <td className="px-3 py-3">{item?.profit}</td>
                      <td className="px-3 py-3">
                        {new Date(item?.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item?.created_at).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="8" className="px-3 py-3 text-center text-sm text-gray-500">
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
  );
}
