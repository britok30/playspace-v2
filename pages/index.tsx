import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Game } from "../types";
import GameRow from "../components/GameRow";

interface HomeProps {
  allGames: Game[];
  anticipatedGames: Game[];
  popularGames: Game[];
  playstation: Game[];
  pc: Game[];
  xbox: Game[];
  eaGames: Game[];
}

const Home = ({
  allGames,
  anticipatedGames,
  popularGames,
  playstation,
  xbox,
  pc,
  eaGames,
}: HomeProps) => {
  const [mainGame, setMainGame] = useState<Game | null>(null);

  useEffect(() => {
    if (!allGames) return;
    setMainGame(allGames[Math.floor(Math.random() * allGames.length)]);
  }, [allGames]);

  return (
    <div className="relative min-h-screen">
      <Head>
        <title>Playspace V2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <div className="flex justify-between">
        <main className="flex-1 mr-4 pl-16 min-h-screen mb-24">
          {mainGame && (
            <div className="relative mb-10">
              <a
                className="cursor-pointer"
                href={`https://rawg.io/games/${mainGame.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className="rounded-lg opacity-40 hover:opacity-60 transition duration-[.4s]"
                  src={mainGame?.background_image}
                  width={1000}
                  height={500}
                  layout="responsive"
                  objectFit="cover"
                />
                <h1 className="text-4xl w-[72rem] absolute bottom-[10rem] left-20 font-bold">
                  {mainGame.name}
                </h1>

                <div className="text-2xl border p-4 rounded-lg  absolute bottom-[5rem] left-20 font-bold">
                  {mainGame.metacritic || 0} Metacritic
                </div>
              </a>
            </div>
          )}
          <div className="flex flex-col space-y-24">
            <GameRow title="Most played games" games={allGames} />
            <GameRow title="Most anticipated games" games={anticipatedGames} />
            <GameRow title="Popular games" games={popularGames} />
            <GameRow title="Electronic Arts" games={eaGames} />
            <GameRow title="New Playstation releases" games={playstation} />
            <GameRow title="New Xbox releases" games={xbox} />
            <GameRow title="New PC releases" games={pc} />
          </div>
        </main>

        <div className="bg-[#393e464f] w-[30rem] h-[max-content] rounded-lg mr-20 p-8">
          <>
            {mainGame?.short_screenshots.map((sh) => {
              return (
                <div className="h-28 relative mb-10 opacity-60 hover:opacity-100 hover:scale-105 transition duration-[.4s]">
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
        </div>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const BASE_URL = "https://api.rawg.io/api/games";
  const year = new Date().getFullYear();

  const allGamesRes = await axios.get(`${BASE_URL}`, {
    params: {
      key: `${process.env.NEXT_PUBLIC_API_KEY}`,
      page_size: 50,
    },
  });

  const anticipatedRes = await axios.get(`${BASE_URL}`, {
    params: {
      key: `${process.env.NEXT_PUBLIC_API_KEY}`,
      dates: `${year - 2}-10-10,${year - 1}-10-10`,
      ordering: "-added",
      page_size: 50,
    },
  });

  const popularGamesRes = await axios.get(`${BASE_URL}`, {
    params: {
      key: `${process.env.NEXT_PUBLIC_API_KEY}`,
      dates: `${year - 1}-01-01,${year - 1}-12-31`,
      ordering: "-added",
      page_size: 50,
    },
  });

  const eaGamesRes = await axios.get(`${BASE_URL}`, {
    params: {
      key: `${process.env.NEXT_PUBLIC_API_KEY}`,
      ordering: "-rating",
      developers: 109,
    },
  });

  const playstationRes = await axios.get(`${BASE_URL}`, {
    params: {
      key: `${process.env.NEXT_PUBLIC_API_KEY}`,
      dates: `${year}-01-01,${year}-12-31`,
      platforms: 18,
    },
  });

  const xBoxRes = await axios.get(`${BASE_URL}`, {
    params: {
      key: `${process.env.NEXT_PUBLIC_API_KEY}`,
      dates: `${year}-01-01,${year}-12-31`,
      platforms: 1,
    },
  });

  const pcRes = await axios.get(`${BASE_URL}`, {
    params: {
      key: `${process.env.NEXT_PUBLIC_API_KEY}`,
      dates: `${year}-01-01,${year}-12-31`,
      platforms: 7,
    },
  });

  const allGames = allGamesRes.data.results;
  const anticipatedGames = anticipatedRes.data.results;
  const popularGames = popularGamesRes.data.results;
  const eaGames = eaGamesRes.data.results;
  const playstation = playstationRes.data.results;
  const xbox = xBoxRes.data.results;
  const pc = pcRes.data.results;

  return {
    props: {
      allGames,
      anticipatedGames,
      popularGames,
      eaGames,
      playstation,
      xbox,
      pc,
    },
  };
};
