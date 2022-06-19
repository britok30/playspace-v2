import Head from 'next/head';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Game } from '../types';
import GameRow from '../components/GameRow';
import MainImage from '../components/MainImage';
import Sidebar from '../components/Sidebar';

interface HomeProps {
    allGames: Game[];
    anticipatedGames: Game[];
    popularGames: Game[];
    metacritic: Game[];
}

const Home = ({
    allGames,
    anticipatedGames,
    popularGames,
    metacritic,
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
                        <GameRow
                            title="Most anticipated games"
                            games={anticipatedGames}
                        />
                        <GameRow title="Popular games" games={popularGames} />
                        <GameRow title="Top rated games" games={metacritic} />
                    </div>
                </div>

                <Sidebar mainGame={mainGame} games={popularGames} />
            </main>
        </div>
    );
};

export default Home;

export const getServerSideProps = async () => {
    const BASE_URL = 'https://api.rawg.io/api';
    const year = new Date().getFullYear();

    const allGamesReq = axios.get(`${BASE_URL}/games`, {
        params: {
            key: `${process.env.NEXT_PUBLIC_API_KEY}`,
        },
    });

    const anticipatedReq = axios.get(`${BASE_URL}/games`, {
        params: {
            key: `${process.env.NEXT_PUBLIC_API_KEY}`,
            dates: `${year - 2}-10-10,${year - 1}-10-10`,
            ordering: '-added',
        },
    });

    const popularGamesReq = axios.get(`${BASE_URL}/games`, {
        params: {
            key: `${process.env.NEXT_PUBLIC_API_KEY}`,
            dates: `${year - 1}-01-01,${year - 1}-12-31`,
            ordering: '-added',
        },
    });

    const metacriticReq = axios.get(`${BASE_URL}/games`, {
        params: {
            key: `${process.env.NEXT_PUBLIC_API_KEY}`,
            metacritic: `90,100`,
        },
    });

    const [allGamesRes, anticipatedGamesRes, popularGamesRes, metacriticRes] =
        await Promise.all([
            allGamesReq,
            anticipatedReq,
            popularGamesReq,
            metacriticReq,
        ]);

    return {
        props: {
            allGames: allGamesRes.data.results,
            anticipatedGames: anticipatedGamesRes.data.results,
            popularGames: popularGamesRes.data.results,
            metacritic: metacriticRes.data.results,
        },
    };
};
