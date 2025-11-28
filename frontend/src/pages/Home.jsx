import React from "react";
import ClientSidebar from "../components/ClientSidebar";
import { Outlet } from "react-router-dom";
import FreelancerSidebar from "../components/FreelancerSidebar";

function Home() {
  const userItem = localStorage.getItem("user");
  const user = JSON.parse(userItem);

  return (
    <div className="flex min-h-screen">
      {user?.role === "client" ? (
        <ClientSidebar />
      ) : user?.role === "freelancer" ? (
        <FreelancerSidebar />
      ) : (
        ""
      )}
      <Outlet />
    </div>
  );
}

export default Home;
