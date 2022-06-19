import React from 'react';
import Image from 'next/image';
import { Game } from '../types';

const MainImage = ({ mainGame }: { mainGame: Game | null }) => {
    if (!mainGame) return <></>;

    return (
        <div className="relative">
            <div className="relative mb-10 -z-10 w-screen md:max-w-[60rem] h-[60vh]">
                <Image
                    className="rounded-lg opacity-40"
                    src={mainGame?.background_image}
                    layout="fill"
                    objectFit="cover"
                    alt="main-game-image"
                    priority={true}
                />
            </div>
            <a
                href={`https://rawg.io/games/${mainGame.slug}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <h1 className="text-4xl md:text-8xl hover:cursor-pointer absolute bottom-[10rem] left-10 md:left-20 font-bold">
                    {mainGame.name}
                </h1>
            </a>

            <div className="text-xl border p-2 rounded-lg absolute bottom-[5rem] left-10 md:left-20 font-bold">
                {mainGame.metacritic || 0} Metacritic
            </div>

            <div className="text-xl w-fit absolute bottom-[5rem] left-48 md:left-60 border p-2 rounded-lg">
                {mainGame.ratings_count || 0} rating count
            </div>

            <div className="text-sm w-fit absolute bottom-[2rem] left-10 md:left-20 p-2 rounded-lg">
                Average playtime: {mainGame.playtime || 0} hours
            </div>
        </div>
    );
};

export default MainImage;
