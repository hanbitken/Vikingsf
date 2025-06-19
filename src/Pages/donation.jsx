import React, { useState } from "react";
import {
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaDiscord,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import LOGO from "../assets/Picture/LOGO VIKINGS 1.png";
import Line from "../assets/Picture/Line Border.png";
import LineQuest from "../assets/Picture/Line-Quest.png";

export default function Donation() {
  const [openIndex, setOpenIndex] = useState(null);

  // How To Donation
  const [howToDonationList, setHowToDonationList] = useState([]);
  const [loadingHowTo, setLoadingHowTo] = useState(false);

  // Package Donation
  const [packageDonations, setPackageDonations] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(false);

  // Season Pass Donation
  const [seasonPassDonations, setSeasonPassDonations] = useState([]);
  const [loadingSeasonPass, setLoadingSeasonPass] = useState(false);

  const quests = [
    { title: "Retail Donation", content: "Details for Retail Donation..." },
    { title: "Service Donation", content: "Details for Service Donation..." },
    { title: "Season Pass" }, // Load dari API
    { title: "Package Donation" }, // Load dari API
    { title: "How To Donation" }, // Load dari API
  ];

  const handleToggle = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);

      // How To Donation
      if (index === 4 && howToDonationList.length === 0 && !loadingHowTo) {
        setLoadingHowTo(true);
        fetch("http://127.0.0.1:8000/api/donation/howto")
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data)) {
              setHowToDonationList(data);
            }
          })
          .catch((err) => console.error(err))
          .finally(() => setLoadingHowTo(false));
      }

      // Package Donation
      if (index === 3 && packageDonations.length === 0 && !loadingPackages) {
        setLoadingPackages(true);
        fetch("http://127.0.0.1:8000/api/donation/packages")
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data)) {
              setPackageDonations(data);
            }
          })
          .catch((err) => console.error(err))
          .finally(() => setLoadingPackages(false));
      }

      // Season Pass
      if (index === 2 && seasonPassDonations.length === 0 && !loadingSeasonPass) {
        setLoadingSeasonPass(true);
        fetch("http://127.0.0.1:8000/api/donation/seassonpass")
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data)) {
              setSeasonPassDonations(data);
            }
          })
          .catch((err) => console.error(err))
          .finally(() => setLoadingSeasonPass(false));
      }
    }
  };

  return (
    <section className="h-full">
      <div className="bg-cover bg-no-repeat main-background-container">
        <div className="flex flex-col items-center justify-center mx-8">
          <img src={LOGO} alt="Logo" className="w-[40%] mt-12" />
          <img src={Line} alt="Line" className="w-full" />
        </div>

        <div className="flex flex-col gap-8 justify-between pt-12 w-full h-full px-16 pb-8">
          <div className="flex flex-col w-full h-full gold-border p-8">
            <div className="flex text-center align-center justify-center items-center text-xl font-bold">
              DONATION INFORMATION
            </div>
            <img src={LineQuest} alt="Separator" className="w-full my-4" />

            {quests.map((quest, index) => (
              <div key={index} className="w-full">
                <div
                  className="flex justify-between items-center cursor-pointer py-2 px-4"
                  onClick={() => handleToggle(index)}
                >
                  <div className="flex items-center font-semibold">
                    <FaChevronRight size={14} className="mr-3" />
                    <span>{quest.title}</span>
                  </div>
                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {openIndex === index && (
                  <div className="pl-6 pr-4 pb-4 text-gray-300">
                    {/* HOW TO DONATION */}
                    {index === 4 ? (
                      loadingHowTo ? (
                        <p>Loading...</p>
                      ) : howToDonationList.length > 0 ? (
                        <div className="flex flex-col gap-4">
                          {howToDonationList.map((item, idx) => (
                            <div key={item.id} className="flex flex-col gap-2">
                              {idx > 0 && (
                                <div className="w-full border-t border-white mb-2"></div>
                              )}
                              <div className="text-left font-bold text-white">
                                {item.donation_guide}
                              </div>
                              <div className="text-gray-300">
                                {item.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>No data available.</p>
                      )
                    ) : // PACKAGE DONATION
                    index === 3 ? (
                      loadingPackages ? (
                        <p>Loading...</p>
                      ) : packageDonations.length > 0 ? (
                        <div className="flex flex-col gap-8">
                          {packageDonations.map((pkg) => (
                            <div
                              key={pkg.id}
                              className="flex flex-col gap-2 border-t border-white pt-4"
                            >
                              <div className="text-green-500 font-bold uppercase">
                                {pkg.title}
                              </div>
                              <div className="flex flex-col gap-1 pl-2">
                                {pkg.description
                                  .split("\n")
                                  .map((line, i) => (
                                    <div key={i} className="text-gray-300">
                                      {line}
                                    </div>
                                  ))}
                              </div>
                              <div className="text-yellow-400 font-bold">
                                PRICE : {pkg.pricing}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>No data available.</p>
                      )
                    ) : // SEASON PASS
                    index === 2 ? (
                      loadingSeasonPass ? (
                        <p>Loading...</p>
                      ) : seasonPassDonations.length > 0 ? (
                        <div className="flex flex-col gap-8">
                          {seasonPassDonations.map((item) => (
                            <div
                              key={item.id}
                              className="flex flex-row justify-between items-center border-t border-white pt-4"
                            >
                              <div className="flex flex-col">
                                <div className="text-white font-bold text-lg">
                                  {item.donation_title}
                                </div>
                                <div className="text-yellow-400 font-semibold">
                                  {item.pricing}
                                </div>
                              </div>
                              <img
                                src={`http://127.0.0.1:8000/storage/seassonpass/${item.image}`}
                                alt={item.donation_title}
                                className="w-32 h-auto rounded-md object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>No data available.</p>
                      )
                    ) : (
                      <p>{quest.content}</p>
                    )}
                  </div>
                )}

                <img src={LineQuest} alt="Separator" className="w-full" />
              </div>
            ))}
          </div>
        </div>

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
