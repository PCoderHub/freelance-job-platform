import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-indigo-600 px-20 py-5">
      <Link
        accessKey=""
        to="/"
        className="text-3xl font-bold text-white hover:text-gray-200"
      >
        <span accessKey="">Skillora</span>
      </Link>
    </header>
  );
}

export default Header;
