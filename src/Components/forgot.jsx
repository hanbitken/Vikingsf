// File: Forgot.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Picture/LOGO VIKINGS 1.png";
import Tree from "../assets/Picture/Tree Celtic.png";
import api from "../assets/logic/api";

export default function Forgot() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [PIN, setPIN] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");

    if (PIN.length !== 6 || isNaN(PIN)) {
      setMessage("PIN must be a 6-digit number");
      return;
    }

    try {
      const response = await api.post("/forgot-password", {
        username,
        email,
        pin: PIN,
      });
      setMessage("Reset link has been sent to your email!");
    } catch (error) {
      if (error.response?.data?.errors) {
        const firstError = Object.values(error.response.data.errors)[0][0];
        setMessage(firstError);
      } else {
        setMessage("Reset failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="border border-yellow-300 rounded-lg p-6 w-full max-w-md shadow-[0_0_15px_#facc15] flex flex-col items-center">
        <img src={Logo} alt="Vikings Logo" className="w-40 mb-4" />

        <div className="relative flex items-center justify-center w-full mb-4">
          <div className="w-full h-px bg-gray-400" />
          <img src={Tree} alt="Tree" className="absolute bg-black px-2" style={{ width: "40px" }} />
        </div>

        <h2 className="text-white text-center font-bold text-md mb-4">RESET PASSWORD</h2>
        {message && <p className="text-white text-sm mb-4">{message}</p>}

        <form onSubmit={handleReset} className="flex flex-col gap-3 w-full">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="USERNAME"
            required
            className="bg-gray-300 text-black font-bold px-4 py-2 rounded text-center"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EMAIL"
            required
            className="bg-gray-300 text-black font-bold px-4 py-2 rounded text-center"
          />
          <input
            type="number"
            value={PIN}
            onChange={(e) => setPIN(e.target.value)}
            placeholder="PIN"
            required
            className="bg-gray-300 text-black font-bold px-4 py-2 rounded text-center"
          />

          <div className="relative flex items-center justify-center mt-6 mb-4 w-full">
            <div className="w-full h-px bg-gray-400" />
            <img src={Tree} alt="Tree Icon" className="absolute bg-black px-2" style={{ width: "40px" }} />
          </div>

          <div className="flex justify-between gap-4 mt-4 w-full">
            <button
              type="submit"
              className="flex-1 !bg-[#FEC567] !hover:bg-[#f5b640] !text-black font-bold py-2 rounded shadow-md"
            >
              RESET PASSWORD
            </button>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="flex-1 !bg-white !hover:bg-gray-100 !text-black font-bold py-2 rounded shadow-md"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
