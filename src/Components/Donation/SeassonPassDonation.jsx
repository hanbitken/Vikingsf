import React, { useState, useEffect, useRef } from 'react';

const SeassonPassDonation = () => {
  const [seassonPassDonations, setSeassonPassDonation] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    donation_title: '',
    pricing: '',
    image: null,
  });
  const [currentItem, setCurrentItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('info');

  const fileInputRef = useRef(null);

  const formFields = [
    { label: 'Donation Title', name: 'donation_title', type: 'text', required: true, placeholder: 'Enter Donation Title' },
    { label: 'Pricing', name: 'pricing', type: 'text', required: true, placeholder: 'Enter Pricing (e.g., Rp. 50.000)' },
    { label: 'Image', name: 'image', type: 'file', required: false, placeholder: 'Upload Image' },
  ];

  useEffect(() => {
    fetchSeassonPassDonation();
  }, []);

  const fetchSeassonPassDonation = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/donation/seassonpass');
      if (!response.ok) {
        if (response.status === 404) {
          setSeassonPassDonation([]);
          setToastMessage('No Seasson Pass Donation data found.');
          setToastType('info');
          setShowToast(true);
          return;
        }
        const errorText = await response.text();
        console.error('HTTP Error response (raw text):', errorText);
        let errorMessage = 'Failed to fetch Seasson Pass Donation data.';
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || (errorJson.errors ? Object.values(errorJson.errors).flat().join('; ') : errorMessage);
        } catch (e) {
        }
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setSeassonPassDonation(data);
      setToastMessage('Seasson Pass Donation data loaded successfully.');
      setToastType('success');
      setShowToast(true);
    } catch (error) {
      console.error('Error fetching seasson pass donations:', error);
      setToastMessage(`Failed to fetch Seasson Pass Donation data: ${error.message}`);
      setToastType('error');
      setShowToast(true);
      setSeassonPassDonation([]);
    }
  };

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showToast]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (showModal) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [showModal]);

  const handleShowModal = () => {
    setCurrentItem(null);
    setFormData({
      donation_title: '',
      pricing: '',
      image: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = 'POST';
      const url = currentItem
        ? `http://127.0.0.1:8000/api/donation/seassonpass/${currentItem.id}`
        : 'http://127.0.0.1:8000/api/donation/seassonpass';

      const dataToSend = new FormData();
      dataToSend.append('donation_title', formData.donation_title);
      dataToSend.append('pricing', formData.pricing);
      if (formData.image) {
        dataToSend.append('image', formData.image);
      }

      if (currentItem) {
        dataToSend.append('_method', 'PUT');
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Accept': 'application/json',
        },
        body: dataToSend,
      });

      if (!response.ok) {
        let errorData;
        const errorText = await response.text();
        try {
          errorData = JSON.parse(errorText);
        } catch (jsonError) {
          console.error('Failed to parse error response as JSON:', jsonError);
          errorData = { message: errorText };
        }

        let errorMessage = 'An error occurred.';
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData && errorData.errors) {
          errorMessage = Object.values(errorData.errors).flat().join('; ');
        } else if (typeof errorData === 'string') {
          errorMessage = errorData;
        }
        throw new Error(errorMessage);
      }

      fetchSeassonPassDonation();
      handleCloseModal();
      setToastMessage(currentItem ? 'Seasson Pass Donation data updated successfully.' : 'Seasson Pass Donation data added successfully.');
      setToastType('success');
      setShowToast(true);
    } catch (error) {
      console.error('Error submitting seasson pass donation data:', error);
      setToastMessage(`Failed to save Seasson Pass Donation data: ${error.message}`);
      setToastType('error');
      setShowToast(true);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({
      donation_title: item.donation_title,
      pricing: item.pricing,

      image: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this data?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/donation/seassonpass/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          let errorData;
          const errorText = await response.text();
          try {
            errorData = JSON.parse(errorText);
          } catch (jsonError) {
            console.error('Failed to parse delete error response as JSON:', jsonError);
            errorData = { message: errorText };
          }
          let errorMessage = 'Failed to delete Seasson Pass Donation data.';
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          } else if (typeof errorData === 'string') {
            errorMessage = errorData;
          }
          throw new Error(errorMessage);
        }
        fetchSeassonPassDonation();
        setToastMessage('Seasson Pass Donation data deleted successfully.');
        setToastType('success');
        setShowToast(true);
      } catch (error) {
        console.error('Error deleting seasson pass donation data:', error);
        setToastMessage(`An error occurred while deleting Seasson Pass Donation data: ${error.message}`);
        setToastType('error');
        setShowToast(true);
      }
    }
  };

  const getToastColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-0">Seasson Pass Donation Data</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
          onClick={handleShowModal}
        >
          Add Seasson Pass Donation
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Donation Title</th>
              <th className="py-3 px-6 text-left">Pricing</th>
              {/* Removed: <th className="py-3 px-6 text-left">Description</th> */}
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {seassonPassDonations.length > 0 ? (
              seassonPassDonations.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 border-b border-gray-200 transition duration-150 ease-in-out`}
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">{item.id}</td>
                  <td className="py-3 px-6 text-left">{item.donation_title}</td>
                  <td className="py-3 px-6 text-left">{item.pricing}</td>
                  <td className="py-3 px-6 text-left">
                    {item.image_url ? (
                      <img src={item.image_url} alt="Donation" className="h-10 w-10 object-cover rounded-full" />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-xs mr-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b border-gray-200">
                <td colSpan="5" className="py-3 px-6 text-center text-gray-500 italic"> {/* Adjusted colspan back to 5 */}
                  No Seasson Pass Donation data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full flex justify-center items-center z-50 transition-opacity duration-300 ease-out"
          style={{ opacity: showModal ? 1 : 0 }}
          onClick={handleCloseModal}
        >
          <div
            className="relative p-6 bg-white w-full max-w-lg mx-auto rounded-lg shadow-2xl transition-all duration-300 ease-out my-8 max-h-[90vh] overflow-y-auto"
            style={{
              transform: showModal ? 'translateY(0) scale(1)' : 'translateY(-50px) scale(0.95)',
              opacity: showModal ? 1 : 0
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {currentItem ? 'Edit Seasson Pass Donation' : 'Add Seasson Pass Donation'}
              </h3>
              <button
                className="text-gray-400 hover:text-gray-600 text-2xl p-1 rounded-full hover:bg-gray-100 transition duration-150 ease-in-out"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
              {formFields.map((field, index) => (
                <div className="mb-4" key={index}>
                  <label htmlFor={field.name} className="block text-gray-700 text-sm font-bold mb-2">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      rows={3}
                      required={field.required}
                      className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                      placeholder={field.placeholder}
                    />
                  ) : field.type === 'file' ? (
                    <div className="relative">
                      <input
                        type="file"
                        id={field.name}
                        name={field.name}
                        onChange={handleChange}
                        ref={fileInputRef}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-150 ease-in-out flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                        {formData.image ? formData.image.name : 'Choose File'}
                      </button>
                      {formData.image && (
                        <p className="mt-2 text-sm text-gray-500">Selected file: {formData.image.name}</p>
                      )}
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      required={field.required}
                      className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  {currentItem ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-slideInFromRight">
          <div className={`${getToastColor(toastType)} text-white px-6 py-3 rounded-lg shadow-lg flex items-center transition duration-300 ease-in-out transform hover:scale-105`}>
            <span>{toastMessage}</span>
            <button
              onClick={() => setShowToast(false)}
              className="ml-4 text-white text-xl leading-none font-bold opacity-75 hover:opacity-100 transition duration-150 ease-in-out"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeassonPassDonation;