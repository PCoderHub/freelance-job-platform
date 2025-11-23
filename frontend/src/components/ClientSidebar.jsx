import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/userServices";
import { toast } from "react-toastify";

function ClientSidebar() {
  const navigate = useNavigate();

  const linkClasses = ({ isActive }) =>
    `rounded-lg transition-all p-3 m-1 text-2xl font-bold text-center 
     ${isActive ? "bg-indigo-400 text-white" : "text-indigo-700"}`;

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error.message || error.response.data.message);
    }
  };

  return (
    <aside className="bg-white w-1/5 h-screen p-4 flex flex-col justify-between">
      <nav className="flex flex-col">
        <NavLink to="/home/client" end className={linkClasses}>
          Dashboard
        </NavLink>
        <NavLink to="/home/client/my-job-posts" className={linkClasses}>
          My Job Posts
        </NavLink>
        <NavLink to="/home/client/proposals" className={linkClasses}>
          Proposals
        </NavLink>
        <NavLink to="/home/client/job-progress" className={linkClasses}>
          Job progress
        </NavLink>
        <NavLink to="/home/client/payments" className={linkClasses}>
          Payments
        </NavLink>
        <NavLink to="/home/client/reviews" className={linkClasses}>
          Reviews/Ratings
        </NavLink>
      </nav>
      <div className="p-2 flex flex-col items-center gap-2">
        <Link to="/home/client/profile" className="text-black font-bold">
          Profile
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="text-black font-bold"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default ClientSidebar;
