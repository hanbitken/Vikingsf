import React, { useState } from 'react';
import { FaInstagram, FaTiktok, FaFacebook, FaDiscord } from 'react-icons/fa';
import backg from '../Picture/background.png'
import LOGO from '../Picture/LOGO VIKINGS 1.png';
import Line from '../Picture/Line Border.png';
import atas from '../Picture/atas.png';
import news from '../Picture/RF-Project-News.png';
import InfoLine from '../Picture/Line-Info.png';
import profile from '../Picture/profile.png';
import Cora from '../Picture/Cora.png';
import Bellato from '../Picture/Bellato.png'
import Accretia from '../Picture/Accretia.png'


export default function gameinfo() {

    const raceStats = [
        {
            icon: Cora, // Ganti dengan path sesuai
            players: 100,
            kills: 0,
        },
        {
            icon: Accretia,
            players: 100,
            kills: 0,
        },
        {
            icon: Bellato,
            players: 100,
            kills: 0,
        },
    ];

    const players = [
        { name: "PLAYER1", faction: "Accretia", win: 400, lose: 350 },
        { name: "PLAYER2", faction: "Accretia", win: 400, lose: 350 },
        { name: "PLAYER3", faction: "Accretia", win: 400, lose: 350 },
        { name: "PLAYER4", faction: "Accretia", win: 400, lose: 350 },
        { name: "PLAYER5", faction: "Accretia", win: 400, lose: 350 },
    ];

    const slides = [
        {
            id: 1,
            title: "LOREM IPSUM",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar non ante eleifend lacinia.....",
            image: atas
        },
        {
            id: 2,
            title: "DOLOR SIT AMET",
            description:
                "Vivamus quis ligula at mauris eleifend bibendum. Suspendisse accumsan nisi ut lacus fermentum finibus.",
            image: news
        },
        {
            id: 3,
            title: "CONSECTETUR ELIT",
            description:
                "Sed consequat sapien et urna lacinia, a fermentum velit commodo. Nam feugiat efficitur neque.",
            image: news
        }
    ];
    const newsData = [
        {
            id: 1,
            title: "Teknologi AI Mengubah Dunia",
            summary: "Kecerdasan buatan kini telah digunakan dalam berbagai sektor industri, dari kesehatan hingga pertanian.",
            imageUrl: atas
        },
        {
            id: 2,
            title: "Cuaca Ekstrem Melanda Indonesia",
            summary: "BMKG memperingatkan potensi bencana alam akibat cuaca ekstrem di beberapa wilayah.",
            imageUrl: "https://source.unsplash.com/800x600/?weather"
        },
        {
            id: 3,
            title: "Tren Kuliner 2025",
            summary: "Makanan nabati dan fermentasi alami diprediksi menjadi tren kuliner tahun ini.",
            imageUrl: "https://source.unsplash.com/800x600/?food"
        }
    ];
    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const currentSlide = slides[current];

    return (
        <section className='h-full' >
            <div className='bg-cover bg-no-repeat ' style={{ backgroundImage: `url(${backg})` }}>
                <div className='flex flex-col items-center justify-center '>
                    <img src={LOGO} alt="Logo" className="w-[40%] mt-12" />
                    <img src={Line} alt="Line" className="w-full" />
                </div>
                <div className='flex flex-col gap-8 justify-between pt-12 w-full h-full px-16'>
                    <div className='flex flex-row gap-8'>
                        <div className="relative w-full  border-2 overflow-hidden bg-black/25 rounded-xl border-[#FFC86E]/60">
                            {/* Background image */}
                            <div
                                className="w-full h-full bg-cover transition-all duration-700"
                                style={{ backgroundImage: `url(${currentSlide.image})` }}
                            >
                                {/* Content */}
                                <div className="font-['Bebas_Neue'] absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent px-8 py-4 text-white text-left border-t-1  border-[#FFC86E]/60">
                                    <h2 className="text-3xl text-white "
                                        style={{
                                            WebkitTextStroke: '1px #FFC86E',
                                        }}
                                    >
                                        {currentSlide.title}
                                    </h2>
                                    <p className="text-lg">{currentSlide.description}</p>
                                </div>

                                {/* Left arrow */}
                                <button
                                    onClick={prevSlide}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white  hover:bg-white/30 rounded-full"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                {/* Right arrow */}
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white "
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="w-[40%] flex flex-col border-2 h-full gap-4 bg-black/25 rounded-xl border-[#FFC86E]/60 p-8">
                            <div className='text-center text-xl'>
                                <h2>
                                    SERVER INFO
                                </h2>
                            </div>
                            <img src={InfoLine} alt="" />
                            <div className="flex items-center justify-center px-8 space-x-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-6m0-6h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                                </svg>
                                <span className="text-green-400 font-bold text-center text-lg">ONLINE</span>
                            </div>

                            <div className="flex items-center justify-center px-8 space-x-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m0-4a4 4 0 118 0 4 4 0 01-8 0zm10 0a4 4 0 118 0 4 4 0 01-8 0z" />
                                </svg>
                                <span className="font-bold text-lg">300 PLAYERS</span>
                            </div>

                            <div className="space-y-4 px-6">
                                {raceStats.map((race, index) => (
                                    <div key={index} className="flex items-center space-x-4">
                                        <img src={race.icon} alt={`Race ${index + 1}`} className="w-12 h-12 object-cover border-2" />
                                        <div className="flex-1 flex justify-between items-center">
                                            <span className="font-bold">100 PLAYERS</span>
                                            <span className="font-bold">TOTAL KILL: {race.kills}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row gap-8'>
                        {/* TOP PLAYER */}
                        <div className='flex flex-col h-full gap-4 w-1/3 border-2 bg-black/25 rounded-xl border-[#FFC86E]/60 p-8'>
                            <div className='text-center text-xl'>
                                <h2>
                                    TOP PLAYER
                                </h2>
                            </div>
                            <img src={InfoLine} alt="" />
                            <div className='flex flex-col justify-center gap-4 px-8'>
                                {players.map((player, index) => (
                                    <div key={index} className='flex flex-row justify-between items-center align-center'>
                                        <div className='flex flex-row gap-4 items-center'>
                                            {/* <div className="border-2 rounded-md p-2">
                                                <svg
                                                    className="w-8 h-8 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                            </div> */}
                                            <div className='w-full h-full'>
                                                <img src={profile} alt="" />
                                            </div>
                                            <div className='flex flex-col text-left'>
                                                <h2 className='text-xl'>{player.name}r</h2>
                                                <h3 className='text-lg'>{player.faction}</h3>
                                            </div>
                                        </div>
                                        {/* kill | Death */}
                                        <div className='text-xl'>
                                            <span className="text-green-400">{player.win}</span>{" "}
                                            <span className="text-white">|</span>{" "}
                                            <span className="text-red-500">{player.lose}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col h-full gap-4 w-1/3 border-2 h-64 bg-black/25 rounded-xl border-[#FFC86E]/60 p-8'>
                            <div className='text-center text-xl'>
                                <h2>
                                    TOP GUILD
                                </h2>
                            </div>
                            <img src={InfoLine} alt="" />
                            <div className='flex flex-col justify-center gap-4 px-8'>
                                {players.map((player, index) => (
                                    <div key={index} className='flex flex-row justify-between items-center align-center'>
                                        <div className='flex flex-row gap-4 items-center'>
                                            {/* <div className="border-2 rounded-md p-2">
                                                <svg
                                                    className="w-8 h-8 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                            </div> */}
                                            <div className='w-full h-full'>
                                                <img src={profile} alt="" />
                                            </div>
                                            <div className='flex flex-col text-left'>
                                                <h2 className='text-xl'>{player.name}r</h2>
                                                <h3 className='text-lg'>{player.faction}</h3>
                                            </div>
                                        </div>
                                        {/* kill | Death */}
                                        <div className='text-xl'>
                                            <span className="text-green-400">{player.win}</span>{" "}
                                            <span className="text-white">|</span>{" "}
                                            <span className="text-red-500">{player.lose}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col h-full gap-4 w-1/3 border-2 h-64 bg-black/25 rounded-xl border-[#FFC86E]/60 p-8'>
                            <div className='text-center text-xl'>
                                <h2>
                                    VIP
                                </h2>
                            </div>
                            <img src={InfoLine} alt="" />
                            <div className='flex flex-col justify-center gap-4 px-8'>
                                {players.map((player, index) => (
                                    <div key={index} className='flex flex-row justify-between items-center align-center'>
                                        <div className='flex flex-row gap-4 items-center'>
                                            {/* <div className="border-2 rounded-md p-2">
                                                <svg
                                                    className="w-8 h-8 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                            </div> */}
                                            <div className='w-full h-full'>
                                                <img src={profile} alt="" />
                                            </div>
                                            <div className='flex flex-col text-left'>
                                                <h2 className='text-xl'>{player.name}r</h2>
                                                <h3 className='text-lg'>{player.faction}</h3>
                                            </div>
                                        </div>
                                        {/* kill | Death */}
                                        <div className='text-xl'>
                                            <span className="text-green-400">{player.win}</span>{" "}
                                            <span className="text-white">|</span>{" "}
                                            <span className="text-red-500">{player.lose}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='items-center justify-center pb-4'>
                        <img src={Line} alt="Line" className="w-full" />
                        <div className='flex flex-row justify-center items-center gap-2'>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition">
                                <FaInstagram />
                            </a>
                            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition">
                                <FaTiktok />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
                                <FaFacebook />
                            </a>
                            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
                                <FaDiscord />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}