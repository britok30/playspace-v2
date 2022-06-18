import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Game } from "../types";
import GameRow from "../components/GameRow";
import MainImage from "../components/MainImage";
import Sidebar from "../components/Sidebar";

interface HomeProps {
  allGames: Game[];
  anticipatedGames: Game[];
  popularGames: Game[];
  playstation: Game[];
  pc: Game[];
  xbox: Game[];
  eaGames: Game[];
  metacritic: Game[];
}

const Home = ({
  allGames,
  anticipatedGames,
  popularGames,
  playstation,
  xbox,
  metacritic,
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

      <main className="flex mb-24 xl:px-4">
        <div className="mr-4">
          {mainGame && (
            <a
              className="cursor-pointer transition duration-[.4s]"
              href={`https://rawg.io/games/${mainGame.slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MainImage mainGame={mainGame} />
            </a>
          )}
          <div className="flex flex-col space-y-24 ">
            <GameRow title="Most played games" games={allGames} />
            <GameRow title="Most anticipated games" games={anticipatedGames} />
            <GameRow title="Popular games" games={popularGames} />
            <GameRow title="Electronic Arts" games={eaGames} />
            <GameRow title="Top rated games" games={metacritic} />
            <GameRow title="New Playstation releases" games={playstation} />
            <GameRow title="New Xbox releases" games={xbox} />
            <GameRow title="New PC releases" games={pc} />
          </div>
        </div>

        <Sidebar mainGame={mainGame} games={popularGames} />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const BASE_URL = "https://api.rawg.io/api";
  const year = new Date().getFullYear();

  const allGamesRes = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: `${process.env.NEXT_PUBLIC_API_KEY}`,
      page_size: 50,
    },
  });

  const anticipatedRes = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: `${process.env.NEXT_PUBLIC_API_KEY}`,
      dates: `${year - 2}-10-10,${year - 1}-10-10`,
      ordering: "-added",
      page_size: 50,
    },
  });

  const popularGamesRes = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: `${process.env.NEXT_PUBLIC_API_KEY}`,
      dates: `${year - 1}-01-01,${year - 1}-12-31`,
      ordering: "-added",
      page_size: 50,
    },
  });

  const eaGamesRes = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: `${process.env.NEXT_PUBLIC_API_KEY}`,
      ordering: "-rating",
      developers: 109,
    },
  });

  const playstationRes = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: `${process.env.NEXT_PUBLIC_API_KEY}`,
      dates: `${year}-01-01,${year}-12-31`,
      platforms: 18,
    },
  });

  const xBoxRes = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: `${process.env.NEXT_PUBLIC_API_KEY}`,
      dates: `${year}-01-01,${year}-12-31`,
      platforms: 1,
    },
  });

  const pcRes = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: `${process.env.NEXT_PUBLIC_API_KEY}`,
      dates: `${year}-01-01,${year}-12-31`,
      platforms: 4,
    },
  });

  const metacriticRes = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: `${process.env.NEXT_PUBLIC_API_KEY}`,
      metacritic: `90,100`,
    },
  });

  const allGames = allGamesRes.data.results;
  const anticipatedGames = anticipatedRes.data.results;
  const popularGames = popularGamesRes.data.results;
  const eaGames = eaGamesRes.data.results;
  const playstation = playstationRes.data.results;
  const xbox = xBoxRes.data.results;
  const pc = pcRes.data.results;
  const metacritic = metacriticRes.data.results;

  return {
    props: {
      allGames,
      anticipatedGames,
      popularGames,
      eaGames,
      playstation,
      xbox,
      pc,
      metacritic
    },
  };
};
