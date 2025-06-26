import React, { useState, useEffect, useRef } from 'react';
import api from '../../Components/api';

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
      const response = await api.get('/donation/seassonpass');
      setSeassonPassDonation(response.data);
      setToastMessage('Seasson Pass Donation data loaded successfully.');
      setToastType('success');
      setShowToast(true);
    } catch (error) {
      console.error('Error fetching seasson pass donations:', error);
      const message = error.response?.data?.message || 'Failed to fetch Seasson Pass Donation data.';
      setToastMessage(message);
      setToastType('error');
      setShowToast(true);
      setSeassonPassDonation([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('donation_title', formData.donation_title);
      form.append('pricing', formData.pricing);
      if (formData.image) {
        form.append('image', formData.image);
      }

      const url = currentItem
        ? `/donation/seassonpass/${currentItem.id}`
        : '/donation/seassonpass';

      const response = currentItem
        ? await api.post(url, form.append('_method', 'PUT') && form)
        : await api.post(url, form);

      fetchSeassonPassDonation();
      handleCloseModal();
      setToastMessage(currentItem ? 'Updated successfully.' : 'Added successfully.');
      setToastType('success');
      setShowToast(true);
    } catch (error) {
      console.error('Submit error:', error);
      const msg = error.response?.data?.message ||
        (error.response?.data?.errors ? Object.values(error.response.data.errors).flat().join('; ') : 'Unknown error.');
      setToastMessage(`Failed to save data: ${msg}`);
      setToastType('error');
      setShowToast(true);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this data?')) return;

    try {
      await api.delete(`/donation/seassonpass/${id}`);
      fetchSeassonPassDonation();
      setToastMessage('Deleted successfully.');
      setToastType('success');
      setShowToast(true);
    } catch (error) {
      console.error('Delete error:', error);
      const msg = error.response?.data?.message || 'Delete failed.';
      setToastMessage(msg);
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

  const handleShowModal = () => {
    setCurrentItem(null);
    setFormData({ donation_title: '', pricing: '', image: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const getToastColor = (type) => {
    switch (type) {
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timer);
  }, [showToast]);

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      {/* HEADER & BUTTON */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-0">Seasson Pass Donation Data</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
          onClick={handleShowModal}>
          Add Seasson Pass Donation
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Donation Title</th>
              <th className="py-3 px-6 text-left">Pricing</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {seassonPassDonations.length > 0 ? (
              seassonPassDonations.map((item, index) => (
                <tr key={item.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}>
                  <td className="py-3 px-6">{item.id}</td>
                  <td className="py-3 px-6">{item.donation_title}</td>
                  <td className="py-3 px-6">{item.pricing}</td>
                  <td className="py-3 px-6">
                    {item.image_url ? (
                      <img src={item.image_url} alt="Donation" className="h-10 w-10 object-cover rounded-full" />
                    ) : 'No Image'}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded text-xs mr-2"
                      onClick={() => handleEdit(item)}>Edit</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-xs"
                      onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b border-gray-200">
                <td colSpan="5" className="py-3 px-6 text-center text-gray-500 italic">
                  No Seasson Pass Donation data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center pb-3 border-b">
              <h3 className="text-xl font-semibold">{currentItem ? 'Edit' : 'Add'} Seasson Pass Donation</h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
              {formFields.map((field, index) => (
                <div className="mb-4" key={index}>
                  <label htmlFor={field.name} className="block text-sm font-bold mb-2">{field.label}</label>
                  {field.type === 'file' ? (
                    <div className="relative">
                      <input type="file" id={field.name} name={field.name} onChange={handleChange}
                        ref={fileInputRef} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <button type="button" onClick={() => fileInputRef.current.click()}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded shadow flex justify-center items-center">
                        {formData.image ? formData.image.name : 'Choose File'}
                      </button>
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end">
                <button type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md">
                  {currentItem ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TOAST */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className={`${getToastColor(toastType)} text-white px-6 py-3 rounded-lg shadow-lg flex items-center`}>
            <span>{toastMessage}</span>
            <button onClick={() => setShowToast(false)}
              className="ml-4 text-white text-xl leading-none font-bold opacity-75 hover:opacity-100">&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeassonPassDonation;
