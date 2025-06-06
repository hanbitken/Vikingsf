import React from 'react';
import { FaInstagram, FaTiktok, FaFacebook, FaDiscord } from 'react-icons/fa';
import backg from '../../assets/Picture/background.png'
import LOGO from '../../assets/Picture/LOGO VIKINGS 1.png';
import Line from '../../assets/Picture/Line Border.png';
import LineQuest from '../../assets/Picture/Line-Quest.png'
export default function MapInfo() {

    const Maps = [
        { name: "Accretia HQ", id: "accretia-hq" },
        { name: "Armor-213", id: "armor-213" },
        { name: "Armor-117", id: "armor-117" },
        { name: "Bellato HQ", id: "bellato-hq" },
        { name: "Test Map", id: "test-map-1" },
        // Add more maps here
    ];

    return (
        <section className='h-full' >
            <div className='bg-cover bg-no-repeat ' style={{ backgroundImage: `url(${backg})` }}>
                <div className='flex flex-col items-center justify-center mx-8'>
                    <img src={LOGO} alt="Logo" className="w-[40%] mt-12" />
                    <img src={Line} alt="Line" className="w-full" />
                </div>
                <div className='flex flex-col gap-8 justify-between pt-12 w-full h-full px-16 pb-8'>
                    <div className='flex flex-col w-full h-full gold-border items-center p-4 gap-4'>
                        <div>
                            QUEST INFO
                        </div>
                        <img src={LineQuest} alt="" />
                        <div className='flex flex-row gap-4'>
                            <div>
                                SERVER INFO
                            </div>
                            <div>
                                ONLINE
                            </div>
                            <div>
                                300 player
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col w-full h-full gold-border items-center gap-2 p-8'>
                        {Maps.map((map) => (
                            <Link key={map.id} className='flex flex-col gap-2'>
                                <div>
                                    {map.name}
                                </div>
                                <img src={LineQuest} alt="" />
                            </Link>
                        ))}
                    </div>
                </div>
                <div className='items-center justify-center pb-4 mx-8'>
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
        </section>
    );
}