import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="flex flex-col items-center mt-40 min-h-screen px-6">
      <h1 className="text-7xl font-extrabold text-red-500 mb-4">404</h1>
      <p className="text-xl text-gray-300 mb-6">
        Oops! The page you are looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="bg-[#9d85e6] font-bold text-black p-3 hover:bg-black hover:text-white rounded-4xl "
      >
        Go Back Home</Link>
    </div>
  );
}

export default Error;
