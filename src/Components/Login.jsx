import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../assets/logic/api"; // Axios instance yang kamu buat

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await api.post("/login", { email, password });
      console.log("typeof response.data:", typeof response.data);
      console.log("response.data:", response.data);

      // const parsedData = JSON.parse(response.data);  hanya jika response.data string
      const { token, user } = response.data;

      // simpan token
      localStorage.setItem("token", token);

      if (user) {
        console.log("👤 User login berhasil");
        setMessage(`Selamat datang, ${user.username}`);
        navigate("/"); // Langsung ke homepage
      } else {
        console.error("❌ User tidak ditemukan dalam response.");
        setMessage("Login berhasil, tapi user data tidak ditemukan.");
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        error.message ||
        "Login gagal. Cek email/password.";
      setMessage(errMsg);
      console.error("❌ Login failed:", errMsg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <form
        onSubmit={handleLogin}
        className="bg-black rounded-xl shadow-2xl px-10 py-12 w-full max-w-md space-y-8"
      >
        <h1 className="text-4xl font-bold text-center font-inter text-gray-800">
          Vikings Login
        </h1>

        {message && (
          <p className="text-center text-sm text-white font-medium">
            {message}
          </p>
        )}

        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-gray-700 text-sm font-semibold mb-1"
          >
            Email
          </label>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="px-4 py-2 rounded border-2 border-gray-300 focus:outline-none focus:border-purple-500 transition"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-gray-700 text-sm font-semibold mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              required
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="px-4 py-2 rounded border-2 border-gray-300 pe-10 w-full focus:outline-none focus:border-purple-500 transition"
            />
            <button
              type="button"
              className="absolute inset-y-0 end-0 flex items-center px-3"
              onClick={() =>
                alert("Implement fitur show/hide password nanti 😄")
              }
            >
              {/* Ikon mata */}
              <svg
                className="w-5 h-5 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
}
