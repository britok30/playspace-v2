import Head from 'next/head';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Game } from '../types';
import GameRow from '../components/GameRow';
import MainImage from '../components/MainImage';
import Sidebar from '../components/Sidebar';

interface PcProps {
    pc: Game[];
    pcMeta: Game[];
}

const Pc = ({ pc, pcMeta }: PcProps) => {
    const [mainGame, setMainGame] = useState<Game | null>(null);

    useEffect(() => {
        if (!pc) return;
        setMainGame(pc[Math.floor(Math.random() * pc.length)]);
    }, [pc]);

    return (
        <div className="relative min-h-screen">
            <Head>
                <title>Playspace V2 | PC</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <main className="md:grid md:grid-cols-6 mb-24 md:px-4">
                <div className="md:mr-4 md:col-span-4">
                    <div>{mainGame && <MainImage mainGame={mainGame} />}</div>
                    <div className="flex flex-col space-y-24 ">
                        <GameRow title="New PC releases" games={pc} />
                        <GameRow title="Top rated PC games" games={pcMeta} />
                    </div>
                </div>

                <Sidebar mainGame={mainGame} games={pc} />
            </main>
        </div>
    );
};

export default Pc;

export const getServerSideProps = async () => {
    const BASE_URL = 'https://api.rawg.io/api';
    const year = new Date().getFullYear();

    const pcReq = axios.get(`${BASE_URL}/games`, {
        params: {
            key: `${process.env.NEXT_PUBLIC_API_KEY}`,
            dates: `${year}-01-01,${year}-12-31`,
            platforms: 4,
        },
    });

    const pcMetaReq = axios.get(`${BASE_URL}/games`, {
        params: {
            key: `${process.env.NEXT_PUBLIC_API_KEY}`,
            metacritic: `90,100`,
            platforms: 4,
        },
    });

    const [pcRes, pcMetaRes] = await Promise.all([pcReq, pcMetaReq]);

    return {
        props: {
            pc: pcRes.data.results,
            pcMeta: pcMetaRes.data.results,
        },
    };
};
