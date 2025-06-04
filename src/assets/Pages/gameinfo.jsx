import React, { useState } from 'react';
import backg from '../Picture/background.png'
import LOGO from '../Picture/LOGO VIKINGS 1.png';
import Line from '../Picture/Line Border.png';
import atas from '../Picture/atas.png';
import news from '../Picture/RF-Project-News.png'

export default function gameinfo() {
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
                <div className='flex flex-col justify-between pt-12 w-full h-full px-8'>
                    <div className='flex flex-row gap-8'>
                        <div className="relative w-full h-86 border-2 overflow-hidden bg-black/25 rounded-xl border-[#FFC86E]/60">
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
                        {/* <div className='w-full h-64 border-2 bg-black/25 rounded-xl border-[#FFC86E]/60' style={{
                            // boxShadow: ' linear-gradient(315deg, #684F28 0%, #281806 47%, #FFC86E 100%)',
                        }}>
                            <div className='flex flex-row'>
                                <div className='flex gap-4 overflow-x-auto scroll-smooth no-scrollbar'>
                                    {newsData.map((news) => (
                                        <div key={news.id} className='bg-cover h-full rounded-xl '
                                            style={{ backgroundImage: `url('${news.imageUrl}')` }}
                                        >
                                            <div className='flex flex-col justify-center p-4'>
                                                <h2 className='text-lg'>{news.title}</h2>
                                                <p>{news.summary}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div> */}
                        <div className="w-[40%] border-2 h-64 bg-black/25 rounded-xl border-[#FFC86E]/60 p-2">
                            {/* style={{
                                backgroundImage: 'linear-gradient(315deg, #684F28 0%, #281806 47%, #FFC86E 100%)', // Background Gradient// Shadow biasa
                                borderImageSlice: 1,
                            }}> */}
                            <div className=''>
                                {/* Konten di sini */}
                            </div>
                        </div>
                    </div>
                    <div>
                        dsnfjksdn
                    </div>
                </div>
            </div>
        </section>
    );
}