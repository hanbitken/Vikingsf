import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../assets/logic/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [PIN, setPIN] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const passwordValidation = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,12}$/;

    return regex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!passwordValidation(password)) {
      setMessage("Unvalid password");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Confirm password unmatched");
      return;
    }

    if (PIN.length !== 6 || isNaN(PIN)) {
      setMessage("PIN must be a 6-digit number");
      return;
    }

    try {
      const response = await api.post("/register", {
        username,
        email,
        password,
        password_confirmation: confirmPassword,
        PIN,
      });
      const { token, user } = response.data;
      setMessage("Register Successful! Please login.");
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      if (error.response?.data?.errors) {
        const firstError = Object.values(error.response.data.errors)[0][0];
        setMessage(firstError);
      } else {
        setMessage("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <h2 className="text-white text-xl font-bold mb-4">Register</h2>
      {message && <p className="text-white text-sm mb-4">{message}</p>}
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm flex flex-col gap-4"
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="p-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="p-2 rounded bg-gray-800 text-white"
          required
        />
        <p>PASSWORD MUST CONTAIN</p>
        <ul>
          <li>At Least 1 uppercase letter</li>
          <li>At Least 1 lowercase letter</li>
          <li>At Least 1 number</li>
          <li>
            At Least 1 special character <span>!@#$%^&</span>
          </li>
          <li>Characters between 8 and 12</li>
        </ul>
        <input
          type="number"
          value={PIN}
          onChange={(e) => setPIN(e.target.value)}
          placeholder="CREATE PIN (6 digits)"
          className="p-2 rounded bg-gray-800 text-white"
          required
        />
        <p>
          BY CREATING AN ACCOUNT YOU AGREE TO OUR{" "}
          <a className="underline">TERMS OF SERVICE</a>
        </p>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
        >
          REGISTER
        </button>
        <button onClick={() => navigate("/login")}>LOGIN</button>
      </form>
    </div>
  );
}
