import React from "react";
import { Game } from "../types";
import Image from "next/image";

const Thumbnail = ({ game }: { game: Game }) => {
  return (
    <div className="relative h-28 mb-6 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
      <Image
        src={game.background_image}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
      />
    </div>
  );
};

export default Thumbnail;
