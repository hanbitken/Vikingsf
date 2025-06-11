import React from 'react';
import { FaInstagram, FaTiktok, FaFacebook, FaDiscord } from 'react-icons/fa';
import LOGO from '../../assets/Picture/LOGO VIKINGS 1.png';
import Line from '../../assets/Picture/Line Border.png';
import LineQuest from '../../assets/Picture/Line-Quest.png'

export default function Rules() {

    const Rules = [
        { RulesID: "RULES 1", Rules: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo,  eros non dignissim tincidunt, tortor sem ultricies lectus, ut efficitur  lorem nulla at ante. osuere erat sed tortor bibendum, eget  sagittis sapien auctor. Maecenas ultrices mi nec ipsum feugiat congue.  Nulla pellentesque ac lacus id suscipit. Cras varius a nisi a rutrum.  Morbi placerat massa sit amet leo malesuada mattis. Vestibulum eget  sagittis ante. " },

        { RulesID: "RULES 2", Rules: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo,  eros non dignissim tincidunt, tortor sem ultricies lectus, ut efficitur  lorem nulla at ante. osuere erat sed tortor bibendum, eget  sagittis sapien auctor. Maecenas ultrices mi nec ipsum feugiat congue.  Nulla pellentesque ac lacus id suscipit. Cras varius a nisi a rutrum.  Morbi placerat massa sit amet leo malesuada mattis. Vestibulum eget  sagittis ante. " },

        { RulesID: "RULES 3", Rules: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo,  eros non dignissim tincidunt, tortor sem ultricies lectus, ut efficitur  lorem nulla at ante. osuere erat sed tortor bibendum, eget  sagittis sapien auctor. Maecenas ultrices mi nec ipsum feugiat congue.  Nulla pellentesque ac lacus id suscipit. Cras varius a nisi a rutrum.  Morbi placerat massa sit amet leo malesuada mattis. Vestibulum eget  sagittis ante. " },
    ];

    return (
        <section className='h-full' >
            <div className='bg-cover bg-no-repeat main-background-container'>
                <div className='flex flex-col items-center justify-center mx-8'>
                    <img src={LOGO} alt="Logo" className="w-[40%] mt-12" />
                    <img src={Line} alt="Line" className="w-full" />
                </div>
                <div className='flex flex-col gap-8 justify-between pt-12 w-full h-full px-16 pb-8'>
                    <div className='flex flex-col w-full h-full gold-border items-center p-4 gap-4'>
                        <div>
                            SERVER RULES
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
                    <div className='flex flex-col w-full h-full gold-border items-center gap-4 p-12'>
                        {Rules.map((rules, index) => (
                            <div key={index} className='flex flex-col gap-2'>
                                <div>
                                    {rules.RulesID}
                                </div>
                                <img src={LineQuest} alt="" />
                                <div className='text-lg px-16'>
                                    {rules.Rules}
                                </div>
                            </div>
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