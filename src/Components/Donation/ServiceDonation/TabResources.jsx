import React, { useState, useEffect } from 'react';

const TabResources = () => {
  const [resources, setResources] = useState([]); // Changed from gemstones to resources
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    donation_title: '', // Remains donation_title
    pricing: '',
  });
  const [currentItem, setCurrentItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('info');

  const formFields = [
    { label: 'Donation Title', name: 'donation_title', type: 'text', required: true, placeholder: 'Enter Donation Title' },
    { label: 'Pricing', name: 'pricing', type: 'text', required: true, placeholder: 'Enter Pricing (e.g., Rp. 50.000)' },
  ];

  useEffect(() => {
    fetchResources(); // Changed function name
  }, []);

  const fetchResources = async () => { // Changed function name
    try {
      const response = await fetch('http://127.0.0.1:8000/api/donation/service/resources'); // Changed API endpoint
      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP Error response (raw text):', errorText);
        let errorMessage = 'Failed to fetch Resource data.'; // Changed message
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || (errorJson.errors ? Object.values(errorJson.errors).flat().join('; ') : errorMessage);
        } catch (e) {
          // If response is not JSON, use raw text as error message
        }
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setResources(data); // Changed set state
    } catch (error) {
      console.error('Error fetching resources:', error); // Changed message
      setToastMessage(`Failed to fetch Resource data: ${error.message}`); // Changed message
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
      donation_title: '',
      pricing: '',
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = currentItem ? 'PUT' : 'POST';
      const url = currentItem
        ? `http://127.0.0.1:8000/api/donation/service/resources/${currentItem.id}` // Changed API endpoint
        : 'http://127.0.0.1:8000/api/donation/service/resources'; // Changed API endpoint

      const dataToSend = {
        donation_title: formData.donation_title,
        pricing: formData.pricing,
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(dataToSend),
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

      fetchResources(); // Changed function call
      handleCloseModal();
      setToastMessage(currentItem ? 'Resource data updated successfully.' : 'Resource data added successfully.'); // Changed message
      setToastType('success');
      setShowToast(true);
    } catch (error) {
      console.error('Error submitting resource data:', error); // Changed message
      setToastMessage(`Failed to save Resource data: ${error.message}`); // Changed message
      setToastType('error');
      setShowToast(true);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({
      donation_title: item.donation_title,
      pricing: item.pricing,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this data?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/donation/service/resources/${id}`, { method: 'DELETE' }); // Changed API endpoint
        if (!response.ok) {
          let errorData;
          const errorText = await response.text();
          try {
            errorData = JSON.parse(errorText);
          } catch (jsonError) {
            console.error('Failed to parse delete error response as JSON:', jsonError);
            errorData = { message: errorText };
          }
          let errorMessage = 'Failed to delete Resource data.'; 
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          } else if (typeof errorData === 'string') {
            errorMessage = errorData;
          }
          throw new Error(errorMessage);
        }
        fetchResources(); 
        setToastMessage('Resource data deleted successfully.'); 
        setToastType('success');
        setShowToast(true);
      } catch (error) {
        console.error('Error deleting resource data:', error); 
        setToastMessage(`An error occurred while deleting Resource data: ${error.message}`); // Changed message
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
        <h2 className="text-3xl font-bold text-gray-800 mb-0">Resource Data</h2> {/* Changed title */}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
          onClick={handleShowModal}
        >
          Add Resource
        </button> {/* Changed button text */}
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Donation Title</th> {/* Changed table header */}
              <th className="py-3 px-6 text-left">Pricing</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {resources.map((item, index) => ( // Iterating over resources
              <tr
                key={item.id}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 border-b border-gray-200 transition duration-150 ease-in-out`}
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">{item.id}</td>
                <td className="py-3 px-6 text-left">{item.donation_title}</td> {/* Displaying donation_title */}
                <td className="py-3 px-6 text-left">{item.pricing}</td>
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
                {currentItem ? 'Edit Resource' : 'Add Resource'} {/* Changed title */}
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
                      value={formData[field.name]}
                      onChange={handleChange}
                      rows={3}
                      required={field.required}
                      className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
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

export default TabResources;