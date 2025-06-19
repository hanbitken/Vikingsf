import React, { useState, useEffect } from 'react';

const PackagesInfo = () => {
  const [packages, setPackages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    package_name: '',
    category_id: '',
    items_id: '',
    price: '',
    is_bonus_package: false,
  });
  const [currentItem, setCurrentItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('info');
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const formFields = [
    { label: 'Package Name', name: 'package_name', type: 'text', required: true, placeholder: 'Enter Package Name' },
    { label: 'Category ID', name: 'category_id', type: 'number', required: true, placeholder: 'Enter Category ID (e.g., 1)' },
    { label: 'Item ID', name: 'items_id', type: 'number', required: true, placeholder: 'Enter Item ID (e.g., 1)' },
    { label: 'Price', name: 'price', type: 'text', required: false, placeholder: 'Enter Price (e.g., 10.00)' },
    { label: 'Is Bonus Package', name: 'is_bonus_package', type: 'checkbox' },
  ];

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/donation/packages');
      if (!response.ok) {
        if (response.status === 404) {
          setPackages([]);
          setToastMessage('No package donation data found.');
          setToastType('info');
        } else {
          const errorText = await response.text();
          throw new Error(`Failed to fetch package donations: Status ${response.status} - ${errorText}`);
        }
      } else {
        const data = await response.json();
        setPackages(Array.isArray(data) ? data : []);
        setToastMessage('Package donation data loaded successfully.');
        setToastType('success');
      }
      setShowToast(true);
    } catch (error) {
      setToastMessage(`Failed to fetch package donations: ${error.message}`);
      setToastType('error');
      setShowToast(true);
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setValidationErrors({});

    const method = currentItem ? 'PUT' : 'POST';
    const url = currentItem
      ? `http://127.0.0.1:8000/api/donation/packages/${currentItem.id}`
      : 'http://127.0.0.1:8000/api/donation/packages';

    const payload = {
      package_name: formData.package_name,
      category_id: Number(formData.category_id),
      items_id: Number(formData.items_id),
      price: formData.price === '' ? null : formData.price,
      is_bonus_package: formData.is_bonus_package,
    };

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });

      const clonedResponse = response.clone();
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        const rawText = await clonedResponse.text();
        console.error("Failed to parse JSON response:", rawText);
        throw new Error(`Invalid response from server (${response.status}): ${rawText.substring(0, 100)}...`);
      }

      if (response.ok) {
        fetchPackages();
        handleCloseModal();
        setToastMessage(currentItem ? 'Package donation updated successfully.' : 'Package donation added successfully.');
        setToastType('success');
        setShowToast(true);
      } else {
        let errorMessage = 'An error occurred.';
        if (data && data.message) {
            errorMessage = data.message;
        }
        if (data && data.errors) {
            setValidationErrors(data.errors);
            errorMessage = Object.values(data.errors).flat().join('; ');
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      setToastMessage(`Failed to save package donation: ${error.message}`);
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this package donation?')) return;
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/donation/packages/${id}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' },
      });

      const clonedResponse = response.clone();
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        const rawText = await clonedResponse.text();
        console.error("Failed to parse JSON response on delete:", rawText);
        throw new Error(`Invalid response from server (${response.status}) on delete: ${rawText.substring(0, 100)}...`);
      }

      if (response.ok) {
        fetchPackages();
        setToastMessage('Package donation deleted successfully.');
        setToastType('success');
        setShowToast(true);
      } else {
        let errorMessage = 'Failed to delete data.';
        if (data && data.message) {
            errorMessage = data.message;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      setToastMessage(`An error occurred while deleting: ${error.message}`);
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
      package_name: '',
      category_id: '',
      items_id: '',
      price: '',
      is_bonus_package: false,
    });
    setValidationErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setValidationErrors({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    if (validationErrors[name]) {
      setValidationErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({
      package_name: item.package_name,
      category_id: item.category_id,
      items_id: item.items_id,
      price: item.price === null ? '' : String(item.price),
      is_bonus_package: item.is_bonus_package,
    });
    setValidationErrors({});
    setShowModal(true);
  };

  const getToastColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'info':
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Packages Donation</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
          onClick={handleShowModal}
        >Add Package Donation</button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Package Name</th>
              <th className="py-3 px-6 text-left">Category ID</th>
              <th className="py-3 px-6 text-left">Item ID</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Is Bonus Package</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {loading ? (
              <tr><td colSpan="7" className="text-center py-4 text-gray-500">Loading...</td></tr>
            ) : packages.length > 0 ? (
              packages.map((pkg, index) => (
                <tr
                  key={pkg.id}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 border-b border-gray-200 transition duration-150 ease-in-out`}
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">{pkg.id}</td>
                  <td className="py-3 px-6 text-left">{pkg.package_name}</td>
                  <td className="py-3 px-6 text-left">{pkg.category_id}</td>
                  <td className="py-3 px-6 text-left">{pkg.items_id}</td>
                  <td className="py-3 px-6 text-left">{pkg.price === null ? '-' : pkg.price}</td>
                  <td className="py-3 px-6 text-left">{pkg.is_bonus_package ? 'Yes' : 'No'}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-xs mr-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
                      onClick={() => handleEdit(pkg)}
                    >Edit</button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
                      onClick={() => handleDelete(pkg.id)}
                    >Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7" className="text-center py-4 text-gray-500 italic">No package donation data available.</td></tr>
            )}
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
                {currentItem ? 'Edit Package Donation' : 'Add Package Donation'}
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
                  {field.type === 'checkbox' ? (
                    <input
                      type="checkbox"
                      id={field.name}
                      name={field.name}
                      checked={formData[field.name]}
                      onChange={handleChange}
                      className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                    />
                  ) : (
                    <>
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        placeholder={field.placeholder}
                        className={`shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${validationErrors[field.name] ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500 focus:border-transparent'} transition duration-150 ease-in-out`}
                      />
                      {validationErrors[field.name] && (
                        <p className="text-red-500 text-xs italic mt-1">{validationErrors[field.name][0]}</p>
                      )}
                    </>
                  )}
                </div>
              ))}
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  {isSubmitting ? 'Saving...' : (currentItem ? 'Update' : 'Save')}
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

export default PackagesInfo;