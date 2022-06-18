import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { Game } from "../types";
import { HomeIcon } from "@heroicons/react/solid";
import GameRow from "../components/GameRow";

interface HomeProps {
  games: Game[];
}

const Home = ({ games }: HomeProps) => {
  const [mainGame, setMainGame] = useState<Game | null>(null);

  useEffect(() => {
    if (!games) return;
    setMainGame(games[Math.floor(Math.random() * games.length)]);
  }, [games]);

  return (
    <div className="relative min-h-screen w-screen bg-gradient-to-b">
      <Head>
        <title>Playspace V2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="flex justify-between">
        <nav className="hidden md:block md:pl-16">
          <ul className="list-none mt-10">
            <li>
              <HomeIcon className="text-white w-6 h-6" />
            </li>
          </ul>
        </nav>
        <main className="flex-2 min-h-screen">
          {mainGame && (
            <div className="relative mb-10">
              <Image
                className="rounded-lg opacity-60"
                src={mainGame?.background_image}
                width={1000}
                height={500}
                layout="responsive"
                objectFit="cover"
              />
              <h1 className="text-4xl w-[72rem] absolute bottom-32 left-20 font-bold">
                {mainGame.name}
              </h1>
            </div>
          )}
          <section>
            <GameRow games={games} />
          </section>
        </main>
        <div className="bg-[#393e4691] w-[30rem] h-[50rem] rounded-lg mr-20"></div>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const BASE_URL = "https://api.rawg.io/api/games";

  const response = await axios.get(`${BASE_URL}`, {
    params: {
      key: `${process.env.NEXT_PUBLIC_API_KEY}`,
      page_size: 10,
    },
  });

  const games = response.data.results;

  return {
    props: {
      games,
    },
  };
};
