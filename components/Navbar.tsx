import React from "react";

const Navbar = () => {
  return (
    <header className="flex justify-between py-6 px-8 mb-12 md:px-16">
      <img
        src="https://rb.gy/ulxxee"
        className="cursor-pointer object-contain"
        width={100}
        height={100}
        alt="netflix"
      />
      <div className="flex">
        <input
          className="w-[60rem] rounded-lg mr-5 bg-[#393E46] text-white px-3 outline-none"
          type="text"
          placeholder="Search"
        />
        <div className="text-white font-semibold bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 h-10 w-10 rounded-full flex justify-center items-center">
          KB
        </div>
      </div>
    </header>
  );
};

export default Navbar;
