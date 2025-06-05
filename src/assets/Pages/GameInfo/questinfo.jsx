import React from 'react';
import backg from '../../Picture/background.png'
import LOGO from '../../Picture/LOGO VIKINGS 1.png';
import Line from '../../Picture/Line Border.png';
import LineQuest from '../../Picture/Line-Quest.png'

export default function QuestInfo() {
    const quests = [
        { quest: "QUEST 1" },
        { quest: "QUEST 2" },
        { quest: "QUEST 3" },
        { quest: "QUEST 4" },
        { quest: "QUEST 5" },
        { quest: "QUEST 6" },
        { quest: "QUEST 7" },
        { quest: "QUEST 8" },
        { quest: "QUEST 9" },
        { quest: "QUEST 10" },
    ];
    return (
        <section className='h-full' >
            <div className='bg-cover bg-no-repeat ' style={{ backgroundImage: `url(${backg})` }}>
                <div className='flex flex-col items-center justify-center '>
                    <img src={LOGO} alt="Logo" className="w-[40%] mt-12" />
                    <img src={Line} alt="Line" className="w-full" />
                </div>
                <div className='flex flex-col gap-8 justify-between pt-12 w-full h-full px-16'>
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
                    <div className='flex flex-col w-full h-full gold-border items-center p-8 gap-2'>
                        {quests.map((quest, index) => (
                            <div key={index} className='flex flex-col gap-2'>
                                <div>
                                    {quest.quest}
                                </div>
                                <img src={LineQuest} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}