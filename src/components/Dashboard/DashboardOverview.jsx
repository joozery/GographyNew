import React from "react";
import StatisticsSummary from "./StatisticsSummary";
import ActivityOverview from "./ActivityOverview";
import RecentActivities from "./RecentActivities";
import QuickActions from "./QuickActions";

const DashboardOverview = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard Overview</h1>
      <StatisticsSummary />
      <ActivityOverview />
      <RecentActivities />
      <QuickActions />
    </div>
  );
};

export default DashboardOverview;