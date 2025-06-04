import React from "react";
import atas from "../assets/Picture/atas.png";
import LOGO from "../assets/Picture/LOGO VIKINGS 1.png";
import Line from "../assets/Picture/Line Border.png";

export default function Hero() {
  return (
    <section
      className="flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${atas})` }}
    >
      <img src={LOGO} alt="Logo" className="w-1/4 mb-4" />
      <img src={Line} alt="Line" className="w-full" />
    </section>
  );
}
