import React from 'react';
import { FaInstagram, FaTiktok, FaFacebook, FaDiscord } from "react-icons/fa";
import LOGO from "../../assets/Picture/LOGO VIKINGS 1.png";
import Separator from "../../assets/Picture/line full.png";
import Line from "../../assets/Picture/Line Border.png";

const DownloadSection = () => {
  const sections = [
    { id: 1, title: 'DOWNLOAD LINK 1' },
    { id: 2, title: 'DOWNLOAD LINK 2' },
    { id: 3, title: 'DOWNLOAD LINK 3' },
  ];

  const files = [
    { name: 'DOWNLOAD FILE 1', size: '2.0 GB' },
    { name: 'DOWNLOAD FILE 2', size: '2.0 GB' },
    { name: 'DOWNLOAD FILE 3', size: '2.0 GB' },
    { name: 'DOWNLOAD FILE 4', size: '2.0 GB' },
  ];

  return (
    <section classname="h-full">
      <div className="bg-cover bg-no-repeat main-background-container text-left">

        <div className="flex flex-col items-center justify-center mx-8">
          <img src={LOGO} alt="Logo" className="w-[40%] mt-12" />
          <img src={Line} alt="Line" className="w-full" />
        </div>

        <div className="justify-center py-8 text-left">
          <div className="w-[1195px] mx-auto p-[2px] box-border rounded-lg gold-border bg-opacity-10">
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-6 text-white text-center mx-auto">DOWNLOAD</h2>
              <img src={Separator} alt="separator" className="w-full my-4" />

              {sections.map((section) => (
                <div key={section.id} className="mb-10 px-8">
                  
                  {/* Section title */}
                  <h3 className="text-lg font-semibold text-white mb-1">{section.title}</h3>
                  <a className="text-sm text-white mb-4 cursor-pointer transition-colors duration-300 hover:text-yellow-400">README</a>

                  {/* Divider line */}
                  <img src={Separator} alt="separator" className="w-full my-4" />

                  {/* File list */}
                  {files.map((file, i) => (
                    <div key={i} className="flex justify-between items-center py-2 px-4 mb-2">
                      <span className="text-white">{file.name}</span>
                      <span className="text-white">{file.size}</span>
                      <a className="text-white font-semibold px-4 py-1 cursor-pointer transition-colors duration-300 hover:text-yellow-400">
                        DOWNLOAD
                      </a>
                    </div>
                  ))}
                </div>
              ))}
            </div>
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
    </section>
  );
};

export default DownloadSection;
