import React from "react";
import { Game } from "../types";
import Image from "next/image";

const Thumbnail = ({ game }: { game: Game }) => {
  return (
    <div className="relative h-28 mb-6 min-w-[180px] cursor-pointer transition duration-[.4s] ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
      <a
        href={`https://rawg.io/games/${game.slug}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={game.background_image}
          className="rounded-sm opacity-40 hover:opacity-60 object-cover md:rounded transition duration-300"
          layout="fill"
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
