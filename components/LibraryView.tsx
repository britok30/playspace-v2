import React from 'react';
import Image from 'next/image';
import { Game } from '../types';
import Link from 'next/link';

const LibraryView = ({ games }: { games: Game[] }) => {
    return (
        <div>
            <h3 className="text-2xl font-semibold mb-3">Library</h3>

            <div className="flex flex-col">
                <Link href="/playstation">
                    <div className="flex items-center mb-4 py-3 pl-2 cursor-pointer hover:bg-[#121212] rounded-lg transition duration-[.4s]">
                        <div className="w-20 h-20 relative mr-8">
                            <Image
                                className="rounded-lg"
                                src={games[0].background_image}
                                layout="fill"
                                objectFit="cover"
                                alt="platform-img"
                            />
                        </div>
                        <p className="text-lg">Playstation</p>
                    </div>
                </Link>

                <Link href="/xbox">
                    <div className="flex items-center mb-4 py-3 pl-2 cursor-pointer hover:bg-[#121212] rounded-lg transition duration-[.4s]">
                        <div className="w-20 h-20 relative mr-8">
                            <Image
                                className="rounded-lg"
                                src={games[1].background_image}
                                layout="fill"
                                objectFit="cover"
                                alt="platform-img"
                            />
                        </div>
                        <p className="text-xl">Xbox</p>
                    </div>
                </Link>

                <Link href="/pc">
                    <div className="flex items-center mb-4 py-3 pl-2 cursor-pointer hover:bg-[#121212] rounded-lg transition duration-[.4s]">
                        <div className="w-20 h-20 rounded-lg relative mr-8">
                            <Image
                                className="rounded-lg"
                                src={games[2].background_image}
                                layout="fill"
                                objectFit="cover"
                                alt="platform-img"
                            />
                        </div>
                        <p className="text-xl">PC</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default LibraryView;
