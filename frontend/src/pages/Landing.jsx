import React from "react";

function Landing() {
  return (
    <div className="container mx-auto px-4 my-15">
      <section className="bg-indigo-300 text-center mb-15 text-white rounded-sm">
        <h2 className="text-2xl font-bold mb-4 p-30">
          Become a part of our freelance community
        </h2>
      </section>
      <section className="bg-indigo-600 text-center mb-15 text-white rounded-sm">
        <h2 className="text-2xl font-bold mb-4 p-30">
          Let our freelancers help you
        </h2>
      </section>
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
