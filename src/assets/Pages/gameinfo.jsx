import React from 'react';
import backg from '../Picture/background.png'
import LOGO from '../Picture/LOGO VIKINGS 1.png';
import Line from '../Picture/Line Border.png';


export default function gameinfo() {
    return (
        <section className='w-full h-full' >
            <div className='w-full  bg-cover bg-no-repeat ' style={{ backgroundImage: `url(${backg})` }}>
                <div className='flex flex-col items-center justify-center '>
                    <img src={LOGO} alt="Logo" className="w-[40%] mt-12" />
                    <img src={Line} alt="Line" className="w-full" />
                </div>
                <div className='flex flex-col  justify-between pt-12 px-24  w-screen h-screen'>
                    <div className='flex flex-row gap-4'>
                        <div className='w-full h-[100px] rounded-lg bg-black'></div>
                        <div className='w-[40%] bg-black rounded-lg'></div>
                    </div>
                    <div>
                        dsnfjksdn
                    </div>
                </div>
            </div>
        </section>
    );
}