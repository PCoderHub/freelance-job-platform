import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../services/userServices";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!email.trim() || !password.trim()) {
        toast.error("Please fill all the fields");
        return;
      }

      const userData = {
        email,
        password,
      };

      const response = await loginUser(userData);
      toast.success(response.data.message);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setEmail("");
      setPassword("");

      if (response.data.user.role === "admin") {
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      } else {
        setTimeout(() => {
          navigate(`/home/${response.data.user.role}`);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <div className="w-3/5 mx-auto flex rounded-sm my-20 bg-white">
      <div className="w-full bg-white rounded-lg shadow-md flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-1/2 rounded-sm">
          <img
            src="https://images.unsplash.com/photo-1620344527458-28900b32d695?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="object-cover h-full rounded-sm"
          />
        </div>
        <div className="w-full lg:w-1/2 text-center py-20">
          <h2 className="font-bold text-3xl text-indigo-500 mb-5">Sign In</h2>
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-5 w-2/3 mx-auto"
          >
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="border border-black rounded-full py-2 px-5"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="border border-black rounded-full py-2 px-5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              accessKey=""
              type="submit"
              className="bg-indigo-600 text-white p-2 rounded-full hover:scale-105 hover:cursor-pointer w-1/2 mx-auto"
            >
              <span accessKey="">Login</span>
            </button>
          </form>
          <p className="my-2">
            Don't have an account?{" "}
            <Link accessKey="" to={`/`} className="text-indigo-500 underline">
              <span accessKey="">Join here</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
