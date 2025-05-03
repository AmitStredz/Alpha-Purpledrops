import React from "react";

const StatsCard = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-gray-700 mb-2">Stats</h3>
      <p className="text-lg font-semibold">Current Profit: 0.00 USDT (0%)</p>
      <p className="text-sm text-gray-500">Total: 0.00 (0%)</p>
    </div>
  );
};

export default StatsCard;
