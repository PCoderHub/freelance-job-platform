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
    <aside className="bg-white w-1/5 p-4 flex flex-col justify-between">
      <nav className="flex flex-col">
        <NavLink
          accessKey=""
          tabIndex={-1}
          to="/home/client"
          end
          className={linkClasses}
        >
          <span accessKey="">Dashboard</span>
        </NavLink>
        <NavLink
          accessKey=""
          to="/home/client/my-job-posts"
          className={linkClasses}
        >
          <span accessKey="">My Jobs</span>
        </NavLink>
        <NavLink
          accessKey=""
          to="/home/client/payments"
          className={linkClasses}
        >
          <span accessKey="">Payments</span>
        </NavLink>
        <NavLink accessKey="" to="/home/client/reviews" className={linkClasses}>
          <span accessKey="">Reviews/Ratings</span>
        </NavLink>
      </nav>
      <div className="p-2 flex flex-col items-center gap-2">
        <Link
          accessKey=""
          to="/home/client/profile"
          className="text-black font-bold"
        >
          <span accessKey="">Profile</span>
        </Link>
        <button
          accessKey=""
          tabIndex={-1}
          type="button"
          onClick={handleLogout}
          className="text-black font-bold"
        >
          <span accessKey="">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default ClientSidebar;
