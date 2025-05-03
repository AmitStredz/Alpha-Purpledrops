import React, { useState, useEffect } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { BASE_URL } from "../../../api/api";

const TradeCycleDashboard = ({setUsdtProfit}) => {
  const [cycleStatus, setCycleStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchCycleStatus = async () => {
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
      setCycleStatus(response.data);
    } catch (error) {
      console.error("Error fetching cycle status:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Poll every 5 seconds.
    const intervalId = setInterval(() => {
      fetchCycleStatus();
    }, 5000);
    // Cleanup on unmount.
    return () => clearInterval(intervalId);
  }, []);

  if (loading && !cycleStatus) {
    return (
      <div className="flex justify-center items-center">
        <RotatingLines height="50" width="50" color="green" />
      </div>
    );
  }

  if (!cycleStatus) {
    return <div>No trade cycle in progress.</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Trade Cycle Status</h2>
      <p>Status: {cycleStatus.status}</p>
      <p>Cycle ID: {cycleStatus.cycle_id}</p>
      <p>Accumulated Quantity: {cycleStatus.accumulated_quantity || 0}</p>
      <p>Average Price: {cycleStatus.average_price || 0}</p>
      <p>Profit: {cycleStatus.profit || 0}</p>
      <p>Current Market Price: {cycleStatus.current_market_price || "N/A"}</p>
      <p>Remaining Capital: {cycleStatus.remaining_capital || 0}</p>
      <h3 className="mt-4 font-semibold">Orders:</h3>
      {cycleStatus.orders && cycleStatus.orders.length > 0 ? (
        <ul>
          {cycleStatus.orders.map((order, index) => (
            <li key={index}>
              Iteration {order.iteration}: {order.quantity} @ {order.fill_price} (Capital: {order.order_capital})
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders yet.</p>
      )}
    </div>
  );
};

export default TradeCycleDashboard;



