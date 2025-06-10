import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import { IoMdArrowDropleft , IoMdArrowDropright } from 'react-icons/io';
import { FaInstagram, FaTiktok, FaFacebook, FaDiscord } from "react-icons/fa";
import LOGO from "../../assets/Picture/LOGO VIKINGS 1.png";
import Line from "../../assets/Picture/Line Border.png";
import img1 from '../../assets/Picture/1.jpg';

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-4 z-20 top-1/2 -translate-y-1/2 cursor-pointer"
    onClick={onClick}
  >
    <IoMdArrowDropleft className="text-gray-100 text-6xl hover:text-gray-300" />
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-4 z-20 top-1/2 -translate-y-1/2 cursor-pointer"
    onClick={onClick}
  >
    <IoMdArrowDropright className="text-gray-100 text-6xl hover:text-gray-300" />
  </div>
);

const CarouselCard = ({ image, title, subtitle }) => {
  return (
    <div className="relative w-full h-[672px] overflow-hidden group">
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500"
      />

      {/* Bottom 1/3 Content with Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 flex items-end p-8">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
        
        {/* Text Content */}
        <div className="relative text-white z-10">
          <h2 className="text-4xl font-bold">{title}</h2>
          <p className="mt-2 text-lg text-gray-200">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

const NewsList = ({ image, title, description}) => {
    return (
      <div className="relative overflow-hidden flex flex-row w-full">
        <div className="relative z-10 mx-10 mt-12 my-6 flex flex-row w-full">
          {/* News Image */}
            <img src={image} alt={title} className="w-84 h-48 object-cover flex-shrink-0" />

            <div className="ml-4 flex flex-col justify-between flex-grow">
                <div>
                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                    {title}
                </h3>
                {/* Excerpt/Subtitle */}
                <p className="text-white text-base">{description}</p>
                </div>
                {/* Read More Link */}
                <a href="/newsdetail" className="mt-5 text-blue-400 hover:text-blue-500 font-semibold self-end">
                Read More &rarr;
                </a>
            </div>
        </div>
      </div>
    )
}

const News = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    const carouselData = [
        {
        id: 1,
        image: img1,
        title: 'RF PROJECT',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar non ante eleifend lacinia ...'
        },
        {
        id: 2,
        image: img1,        
        title: 'Epic Adventures Await',
        subtitle: 'Dive into new worlds, discover hidden treasures, and forge your legend in the RF Project universe.'
        },
        {
        id: 3,
        image: img1,        
        title: 'New Content Update',
        subtitle: 'Explore new zones, battle formidable foes, and unravel the latest mysteries in our recent patch.'
        }
    ];

    const newsData = [
        {
            id: 1,
            image: img1,
            title: 'RF Project Launches',
            description: 'The highly anticipated RF Project has officially launched, bringing a new era of gaming excitement.'
        },
        {
            id: 2,
            image: img1,
            title: 'Community Spotlight',
            description: 'This month, we celebrate our amazing community members who have contributed to the RF Project.'
        }
    ]

    return (
    <section classname="h-full">
      <div className="bg-cover bg-no-repeat main-background-container text-left">
        <div className="flex flex-col items-center justify-center mx-8">
          <img src={LOGO} alt="Logo" className="w-[40%] mt-12" />
          <img src={Line} alt="Line" className="w-full" />
        </div>
        
        <div className="flex flex-col justify-center py-8"> {/* Added margin for visual spacing */}
          <div className="relative w-[1195px] h-[672px] mx-auto p-[2px] box-border rounded-lg gold-border">
            <div className="w-full h-full overflow-hidden relative rounded-[15px]">
              <Slider {...settings}>
                {carouselData.map((card) => (
                  <CarouselCard
                    key={card.id}
                    image={card.image}
                    title={card.title}
                    subtitle={card.subtitle}
                  />
                ))}
              </Slider>
            </div>
          </div>
        {/* Additional content below the carousel */}
            <div className="mt-16 w-[1195px] mx-auto">
              <div className="gold-border rounded-lg bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0)_50%,rgba(0,0,0,0.2)_100%),linear-gradient(to_right,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0)_50%,rgba(0, 0, 0, 0.2)_100%)]">
                {newsData.map((news) => (
                  <NewsList
                    key={news.id}
                    image={news.image}
                    title={news.title}
                    description={news.description}
                  />
                ))}
              </div>
            </div>
            <div className="items-center justify-center pb-4">
              <img src={Line} alt="Line" className="w-full" />
              <div className="flex flex-row justify-center items-center gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition"
                >
                  <FaTiktok />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-400 transition"
                >
                  <FaDiscord />
                </a>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}

export default News;