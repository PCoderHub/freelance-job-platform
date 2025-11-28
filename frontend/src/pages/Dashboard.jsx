import React from "react";
import ClientDashboard from "./ClientDashboard";
import FreelancerDashboard from "./FreelancerDashboard";

function Dashboard() {
  const userItem = localStorage.getItem("user");
  const user = JSON.parse(userItem);

  return (
    <div>
      {user?.role === "client" ? (
        <ClientDashboard />
      ) : user?.role === "freelancer" ? (
        <FreelancerDashboard />
      ) : (
        ""
      )}
    </div>
  );
}

export default Dashboard;
