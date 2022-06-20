import Head from 'next/head';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Game } from '../types';
import GameRow from '../components/GameRow';
import MainImage from '../components/MainImage';
import Sidebar from '../components/Sidebar';

interface PlaystationProps {
    playstation: Game[];
    playstationMeta: Game[];
}

const Playstation = ({ playstation, playstationMeta }: PlaystationProps) => {
    const [mainGame, setMainGame] = useState<Game | null>(null);
    useEffect(() => {
        if (!playstation) return;
        setMainGame(
            playstation[Math.floor(Math.random() * playstation.length)]
        );
    }, [playstation]);

    return (
        <div className="relative min-h-screen">
            <Head>
                <title>Playspace V2 | Playstation</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <main className="md:grid md:grid-cols-6 mb-24 md:px-4">
                <div className="md:mr-4 md:col-span-4">
                    <div>{mainGame && <MainImage mainGame={mainGame} />}</div>
                    <div className="flex flex-col space-y-24 ">
                        <GameRow
                            title="New Playstation releases"
                            games={playstation}
                        />
                        <GameRow
                            title="Top rated Playstation games"
                            games={playstationMeta}
                        />
                    </div>
                </div>

                <Sidebar mainGame={mainGame} games={playstation} />
            </main>
        </div>
    );
};

export default Playstation;

export const getServerSideProps = async () => {
    const BASE_URL = 'https://api.rawg.io/api';
    const year = new Date().getFullYear();

    const playstationReq = axios.get(`${BASE_URL}/games`, {
        params: {
            key: `${process.env.NEXT_PUBLIC_API_KEY}`,
            dates: `${year}-01-01,${year}-12-31`,
            platforms: 18,
            page_size: 50,
        },
    });

    const playstationMetaReq = axios.get(`${BASE_URL}/games`, {
        params: {
            key: `${process.env.NEXT_PUBLIC_API_KEY}`,
            metacritic: `90,100`,
            platforms: 18,
        },
    });

    const [playstationRes, playstationMetaRes] = await Promise.all([
        playstationReq,
        playstationMetaReq,
    ]);

    return {
        props: {
            playstation: playstationRes.data.results,
            playstationMeta: playstationMetaRes.data.results,
        },
    };
};
