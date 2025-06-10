import React from "react";
import LOGO from "../assets/Picture/LOGO VIKINGS 1.png";

export default function Hero() {
  return (
    <section
      className="flex flex-col items-center justify-center bg-top bg-center"
      style={{ backgroundImage: `url(${LOGO})` }}
    >
      <img src={LOGO} alt="Logo" className="w-1/4 mb-4" />
    </section>
  );  
}
