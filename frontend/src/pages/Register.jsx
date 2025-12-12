import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { registerUser } from "../services/userServices";
import { toast } from "react-toastify";

function Register() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      if (!name.trim() || !email.trim() || !password.trim()) {
        toast.error("Please fill all the fields");
        return;
      }

      const userData = {
        name,
        email,
        password,
        role,
      };

      const response = await registerUser(userData);
      toast.success(response.data.message);

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-3/5 mx-auto flex rounded-sm my-20 bg-white">
      <div className="w-1/2 rounded-sm">
        <img
          src="https://images.unsplash.com/photo-1620344527458-28900b32d695?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="object-cover h-full rounded-sm"
        />
      </div>
      <div className="w-1/2 text-center py-20">
        <h2 className="font-bold text-3xl text-indigo-500 mb-5">Sign Up</h2>
        <form
          onSubmit={handleSignUp}
          className="flex flex-col gap-5 w-2/3 mx-auto"
        >
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className="border border-black rounded-full py-2 px-5"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            <span accessKey="">Register</span>
          </button>
        </form>
        <p className="my-2">
          Already have an account?{" "}
          <Link
            accessKey=""
            to={`/login`}
            className="text-indigo-500 underline"
          >
            <span accessKey="">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
