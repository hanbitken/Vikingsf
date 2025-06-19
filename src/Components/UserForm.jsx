import React, { useState } from 'react';

const UserForm = ({ onSubmit, initialData = {} }) => {
  const [name, setName] = useState(initialData.name || '');

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah perilaku default form submission
    onSubmit({ name });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4"> {/* Mengganti Form.Group */}
        <label htmlFor="userName" className="block text-gray-700 text-sm font-bold mb-2"> {/* Mengganti Form.Label */}
          Name
        </label>
        <input // Mengganti Form.Control
          type="text"
          id="userName" // Menambahkan ID untuk accessibility
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
          placeholder="Enter user name" // Menambahkan placeholder
        />
      </div>
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
      > {/* Mengganti Button */}
        Save
      </button>
    </form>
  );
};

export default UserForm;