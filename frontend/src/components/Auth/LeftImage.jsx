import React from "react";

function LeftImage() {
  return (
    <div className="w-full lg:w-1/2 rounded-sm">
      <img
        src="https://images.unsplash.com/photo-1620344527458-28900b32d695?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Left Image"
        className="object-cover h-full rounded-t-sm lg:rounded-l-sm lg:rounded-t-none"
      />
    </div>
  );
}

export default LeftImage;
