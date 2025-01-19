// Blockchain Stats
import React, { useEffect, useState } from "react";
import axios from "axios";

const DazedCoin = () => {
  const [stats, setStats] = useState({
    blockHeight: "Loading...",
    totalTransactions: "Loading...",
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Replace with the actual API endpoint
        const response = await axios.get("https://api.blockchain.com/stats");
        setStats({
          blockHeight: response.data.blockHeight,
          totalTransactions: response.data.totalTransactions,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="py-12 px-6 bg-black text-white">
      <h1 className="text-pink text-3xl font-bold mb-4">DazedCoin Blockchain</h1>
      <p>The first cannabis-backed cryptocurrency. Stay tuned for updates!</p>
      <div>
        <p>Block Height: {stats.blockHeight}</p>
        <p>Total Transactions: {stats.totalTransactions}</p>
      </div>
    </div>
  );
};

export default DazedCoin;
