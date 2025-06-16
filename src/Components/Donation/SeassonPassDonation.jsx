import React, { useState, useEffect } from 'react';

const SeassonPassDonation = () => {
  const [seassonPassDonations, setSeassonPassDonations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    donation_informations_id: '',
    title: '',
    description: '',
    pricing: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('info');

  useEffect(() => {
    fetchSeassonPassDonations();
  }, []);

  const fetchSeassonPassDonations = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/donation/seassonpass');
      if (!response.ok) {
          const errorText = await response.text();
          throw new Error('Failed to fetch Seasson Pass Donations: ' + response.statusText + ' - ' + errorText);
      }
      const data = await response.json();
      setSeassonPassDonations(data);
    } catch (error) {
      console.error('Error fetching Seasson Pass Donations:', error);
      setToastMessage(`Failed to fetch Seasson Pass Donations: ${error.message}`);
      setToastType('error');
      setShowToast(true);
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
      donation_informations_id: '',
      title: '',
      description: '',
      pricing: '',
    });
    setImageFile(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files.length > 0) {
      setImageFile(files[0]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isUpdate = !!currentItem;
      const url = isUpdate
        ? `http://127.0.0.1:8000/api/donation/seassonpass/${currentItem.id}`
        : 'http://127.0.0.1:8000/api/donation/seassonpass';

      const formDataToSend = new FormData();

      formDataToSend.append('donation_informations_id', formData.donation_informations_id);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('pricing', formData.pricing);

      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      if (isUpdate) {
        formDataToSend.append('_method', 'PUT');
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (jsonError) {
          errorData = response.statusText;
          console.error("Failed to parse error response as JSON:", jsonError);
          console.error("Raw response text:", await response.text());
        }

        let errorMessage = 'An error occurred.';
        if (typeof errorData === 'string') {
            errorMessage = errorData;
        } else if (errorData && errorData.message) {
            errorMessage = errorData.message;
        } else if (errorData && errorData.errors) {
            errorMessage = Object.values(errorData.errors).flat().join('; ');
        }
        throw new Error(errorMessage);
      }

      fetchSeassonPassDonations();
      handleCloseModal();
      setToastMessage(isUpdate ? 'Seasson Pass Donation updated successfully.' : 'Seasson Pass Donation added successfully.');
      setToastType('success');
      setShowToast(true);
    } catch (error) {
      console.error('Error submitting Seasson Pass Donation:', error);
      setToastMessage(`Failed to save Seasson Pass Donation: ${error.message}`);
      setToastType('error');
      setShowToast(true);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({
      donation_informations_id: item.donation_informations_id,
      title: item.title,
      description: item.description,
      pricing: item.pricing,
    });
    setImageFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/donation/seassonpass/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch (jsonError) {
            errorData = response.statusText;
            console.error("Failed to parse delete error response as JSON:", jsonError);
            console.error("Raw delete response text:", await response.text());
          }
          let errorMessage = 'Failed to delete data.';
          if (typeof errorData === 'string') {
              errorMessage = errorData;
          } else if (errorData && errorData.message) {
              errorMessage = errorData.message;
          }
          throw new Error(errorMessage);
        }
        fetchSeassonPassDonations();
        setToastMessage('Seasson Pass Donation deleted successfully.');
        setToastType('success');
        setShowToast(true);
      } catch (error) {
        console.error('Error deleting Seasson Pass Donation:', error);
        setToastMessage(`An error occurred while deleting: ${error.message}`);
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
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Seasson Pass Donation</h2>
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
              <th className="py-3 px-6 text-left">Donation ID</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Pricing</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {seassonPassDonations.map((item, index) => (
              <tr
                key={item.id}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 border-b border-gray-200 transition duration-150 ease-in-out`}
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">{item.id}</td>
                <td className="py-3 px-6 text-left">{item.donation_informations_id}</td>
                <td className="py-3 px-6 text-left">{item.title}</td>
                <td className="py-3 px-6 text-left">{item.description}</td>
                <td className="py-3 px-6 text-left">{item.pricing}</td>
                <td className="py-3 px-6 text-left">
                  {item.image ? (
                    <img
                      src={`http://127.0.0.1:8000/storage/${item.image}`}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded-full"
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/48x48/cccccc/000000?text=No+Image'; }}
                    />
                  ) : (
                    <span className="text-gray-500">No Image</span>
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
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full flex items-center justify-center z-50 transition-opacity duration-300 ease-out"
          style={{ opacity: showModal ? 1 : 0 }}
          onClick={handleCloseModal}
        >
          <div
            className="relative p-8 bg-white w-full max-w-md mx-auto rounded-lg shadow-2xl transition-all duration-300 ease-out"
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
              <div className="mb-4">
                <label htmlFor="donation_informations_id" className="block text-gray-700 text-sm font-bold mb-2">
                  Donation Information ID
                </label>
                <input
                  type="number"
                  id="donation_informations_id"
                  name="donation_informations_id"
                  value={formData.donation_informations_id}
                  onChange={handleChange}
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="pricing" className="block text-gray-700 text-sm font-bold mb-2">
                  Pricing
                </label>
                <input
                  type="text"
                  id="pricing"
                  name="pricing"
                  value={formData.pricing}
                  onChange={handleChange}
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleChange}
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {currentItem && currentItem.image && (
                  <div className="mt-2 flex items-center">
                    <img
                      src={`http://127.0.0.1:8000/storage/${currentItem.image}`}
                      alt="Current"
                      className="w-20 h-20 object-cover rounded mr-2"
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x80/cccccc/000000?text=No+Image'; }}
                    />
                    <p className="text-gray-500 text-sm">
                      Select a new image to replace the current one.
                    </p>
                  </div>
                )}
              </div>
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