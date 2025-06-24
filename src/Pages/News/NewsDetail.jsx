import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LOGO from "../../assets/Picture/LOGO VIKINGS 1.png";
import Line from "../../assets/Picture/Line Border.png";
import { FaInstagram, FaTiktok, FaFacebook, FaDiscord } from "react-icons/fa";

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/news/${id}`)
      .then((res) => res.text())
      .then((text) => {
        const jsonString = text.replace(
          /^use\s+Illuminate\\Support\\Facades\\Route;\s*/,
          ""
        );
        try {
          const data = JSON.parse(jsonString);
          setNews(data);
        } catch (err) {
          console.error("Gagal parse JSON:", err);
        }
      })
      .catch((err) => console.error("Gagal fetch detail news:", err));
  }, [id]);

  if (!news)
    return <div className="text-center mt-10 text-white">Loading...</div>;

  return (
    <section classname="h-full">
      <div className="bg-cover bg-no-repeat main-background-container text-left">
        <div className="flex flex-col items-center justify-center mx-8">
          <img src={LOGO} alt="Logo" className="w-[25%] mt-12" />
          <img src={Line} alt="Line" className="w-full" />
        </div>

        <div className="justify-center py-8">
          <div className="relative w-[1195px] mx-auto p-[2px] box-border rounded-lg gold-border">
            <div className="w-full h-full overflow-hidden relative rounded-lg">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-[400px] object-cover rounded-t-[15px]"
              />
              <div className="p-6 rounded-b-lg text-white">
                <h2 className="text-3xl font-bold mb-2">{news.title}</h2>
                <p className="text-lg whitespace-pre-line">
                  {news.description}
                </p>
              </div>
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

export default NewsDetail;
