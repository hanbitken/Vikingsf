import React from 'react';
import atas from '../Picture/atas.png'
import LOGO from '../Picture/LOGO VIKINGS 1.png';
import Line from '../Picture/Line Border.png';
import bawah from '../Picture/bawah.png'

export default function gameinfo() {
    return (
        <section className='relative w-full' >
            {/* Gambar atas */}
            <div className='w-full h-screen bg-cover z-10 flex-col items-center' style={{ backgroundImage: `url(${atas})` }}>
                <div className='flex flex-col items-center justify-center pt-8'>
                    <img src={LOGO} alt="Logo" className="w-[40%]" />
                    <img src={Line} alt="Line" className="w-full" />
                </div>
            </div>
            {/* Layer Tengah */}
            <div className='w-full h-screen -mt-64 z-20 relative' style={{ background: "linear-gradient(360deg,  rgba(45,44,44,0) 0%, #705C3D 17%, #AC9364 55%, #FEEAB8 80%, rgba(53,53,53,0) 100%)" }}>

            </div>
            {/* Gambar Bawah */}
            <div className='w-full h-screen bg-cover -mt-32 z-10 relative0' style={{ backgroundImage: `url(${bawah})` }}>
                
            </div>
        </section>
    );
}