import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-indigo-700 text-white">
      <div className="flex flex-col justify-center items-center py-10">
        <Link to="/about-us" className="p-2 hover:scale-105 hover:underline">
          About Us
        </Link>
        <Link
          to="/terms-of-service"
          className="p-2 hover:scale-105 hover:underline"
        >
          Terms of Service
        </Link>
        <Link
          to="/privacy-policy"
          className="p-2 hover:scale-105 hover:underline"
        >
          Privacy Policy
        </Link>
      </div>
      <div className="flex justify-between items-center px-20 py-2">
        <p className="p-1 flex justify-center items-center gap-2 hover:scale-110">
          <FaSquareFacebook />
          Facebook
        </p>
        <p className="p-1 flex justify-center items-center gap-2 hover:scale-110">
          <FaInstagram />
          Instagram
        </p>
      </div>
      <div>
        <p className="p-1 text-sm">© 2025 Skillora. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
