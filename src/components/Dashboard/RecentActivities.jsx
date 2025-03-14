import React from "react";

const RecentActivities = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
      <ul className="divide-y divide-gray-200">
        <li className="py-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">John Doe</span> registered as a new user.
          </p>
        </li>
        <li className="py-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Admin</span> added a new blog post.
          </p>
        </li>
        <li className="py-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">System</span> reported no issues.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default RecentActivities;