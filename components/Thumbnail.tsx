import React from "react";
import { Game } from "../types";
import Image from "next/image";

const Thumbnail = ({ game }: { game: Game }) => {
  return (
    <div className="relative h-32 mb-6 w-[250px] hover:scale-105 cursor-pointer transition duration-[.4s] ease-out">
      <a
        href={`https://rawg.io/games/${game.slug}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={game.background_image}
          className="rounded-lg opacity-30"
          layout="fill"
          objectFit="cover"
          alt="games"
        />
        <div className="absolute bottom-5 left-5">
          <h3 className="font-semibold text-lg truncate w-40 mb-2">
            {game.name}
          </h3>
          <div className="bg-black rounded-lg w-24 flex justify-center opacity-60 mb-2">
            <span className="font-medium text-sm block">
              {game.rating || 0}/5
            </span>
          </div>

          <div className="bg-black rounded-lg w-24 flex justify-center opacity-60">
            <span className="font-medium text-white text-sm block">
              {game.released}
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Thumbnail;
