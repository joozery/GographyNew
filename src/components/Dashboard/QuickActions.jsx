import React from "react";

const QuickActions = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
      <div className="flex gap-4">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700">
          Add New User
        </button>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700">
          Add New Blog
        </button>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700">
          Review Notifications
        </button>
      </div>
    </div>
  );
};

export default QuickActions;