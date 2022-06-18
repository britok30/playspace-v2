import React, { useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import Thumbnail from "../components/Thumbnail";
import { Game } from "../types";

enum Direction {
  LEFT = "left",
  RIGHT = "right",
}

const GameRow = ({ games, title }: { games: Game[]; title: string }) => {
  const gameRowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: Direction) => {
    setIsMoved(true);

    if (gameRowRef.current) {
      const { scrollLeft, clientWidth } = gameRowRef.current;

      const scrollTo =
        direction === Direction.LEFT
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      gameRowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="h-40 space-y-0.5 md:space-y-2 w-screen md:max-w-[80rem]">
      <h2 className="text-2xl ml-4 font-semibold mb-8">{title}</h2>
      <div className="group relative md:ml-2">
        <ChevronLeftIcon
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && "hidden"
          }`}
          onClick={() => handleClick(Direction.LEFT)}
        />
        <div
          className="flex items-center space-x-6 overflow-x-scroll scrollbar-hide md:space-x-4 md:p-2"
          ref={gameRowRef}
        >
          {games.map((game) => (
            <div key={game.id}>
              <Thumbnail key={game.id} game={game} />
            </div>
          ))}
        </div>
        <ChevronRightIcon
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick(Direction.RIGHT)}
        />
      </div>
    </div>
  );
};

export default GameRow;
