import React from "react";
import { BellIcon } from "@heroicons/react/outline";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-6 px-8 mb-12 md:px-16">
      <div className="relative w-20 h-20 mx-auto md:mx-0">
        <Image
          src="/playspace.png"
          className="cursor-pointer object-contain"
          layout="fill"
          alt="netflix"
        />
      </div>

      <div className="hidden md:flex">
        <input
          className="w-60 h-12 rounded-lg mr-5 bg-[#393E46] text-white px-3 outline-none"
          type="text"
          placeholder="Search"
        />
        <div className="flex space-x-4">
          <div className="text-white font-light bg-gradient-to-r from-rose-500 via-red-400 to-red-500 h-10 w-10 rounded-full flex justify-center items-center">
            <BellIcon className="w-5 h-5" />
          </div>
          <div className="text-white font-light bg-gradient-to-tr from-violet-500 to-orange-300 h-10 w-10 rounded-full flex justify-center items-center">
            <ShoppingCartIcon className="w-5 h-5" />
          </div>
          <div className="text-white font-semibold bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 h-10 w-10 rounded-full flex justify-center items-center">
            KB
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
