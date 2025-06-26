import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "./api";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email && location.state?.pin) {
      setEmail(location.state.email);
      setPin(location.state.pin);
    } else {
      // Redirect ke forgot kalau akses langsung ke halaman ini
      navigate("/forgot");
    }
  }, [location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      await api.post("/reset-password", {
        email,
        pin,
        password,
        password_confirmation: confirmPassword,
      });
      setMessage("Password has been reset. Please login.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage("Failed to reset password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-gray-800 rounded-lg w-full max-w-md"
      >
        <h2 className="text-lg font-bold mb-4">Reset Your Password</h2>
        {message && <p className="mb-4">{message}</p>}
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-3 p-2 rounded"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full mb-3 p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
