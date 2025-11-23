import React from "react";
import ClientSidebar from "../components/ClientSidebar";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="flex min-h-screen">
      <ClientSidebar />
      <Outlet />
    </div>
  );
}

export default Home;
