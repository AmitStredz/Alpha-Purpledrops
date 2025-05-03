import React, { useEffect, useState } from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { LineChart } from "@mui/x-charts";
import { BASE_URL } from "../../../api/api";
import axios from "axios";
import { useAuth } from "../../auth/AuthProvider";
import { FaChartLine, FaCoins, FaClock, FaExchangeAlt } from "react-icons/fa";
import { BsGraphUpArrow, BsGraphDownArrow } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";

export default function Portfolio() {
  const [tradeData, setTradeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]);

  const { logout } = useAuth();
  const token = localStorage.getItem("token");

  const fetchtradeData = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/bot/realtime-trade-cycle/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log("tradeData response: ", response?.data);
      setTradeData(response.data);
      
      // Process trade cycle data for chart
      if (response.data?.trade_cycles?.length > 0) {
        processTradeCyclesForChart(response.data.trade_cycles);
      }
    } catch (error) {
      console.error(
        "Error fetching cycle status:",
        error.response?.data || error.message
      );

      if (error.response?.status === 401) {
        console.log("Unauthorized access detected. Logging out...");
        logout();
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const processTradeCyclesForChart = (tradeCycles) => {
    const sortedCycles = [...tradeCycles].sort((a, b) => 
      new Date(a.started_at || 0) - new Date(b.started_at || 0)
    );
    
    const processedData = sortedCycles.map((cycle, index) => {
      const date = cycle.started_at ? new Date(cycle.started_at) : new Date();
      return {
        x: date.getMonth(),
        y: parseFloat(cycle.average_price || 0),
        date: date,
        cycleNumber: cycle.cycle_number || index + 1
      };
    });
    
    setChartData(processedData);
  };

  useEffect(() => {
    fetchtradeData();
  }, []);

  const formatTime = (timeObj) => {
    const parts = [];
    if (timeObj.days > 0) parts.push(`${timeObj.days}d`);
    if (timeObj.hours > 0) parts.push(`${timeObj.hours}h`);
    if (timeObj.minutes > 0) parts.push(`${timeObj.minutes}m`);
    if (timeObj.seconds > 0) parts.push(`${timeObj.seconds}s`);
    return parts.join(" ");
  };

  // Month names for x-axis formatter
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  return (
    <div className="flex flex-col p-5 sm:p-10 w-full min-h-screen font-poppins">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[28px] sm:text-[38px] font-bold text-white">Portfolio Overview</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${tradeData?.bot_status === "ACTIVE" ? "bg-[#8601FF]" : "bg-red-500"}`} />
            <span className="text-white">{tradeData?.bot_status || "Loading..."}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 text-start">
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Daily Profit</p>
              <p className="text-2xl font-bold">${parseFloat(tradeData?.daily_profit || 0).toFixed(2)}</p>
            </div>
            <FaChartLine className="text-[#8601FF] text-2xl" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Cumulative Profit</p>
              <p className="text-2xl font-bold">${parseFloat(tradeData?.cumulative_profit || 0).toFixed(2)}</p>
            </div>
            <FaCoins className="text-yellow-500 text-2xl" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Cycles</p>
              <p className="text-2xl font-bold">{tradeData?.trade_cycles?.length || 0}</p>
            </div>
            <FaExchangeAlt className="text-blue-500 text-2xl" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Capital Used</p>
              <p className="text-2xl font-bold">
                ${parseFloat(tradeData?.trade_cycles?.[0]?.used_capital || 0).toFixed(2)}
              </p>
            </div>
            <BsGraphUpArrow className="text-purple-500 text-2xl" />
          </div>
        </div>
      </div>

      {/* Trade Cycles Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Active Trade Cycles</h2>
        {tradeData?.trade_cycles?.map((cycle) => (
          <div key={cycle.cycle_id} className="border rounded-xl p-4 mb-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">Cycle #{cycle?.cycle_number || 'N/A'}</h3>
                <p className="text-gray-500 text-sm">Started: {cycle?.started_at ? new Date(cycle.started_at).toLocaleString() : 'N/A'}</p>
              </div>
              <div className="flex items-center gap-2">
                <IoMdTime className="text-gray-500" />
                <span className="text-sm">{cycle?.trade_cycle_age ? formatTime(cycle.trade_cycle_age) : 'N/A'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 text-sm">Average Price</p>
                <p className="text-lg font-semibold">${parseFloat(cycle?.average_price || 0).toFixed(2)}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 text-sm">Current Price</p>
                <p className="text-lg font-semibold">${parseFloat(cycle?.current_market_price || 0).toFixed(2)}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 text-sm">Accumulated Quantity</p>
                <p className="text-lg font-semibold">{cycle?.accumulated_quantity || 0}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 text-sm">Live Profit</p>
                <p className={`text-lg font-semibold ${parseFloat(cycle?.live_profit || 0) >= 0 ? 'text-[#8601FF]' : 'text-red-500'}`}>
                  ${parseFloat(cycle?.live_profit || 0).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capital</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cycle.orders.map((order) => (
                    <tr key={order.order_id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.order_type === "BASE_BUY" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-green-100 text-green-800"
                        }`}>
                          {order.order_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{order?.quantity || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${parseFloat(order?.fill_price || 0).toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${parseFloat(order?.order_capital || 0).toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order?.timestamp ? new Date(order.timestamp).toLocaleTimeString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Price History</h2>
        <div className="h-[400px]">
          {chartData.length > 0 ? (
            <LineChart
              dataset={chartData}
              xAxis={[
                {
                  dataKey: "x",
                  scaleType: "band",
                  valueFormatter: (x) => monthNames[x],
                },
              ]}
              series={[
                { 
                  dataKey: "y",
                  label: "Average Price",
                  color: "#52b202",
                  showMark: true,
                  valueFormatter: (value) => `$${value ? value.toFixed(2) : '0.00'}`,
                }
              ]}
              height={400}
              margin={{ left: 50, right: 30, top: 30, bottom: 30 }}
              grid={{ horizontal: true, vertical: false }}
              tooltip={{ trigger: "item" }}
              slotProps={{
                legend: {
                  hidden: false,
                  position: { vertical: "top", horizontal: "right" },
                },
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              {isLoading ? "Loading chart data..." : "No trade cycle data available"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
