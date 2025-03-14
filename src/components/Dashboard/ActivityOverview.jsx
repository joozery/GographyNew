import React from "react";
import UserActivityGraph from "./UserActivityGraph";

const ActivityOverview = () => {
  return (
    <div className="activity-overview p-6 bg-white shadow rounded-lg">
      <UserActivityGraph />
    </div>
  );
};

export default ActivityOverview;