import React, { useEffect, useState } from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { BarChart } from "@mui/x-charts";
import { BASE_URL } from "../../../api/api";
import axios from "axios";
import { Tooltip } from "@mui/material";
import { useAuth } from "../../auth/AuthProvider";

export default function Profits() {
  const [loading, setLoading] = useState(false);
  const [initialCapital, setInitialCapital] = useState(null);
  const [liveProfit, setLiveProfit] = useState(null);
  const [realProfit, setRealProfit] = useState(null);
  const [realCapital, setRealCapital] = useState(null);
  const [tradeData, setTradeData] = useState(null);
  const [barChartData, setBarChartData] = useState([]);
  const [barChartLabels, setBarChartLabels] = useState([]);

  const { logout } = useAuth();
  const token = localStorage.getItem("token");

  const fetchLiveProfit = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/bot/realtime-trade-cycle/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      if (response) {
        console.log(response?.data);
        setTradeData(response.data);

        console.log(
          "liveProfit: ",
          response?.data?.trade_cycles[0]?.live_profit
        );
        const profit = response?.data?.cumulative_profit;
        console.log("profitt..: ", profit);

        if (profit < 10) {
          setLiveProfit(profit * 100);
        } else {
          setLiveProfit(profit);
        }
        setRealProfit(parseFloat(profit)?.toFixed(2));
        console.log("RealPRofit: ", realProfit);

        // Process data for bar chart
        processBarChartData(response.data.trade_cycles);
      }
    } catch (error) {
      console.error(
        "Error fetching cycle status:",
        error.response?.data || error.message
      );

      // Check for unauthorized access
      if (error.response?.status === 401) {
        console.log("Unauthorized access detected. Logging out...");
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const processBarChartData = (tradeCycles) => {
    if (!tradeCycles || tradeCycles.length === 0) return;

    // Get the last 10 cycles or all cycles if less than 10
    const cycles = tradeCycles.slice(0, Math.min(10, tradeCycles.length));

    // Generate labels and data for the chart
    const labels = cycles.map((cycle) => `Cycle ${cycle.cycle_number}`);
    const data = cycles.map((cycle) => parseFloat(cycle.live_profit || 0));

    setBarChartLabels(labels);
    setBarChartData(data);
    console.log("barChartData: ", data);
  };

  const fetchBotConfig = async () => {
    try {
      console.log("fetching balance...");

      const response = await axios.get(`${BASE_URL}/bot/config/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      console.log("bot/config: ", response.data);
      if (response?.status === 200) {
        console.log();
        const capital = response?.data?.initial_capital;
        if (capital > 100) {
          setInitialCapital(capital / 10);
        } else if (capital > 1000) {
          setInitialCapital(capital / 1000);
        } else {
          setInitialCapital(capital);
        }
        setRealCapital(capital);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);

      // Check for unauthorized access
      if (error.response?.status === 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    fetchLiveProfit();
    fetchBotConfig();

    // Set up auto-refresh interval
    const interval = setInterval(() => {
      fetchLiveProfit();
    }, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  // Format currency with dollar sign and 2 decimal places
  const formatCurrency = (value) => {
    return `$${parseFloat(value || 0).toFixed(2)}`;
  };

  // Calculate percentage of capital used
  const getCapitalUsedPercentage = () => {
    if (!realCapital || !tradeData?.trade_cycles?.[0]?.used_capital) return 0;
    return (tradeData.trade_cycles[0].used_capital / realCapital) * 100;
  };

  return (
    <div className="flex flex-col p-4 sm:p-6 lg:p-10 w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[28px] sm:text-[38px] sm:text-4xl text-white font-semibold">
          Profits
        </h1>
      </div>

      {/* Main Cards - Profits and Capital */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Profits Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-xl font-medium text-gray-800">Total Profits</h2>
          </div>

          <div className="p-5">
            {liveProfit !== null ? (
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <Gauge
                    valueMax={parseInt(initialCapital || 100)}
                    value={realProfit || 0}
                    text={`${realProfit}%`}
                    width={window.innerWidth < 768 ? 250 : 300}
                    height={window.innerWidth < 768 ? 250 : 300}
                    cornerRadius="50%"
                    innerRadius="80%"
                    sx={{
                      [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 36,
                        fontWeight: "bold",
                      },
                      [`& .${gaugeClasses.valueArc}`]: {
                        fill: realProfit < 0 ? "#ef4444" : "#22c55e",
                      },
                      [`& .${gaugeClasses.referenceArc}`]: {
                        fill: "#f3f4f6",
                      },
                    }}
                  />
                </div>

                <div className="mt-4 text-center">
                  {/* <Tooltip title={`Exact Value: ${realProfit}`}>
                    <div className="text-xl font-semibold mb-1">
                      {formatCurrency(realProfit)}
                    </div>
                  </Tooltip> */}
                  <p
                    className={`text-sm text-gray-500 ${
                      realProfit > 0 ? "text-[#8601FF]" : "text-red-500"
                    }`}
                  >
                    {realProfit > 0 ? "Profitable" : "Loss"} -{" "}
                    {Math.abs(
                      (parseFloat(realProfit || 0) /
                        parseFloat(initialCapital || 1)) *
                        100
                    ).toFixed(2)}
                    % of initial capital
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px]">
                {loading ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#8601FF] mx-auto mb-2"></div>
                    <p className="text-gray-500">Loading profit data...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="mt-2 text-gray-500">
                      No profit data available
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Capital Used Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-xl font-medium text-gray-800">
              Capital Utilization
            </h2>
          </div>

          <div className="p-5">
            <div className="flex flex-col items-center justify-center">
              {initialCapital !== null &&
              tradeData?.trade_cycles?.[0]?.used_capital !== undefined ? (
                <>
                  <div className="relative">
                    <Gauge
                      value={getCapitalUsedPercentage()}
                      text={`${getCapitalUsedPercentage()?.toFixed(2)}%`}
                      width={window.innerWidth < 768 ? 250 : 300}
                      height={window.innerWidth < 768 ? 250 : 300}
                      cornerRadius="50%"
                      innerRadius="80%"
                      sx={{
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: 36,
                          fontWeight: "bold",
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                          fill: "#3b82f6",
                        },
                        [`& .${gaugeClasses.referenceArc}`]: {
                          fill: "#f3f4f6",
                        },
                      }}
                    />
                  </div>

                  <div className="mt-4 text-center">
                    {/* <div className="text-xl font-semibold mb-1">
                      {formatCurrency(
                        tradeData?.trade_cycles?.[0]?.used_capital || 0
                      )}
                    </div> */}
                    <p className="text-sm text-gray-500">
                      {getCapitalUsedPercentage().toFixed(1)}% of total capital
                      used{" "}
                      {`($${parseFloat(
                        tradeData?.trade_cycles[0]?.used_capital
                      )?.toFixed(2)})`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {`$${parseFloat(
                        realCapital - tradeData?.trade_cycles[0]?.used_capital
                      )?.toFixed(2)}`}{" "}
                      remaining
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-[300px]">
                  {loading ? (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-2"></div>
                      <p className="text-gray-500">Loading capital data...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="mt-2 text-gray-500">
                        No capital data available
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profit Analysis Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-6">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h2 className="text-xl font-medium text-gray-800 mb-2 sm:mb-0">
              Profit by Trade Cycle
            </h2>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Period:</span>
              <select className="text-sm border rounded-md px-2 py-1 bg-gray-50">
                <option>Last 10 Cycles</option>
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-5">
          {barChartData.length > 0 ? (
            <div className="w-full overflow-x-auto">
              <div className="min-w-[700px]">
                {/* Custom Bar Chart Implementation */}
                <div className="relative h-[300px] mt-8">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 bottom-0 w-[60px] flex flex-col justify-between text-xs text-gray-500 pr-2">
                    <div className="text-right">
                      {Math.max(
                        ...barChartData.map((val) => Math.abs(val)),
                        0
                      ).toFixed(2)}
                    </div>
                    <div className="text-right">0.00</div>
                    <div className="text-right">
                      {(-Math.max(
                        ...barChartData.map((val) => Math.abs(val)),
                        0
                      )).toFixed(2)}
                    </div>
                  </div>

                  {/* Y-axis line */}
                  <div className="absolute left-[60px] top-0 bottom-0 w-[1px] bg-gray-200"></div>

                  {/* X-axis line */}
                  <div className="absolute left-[60px] right-0 top-1/2 h-[1px] bg-gray-200"></div>

                  {/* Bars Container */}
                  <div className="absolute left-[80px] right-[20px] top-0 bottom-0 flex items-center">
                    <div className="w-full flex justify-between items-center">
                      {barChartData.map((value, index) => {
                        const isPositive = value >= 0;
                        const barHeight = `${Math.min(
                          (Math.abs(value) /
                            Math.max(
                              ...barChartData.map((val) => Math.abs(val)),
                              0.01
                            )) *
                            100,
                          100
                        )}%`;

                        return (
                          <div
                            key={index}
                            className="flex flex-col items-center"
                            style={{ width: `${100 / barChartData.length}%` }}
                          >
                            {/* Bar */}
                            <div
                              className="relative w-[70%] flex flex-col items-center justify-center group"
                              style={{ height: "240px" }}
                            >
                              <div
                                className={`w-full rounded-sm ${
                                  isPositive ? "bg-emerald-500" : "bg-red-500"
                                }`}
                                style={{
                                  height: barHeight,
                                  position: "absolute",
                                  bottom: isPositive ? "50%" : "auto",
                                  top: isPositive ? "auto" : "50%",
                                  transition: "height 0.3s ease-in-out",
                                }}
                              />

                              {/* Tooltip - moved outside the bar but inside the container div */}
                              <div
                                className="invisible group-hover:visible absolute w-[120px] bg-white shadow-lg rounded p-2 text-sm z-10 left-1/2 transform -translate-x-1/2 transition-all"
                                style={{
                                  bottom: isPositive
                                    ? "calc(50% + 10px)"
                                    : "auto",
                                  top: isPositive ? "auto" : "calc(50% + 10px)",
                                }}
                              >
                                <div className="font-medium">
                                  {barChartLabels[index]}
                                </div>
                                <div
                                  className={
                                    isPositive
                                      ? "text-emerald-600"
                                      : "text-red-600"
                                  }
                                >
                                  {formatCurrency(value)}
                                </div>
                              </div>
                            </div>

                            {/* X-axis label */}
                            <div className="text-xs text-gray-500 mt-2 truncate w-full text-center">
                              {barChartLabels[index].replace("Cycle ", "")}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="absolute top-[-30px] right-[20px] flex items-center">
                    <div className="flex items-center mr-4">
                      <div className="w-3 h-3 bg-emerald-500 rounded-sm mr-1"></div>
                      <span className="text-xs text-gray-600">Profit</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-sm mr-1"></div>
                      <span className="text-xs text-gray-600">Loss</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[300px]">
              {loading ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-2"></div>
                  <p className="text-gray-500">Loading chart data...</p>
                </div>
              ) : (
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <p className="mt-2 text-gray-500">No chart data available</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Additional Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {/* Daily Profit Card */}
        <div className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            Daily Profit
          </h3>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-bold">
              {formatCurrency(tradeData?.daily_profit || 0)}
            </span>
            <span
              className={`px-2 py-1 text-xs rounded-full font-medium ${
                (tradeData?.daily_profit || 0) >= 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {(tradeData?.daily_profit || 0) >= 0 ? "+" : ""}
              {tradeData?.daily_profit || 0}
            </span>
          </div>
        </div>

        {/* Total Trades Card */}
        <div className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            Total Trades
          </h3>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-bold">
              {tradeData?.trade_cycles?.reduce(
                (total, cycle) => total + (cycle.orders?.length || 0),
                0
              ) || 0}
            </span>
            <span className="text-sm text-gray-500">All time</span>
          </div>
        </div>

        {/* Capital Efficiency Card */}
        <div className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            Capital Efficiency
          </h3>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-bold">
              {realProfit && realCapital
                ? `${((realProfit / realCapital) * 100).toFixed(2)}%`
                : "0.00%"}
            </span>
            <span className="text-sm text-gray-500">ROI</span>
          </div>
        </div>

        {/* Active Cycles Card */}
        <div className="bg-white rounded-xl shadow-lg p-5">
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            Active Cycles
          </h3>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-bold">
              {tradeData?.trade_cycles?.filter(
                (cycle) =>
                  cycle.status === "In Progress" || cycle.status === "ACTIVE"
              ).length || 0}
            </span>
            <span
              className={`px-2 py-1 text-xs rounded-full font-medium ${
                tradeData?.bot_status === "ACTIVE"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {tradeData?.bot_status || "INACTIVE"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
