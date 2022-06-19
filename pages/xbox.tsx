import Head from 'next/head';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Game } from '../types';
import GameRow from '../components/GameRow';
import MainImage from '../components/MainImage';
import Sidebar from '../components/Sidebar';

interface XboxProps {
    xbox: Game[];
}

const Xbox = ({ xbox }: XboxProps) => {
    const [mainGame, setMainGame] = useState<Game | null>(null);
    useEffect(() => {
        if (!xbox) return;
        setMainGame(
            xbox[Math.floor(Math.random() * xbox.length)]
        );
    }, [xbox]);

    return (
        <div className="relative min-h-screen">
            <Head>
                <title>Playspace V2 | Xbox</title>
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
                        <GameRow
                            title="New Xbox releases"
                            games={xbox}
                        />
                    </div>
                </div>

                <Sidebar mainGame={mainGame} games={xbox} />
            </main>
        </div>
    );
};

export default Xbox;

export const getServerSideProps = async () => {
    const BASE_URL = 'https://api.rawg.io/api';
    const year = new Date().getFullYear();

    const xBoxRes = await axios.get(`${BASE_URL}/games`, {
        params: {
            key: `${process.env.NEXT_PUBLIC_API_KEY}`,
            dates: `${year}-01-01,${year}-12-31`,
            platforms: 1,
        },
    });

    return {
        props: {
            xbox: xBoxRes.data.results,
        },
    };
};
