import React, { useState } from "react";
import ClientSidebar from "../components/ClientSidebar";
import { Outlet } from "react-router-dom";
import FreelancerSidebar from "../components/FreelancerSidebar";
import MenuIcon from "@mui/icons-material/Menu";

function Home() {
  const userItem = localStorage.getItem("user");
  const user = JSON.parse(userItem);
  const [open, setOpen] = useState(false);

  return (
    // <div className="flex min-h-screen">
    //   {user?.role === "client" ? (
    //     <ClientSidebar />
    //   ) : user?.role === "freelancer" ? (
    //     <FreelancerSidebar />
    //   ) : (
    //     ""
    //   )}
    //   <Outlet />
    // </div>
    <div className="min-h-screen flex">
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-50 inset-y-0 left-0 transform bg-white
        transition-transform duration-300
        w-64 lg:relative lg:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {user?.role === "client" && <ClientSidebar />}
        {user?.role === "freelancer" && <FreelancerSidebar />}
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:mx-auto">
        {/* Mobile Top Bar */}
        <div className="lg:hidden p-4 bg-white shadow flex justify-between">
          <button
            onClick={() => setOpen(true)}
            className="text-indigo-600 font-bold text-lg"
          >
            <MenuIcon />
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default Home;
