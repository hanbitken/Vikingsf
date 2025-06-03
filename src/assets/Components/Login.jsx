import React from 'react';

export default function Login() {
 return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
  <div className="bg-white rounded-xl shadow-2xl px-10 py-12 w-full max-w-md space-y-8">
    <h1 className="text-4xl font-bold text-center font-inter text-gray-800">Vikings Login</h1>

    {/* Email Field */}
    <div className="flex flex-col">
      <label htmlFor="email" className="text-gray-700 text-sm font-semibold mb-1">
        Email
      </label>
      <input
        required
        type="email"
        name="email"
        placeholder="Your email"
        className="px-4 py-2 rounded border-2 border-gray-300 focus:outline-none focus:border-purple-500 transition"
      />
    </div>

    {/* Password Field */}
    <div className="flex flex-col">
      <label htmlFor="password" className="text-gray-700 text-sm font-semibold mb-1">
        Password
      </label>
      <div className="relative">
        <input
          required
          type="password"
          name="password"
          placeholder="Your password"
          className="px-4 py-2 rounded border-2 border-gray-300 pe-10 w-full focus:outline-none focus:border-purple-500 transition"
        />
        <button className="absolute inset-y-0 end-0 flex items-center px-3">
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

    {/* Login Button */}
    <button
      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition font-semibold"
    >
      Login
    </button>

    {/* Optional Logout Button */}
    <button
      onClick={(e) => onLogout()}
      className="text-sm text-purple-700 hover:underline mx-auto block"
    >
      Log out
    </button>
  </div>
</div>
 )
};