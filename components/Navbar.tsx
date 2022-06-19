import React from 'react';
import { BellIcon } from '@heroicons/react/outline';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    return (
        <div className="flex justify-between items-center py-6 px-8 mb-4">
            <Link href="/">
                <div className="relative w-20 h-20 mx-auto md:mx-0">
                    <Image
                        src="/playspace.png"
                        className="cursor-pointer object-contain"
                        layout="fill"
                        alt="playstation"
                    />
                </div>
            </Link>

            <div className="hidden md:flex">
                <input
                    className="w-60 h-12 rounded-lg mr-5 bg-[#393E46] text-white px-3 outline-none"
                    type="text"
                    placeholder="Search"
                />
                <div className="flex space-x-4">
                    <div className="navbarButton bg-gradient-to-r from-rose-500 via-red-400 to-red-500">
                        <BellIcon className="w-5 h-5" />
                    </div>
                    <div className="navbarButton font-light bg-gradient-to-tr from-violet-500 to-orange-300">
                        <ShoppingCartIcon className="w-5 h-5" />
                    </div>
                    <div className="navbarButton bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
                        KB
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
