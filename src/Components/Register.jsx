import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Picture/LOGO VIKINGS 1.png";
import Tree from "../assets/Picture/Tree Celtic.png";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      {/* Container dengan border glowing yang membungkus SEMUA */}
      <div className="border border-yellow-300 rounded-lg p-6 w-full max-w-md shadow-[0_0_15px_#facc15] flex flex-col items-center">
        
        {/* Logo Vikings DI DALAM border glowing */}
        <img src={Logo} alt="Vikings Logo" className="w-50 mb-4" />

        {/* Divider dengan Tree */}
        <div className="relative flex items-center justify-center w-full mb-4">
          <div className="w-full h-px bg-gray-400" />
          <img
            src={Tree}
            alt="Tree"
            className="absolute bg-black px-2"
            style={{ width: "40px" }}
          />
        </div>

        {/* Form */}
        <h2 className="text-white text-center font-bold text-md mb-4">
          WELCOME TO THE USER REGISTRATION PAGE.
        </h2>

        <form className="flex flex-col gap-3 w-full">
          <input
            type="text"
            placeholder="USERNAME"
            className="bg-gray-300 text-black font-bold px-4 py-2 rounded text-center"
          />
          <input
            type="email"
            placeholder="E-MAIL"
            className="bg-gray-300 text-black font-bold px-4 py-2 rounded text-center"
          />
          <input
            type="password"
            placeholder="PASSWORD"
            className="bg-gray-300 text-black font-bold px-4 py-2 rounded text-center"
          />
          <input
            type="password"
            placeholder="CONFIRM PASSWORD"
            className="bg-gray-300 text-black font-bold px-4 py-2 rounded text-center"
          />

          <div className="text-white text-[12px] mt-2">
            <span className="font-bold">PASSWORD MUST CONTAIN:</span>
            <ul className="list-disc ml-4 mt-1 text-[11px]">
              <li>At least 1 uppercase letter</li>
              <li>At least 1 lowercase letter</li>
              <li>At least 1 number</li>
              <li>
                At least 1 special character{" "}
                <span className="text-yellow-400">!@#$%^&amp;*</span>
              </li>
              <li>Characters between 8 and 12</li>
            </ul>
          </div>

          <input
            type="text"
            placeholder="CREATE PIN"
            className="bg-gray-300 text-black font-bold px-4 py-2 rounded text-center mt-2"
          />
        </form>

        {/* Divider bawah */}
        <div className="relative flex items-center justify-center mt-6 mb-4 w-full">
          <div className="w-full h-px bg-gray-400" />
          <img
            src={Tree}
            alt="Tree Icon"
            className="absolute bg-black px-2"
            style={{ width: "40px" }}
          />
        </div>

        <p className="text-center text-[10px] text-white">
          BY CREATING AN ACCOUNT YOU AGREE TO OUR{" "}
          <span className="text-yellow-400 underline">TERMS OF SERVICE</span>
        </p>

    {/* Buttons */}
            <div className="flex justify-between gap-4 mt-4 w-full">
            <button
                type="submit"
                className="flex-1 !bg-[#FEC567] !hover:bg-[#f5b640] !text-black font-bold py-2 rounded shadow-md"
            >
                REGISTER
            </button>
            <button
                type="button"
                onClick={() => navigate("/login")}
                className="flex-1 !bg-white !hover:bg-gray-100 !text-black font-bold py-2 rounded shadow-md"
            >
                LOGIN
            </button>
            </div>
      </div>
    </div>
  );
}
