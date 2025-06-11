import React, { useState } from "react";
import {
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaDiscord,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import backg from "../assets/Picture/background.png";
import LOGO from "../assets/Picture/LOGO VIKINGS 1.png";
import Line from "../assets/Picture/Line Border.png";
import LineQuest from "../assets/Picture/Line-Quest.png";

export default function Donation() {
  // State to manage which accordion item is open
  const [openIndex, setOpenIndex] = useState(null);

  // Updated quest data to match the image
  const quests = [
    { title: "Retail Donation", content: "Details for Retail Donation..." },
    { title: "Service Donation", content: "Details for Service Donation..." },
    { title: "Season Pass", content: "Details for Season Pass..." },
    { title: "Package Donation", content: "Details for Package Donation..." },
    { title: "How To Donation", content: "Details for How To Donation..." },
  ];

  // Function to handle clicking on a quest header
  const handleToggle = (index) => {
    // If the clicked item is already open, close it. Otherwise, open the new one.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="h-full">
      <div className="bg-cover bg-no-repeat main-background-container">
        <div className="flex flex-col items-center justify-center mx-8">
          <img src={LOGO} alt="Logo" className="w-[40%] mt-12" />
          <img src={Line} alt="Line" className="w-full" />
        </div>
        <div className="flex flex-col gap-8 justify-between pt-12 w-full h-full px-16 pb-8">
          {/* This top section can remain as you had it */}
          {/* <div className='flex flex-col w-full h-full gold-border items-center p-4 gap-4'>
                        <div>QUEST INFO</div>
                        <img src={LineQuest} alt="" />
                        <div className='flex flex-row gap-4'>
                            <div>SERVER INFO</div>
                            <div>ONLINE</div>
                            <div>300 player</div>
                        </div>
                    </div> */}

          {/* --- MODIFIED DONATION LIST SECTION --- */}
          <div className="flex flex-col w-full h-full gold-border p-8">
            <div className="flex text-center align-center justify-center items-center text-xl font-bold">
              DONATION INFORMATION
            </div>
            <img src={LineQuest} alt="Separator" className="w-full my-4" />

            {/* Map through quests to create the accordion */}
            {quests.map((quest, index) => (
              <div key={index} className="w-full">
                {/* Accordion Header */}
                <div
                  className="flex justify-between items-center cursor-pointer py-2 px-4"
                  onClick={() => handleToggle(index)}
                >
                  <div className="flex items-center font-semibold">
                    <FaChevronRight size={14} className="mr-3" />{" "}
                    {/* Ganti '》' dengan ikon */}
                    <span>{quest.title}</span>
                  </div>
                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Accordion Content (conditionally rendered) */}
                {openIndex === index && (
                  <div className="pl-6 pr-4 pb-4 text-gray-300">
                    <p>{quest.content}</p>
                  </div>
                )}

                {/* Separator Line */}
                <img src={LineQuest} alt="Separator" className="w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Social Media links can remain as you had them */}
        <div className="items-center justify-center pb-4">
          <img src={Line} alt="Line" className="w-full" />
          <div className="flex flex-row justify-center items-center gap-2">
            <a
              href="https://www.instagram.com/rfvikings"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://tiktok.com/@rfvikings"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition"
            >
              <FaTiktok />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61562554693454"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://discord.gg/rfvikings"
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
}
