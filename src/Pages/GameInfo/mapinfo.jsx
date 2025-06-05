import React from 'react';
import backg from '../../assets/Picture/background.png'
import LOGO from '../../assets/Picture/LOGO VIKINGS 1.png';
import Line from '../../assets/Picture/Line Border.png';

export default function MapInfo() {

    return (
        <section className='h-full' >
            <div className='bg-cover bg-no-repeat ' style={{ backgroundImage: `url(${backg})` }}>
                <div className='flex flex-col items-center justify-center '>
                    <img src={LOGO} alt="Logo" className="w-[40%] mt-12" />
                    <img src={Line} alt="Line" className="w-full" />
                </div>
                <div className='flex flex-col gap-8 justify-between pt-12 w-full h-full px-16'>
                    <div className='flex flex-col w-full h-64 gold-border'>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}