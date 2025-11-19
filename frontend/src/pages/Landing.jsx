import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  const handleRegister = (role) => {
    navigate(`/register?role=${role}`);
  };

  return (
    <div className="container mx-auto px-4 my-15">
      <button
        onClick={() => handleRegister("freelancer")}
        className="bg-indigo-300 text-center mb-15 text-white rounded-sm w-full hover:scale-101 hover:cursor-pointer"
      >
        <h2 className="text-2xl font-bold mb-4 p-30">
          Become a part of our freelance community
        </h2>
      </button>
      <button
        onClick={() => handleRegister("client")}
        className="bg-indigo-600 text-center mb-15 text-white rounded-sm w-full hover:scale-101 hover:cursor-pointer"
      >
        <h2 className="text-2xl font-bold mb-4 p-30">
          Let our freelancers help you
        </h2>
      </button>
      <section className="bg-indigo-300 text-center text-white rounded-sm flex justify-around items-center p-10">
        <div className="bg-white text-black rounded-sm w-1/5 h-60 flex justify-center items-center">
          Software Development
        </div>
        <div className="bg-white text-black rounded-sm w-1/5 h-60 flex justify-center items-center">
          Content Writing
        </div>
        <div className="bg-white text-black rounded-sm w-1/5 h-60 flex justify-center items-center">
          Data Entry
        </div>
      </section>
    </div>
  );
}

export default Landing;
