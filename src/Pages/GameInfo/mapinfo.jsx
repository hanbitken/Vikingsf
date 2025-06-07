import React, { useState } from 'react';
import { FaInstagram, FaTiktok, FaFacebook, FaDiscord } from 'react-icons/fa';
import backg from '../../assets/Picture/background.png'
import LOGO from '../../assets/Picture/LOGO VIKINGS 1.png';
import Line from '../../assets/Picture/Line Border.png';
import LineQuest from '../../assets/Picture/Line-Quest.png'
import map1 from '../../assets/Picture/map-dummy.png'

export default function MapInfo() {

    const maps = [
        { name: 'Armory 213', image: map1 },
        { name: 'Snake Canyon', image: map1 },
        { name: 'Death Valley', image: map1 },
        { name: 'Cruel Moor', image: map1 },
        { name: 'Snatcher Gate', image: map1 },
    ];

    // Set initial map
    const [selectedMap, setSelectedMap] = useState(null);  // Start with no map selected

    // Handle map selection
    const handleMapSelect = (event) => {
        const selected = maps.find(map => map.name === event.target.value);
        setSelectedMap(selected);
    };

    return (
        <section className='h-full'>
            <div className='bg-cover bg-no-repeat ' style={{ backgroundImage: `url(${backg})` }}>
                <div className='flex flex-col items-center justify-center mx-8'>
                    <img src={LOGO} alt="Logo" className="w-[40%] mt-12" />
                    <img src={Line} alt="Line" className="w-full" />
                </div>
                <div className='flex flex-col gap-8 justify-between pt-12 w-full h-full px-16 pb-8'>
                    <div className='flex flex-col w-full h-full gold-border items-center p-4 gap-4'>
                        <div>
                            SEARCH PLAYER
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

                    {/* Map list section */}
                    <div className='min-h-200 flex flex-col w-full h-full gold-border items-center gap-4 p-16'>
                        {/* Dropdown to select map */}
                        <div className='flex justify-center items-center space-x-4 w-[80%] bg-[#D9D9D9] rounded-lg'>
                            <select
                                value={selectedMap ? selectedMap.name : ''}
                                onChange={handleMapSelect}
                                className='w-[95%] text-center bg-transparent text-[#7F7F7F] border-white py-2 focus:outline-none'
                            >
                                <option value="">Select Map</option>
                                {maps.map(map => (
                                    <option key={map.name} value={map.name}>{map.name}</option>
                                ))}
                            </select>
                        </div>
                        <img src={LineQuest} alt="Line" className="w-full" />

                        {/* Display selected map if one is chosen */}
                        {selectedMap ? (
                            <div className='flex justify-center my-4'>
                                <img src={selectedMap.image} alt={selectedMap.name} className='max-w-full h-auto border-4 border-white rounded-lg shadow-lg' />
                            </div>
                        ) : (
                            <div className='text-center text-[#7F7F7F]'>
                                <p>Please select a map to view.</p>
                            </div>
                        )}

                        <img src={LineQuest} alt="Line" className="w-full" />
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
