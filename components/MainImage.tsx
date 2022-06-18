import React from "react";
import Image from "next/image";
import { Game } from "../types";

const MainImage = ({ mainGame }: { mainGame: Game | null }) => {
  if (!mainGame) return <></>;

  return (
    <div className="relative mb-10 -z-10 w-screen md:max-w-[80rem] h-[60vh]">
      <Image
        className="rounded-lg "
        src={mainGame?.background_image}
        layout="fill"
        objectFit="cover"
        alt="main-game-image"
      />
      <h1 className="text-4xl md:text-8xl absolute bottom-[10rem] left-10 md:left-20 font-bold">
        {mainGame.name}
      </h1>

      <div className="text-xl border p-2 rounded-lg absolute bottom-[5rem] left-10 md:left-20 font-bold">
        {mainGame.metacritic || 0} Metacritic
      </div>

      <div className="w-fit flex absolute bottom-[5rem] left-48 md:left-60 border p-2 rounded-lg">
        {mainGame.ratings_count} count
      </div>
    </div>
  );
};

export default MainImage;
