import React from "react";
import { Game } from "../types";
import Image from "next/image";

const Sidebar = ({
  mainGame,
  games,
}: {
  mainGame: Game | null;
  games: Game[];
}) => {
  return (
    <div className="bg-[#393e464f] hidden xl:block md:w-[100rem] md:h-[max-content] rounded-lg  p-8">
      <h3 className="text-sm font-semibold mb-3">Screenshots</h3>
      <>
        {mainGame?.short_screenshots.map((sh) => {
          return (
            <div
              key={sh.id}
              className="h-28 relative mb-10 opacity-60 hover:opacity-100 hover:scale-105 transition duration-[.4s]"
            >
              <Image
                className="rounded-lg mb-3"
                src={sh.image}
                alt={`${mainGame.name}-screenshots`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          );
        })}
      </>
      <h3 className="text-sm font-semibold mb-3">Online</h3>
      <div className="flex flex-col">
        {games.slice(0, 5).map((game) => (
          <div
            key={game.id}
            className="py-3 pl-2 mb-5 relative cursor-pointer hover:bg-[#121212] rounded-lg transition duration-[.4s]"
          >
            <div className="relative w-16 h-16">
              <Image
                className="rounded-full opacity-80"
                src={game.background_image}
                alt="online-img"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="absolute left-24 top-5">
              <p className="font-semibold">Ghost #{game.id}</p>
              <span className="font-light text-gray-400">
                Playing {game.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
