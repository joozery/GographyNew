import React from "react";

const StatisticsSummary = () => {
  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-sm text-gray-600">Total Users</p>
        <h2 className="text-2xl font-bold text-gray-800">1,024</h2>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-sm text-gray-600">Monthly Revenue</p>
        <h2 className="text-2xl font-bold text-gray-800">$12,345</h2>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-sm text-gray-600">Pending Notifications</p>
        <h2 className="text-2xl font-bold text-gray-800">5</h2>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-sm text-gray-600">Published Blogs</p>
        <h2 className="text-2xl font-bold text-gray-800">48</h2>
      </div>
    </div>
  );
};

export default StatisticsSummary;