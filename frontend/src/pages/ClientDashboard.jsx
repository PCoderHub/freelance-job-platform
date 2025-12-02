import React from "react";

function ClientDashboard() {
  return (
    <div className="p-5 mx-auto my-10 w-[80vw]">
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white py-8 px-8 rounded-md shadow-md flex justify-around font-semibold">
          <p>Active jobs:</p>
          <p>3</p>
        </div>
        <div className="bg-white py-8 px-8 rounded-md shadow-md flex justify-around font-semibold">
          <p>Proposal Waiting:</p>
          <p>3</p>
        </div>
        <div className="bg-white py-8 px-8 rounded-md shadow-md flex justify-around font-semibold">
          <p>Hires:</p>
          <p>3</p>
        </div>
        <div className="bg-white py-8 px-8 rounded-md shadow-md flex justify-around font-semibold">
          <p>Payments this month:</p>
          <p>Rs.350</p>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-indigo-700 text-2xl font-bold">Recent Activity</h2>
      </div>
    </div>
  );
}

export default ClientDashboard;
