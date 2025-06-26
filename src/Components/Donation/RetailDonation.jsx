import React, { useState, useEffect } from "react";
import api from '../../Components/api'; // Sesuaikan dengan path api.js kamu

const RetailDonation = () => {
  const [retailDonations, setRetailDonations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    donation_title: "",
    pricing: "",
  });
  const [currentItem, setCurrentItem] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("info");

  const formFields = [
    {
      label: "Donation Title",
      name: "donation_title",
      type: "text",
      required: true,
      placeholder: "Enter Donation Title",
    },
    {
      label: "Pricing",
      name: "pricing",
      type: "text",
      required: true,
      placeholder: "Enter Pricing (e.g., Rp. 50.000)",
    },
  ];

  useEffect(() => {
    fetchRetailDonations();
  }, []);

  const fetchRetailDonations = async () => {
    try {
      const response = await api.get("/donation/retail");
      setRetailDonations(response.data);
    } catch (error) {
      console.error("Error fetching retail donations:", error);
      setToastMessage(
        `Failed to fetch Retail Donation data: ${error.response?.data?.message || error.message}`
      );
      setToastType("error");
      setShowToast(true);
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleShowModal = () => {
    setCurrentItem(null);
    setFormData({ donation_title: "", pricing: "" });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentItem) {
        await api.put(`/donation/retail/${currentItem.id}`, formData);
        setToastMessage("Retail Donation data updated successfully.");
      } else {
        await api.post("/donation/retail", formData);
        setToastMessage("Retail Donation data added successfully.");
      }
      fetchRetailDonations();
      handleCloseModal();
      setToastType("success");
      setShowToast(true);
    } catch (error) {
      console.error("Error saving data:", error);
      setToastMessage(
        `Failed to save Retail Donation data: ${error.response?.data?.message || error.message}`
      );
      setToastType("error");
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
    if (window.confirm("Are you sure you want to delete this data?")) {
      try {
        await api.delete(`/donation/retail/${id}`);
        setToastMessage("Retail Donation data deleted successfully.");
        setToastType("success");
        fetchRetailDonations();
      } catch (error) {
        console.error("Error deleting data:", error);
        setToastMessage(
          `An error occurred while deleting data: ${error.response?.data?.message || error.message}`
        );
        setToastType("error");
      } finally {
        setShowToast(true);
      }
    }
  };

  const getToastColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Retail Donation Data</h2>
        <button
          onClick={handleShowModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg transition"
        >
          Add Retail Donation
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Donation Title</th>
              <th className="py-3 px-6 text-left">Pricing</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {retailDonations.map((item, index) => (
              <tr
                key={item.id}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 border-b`}
              >
                <td className="py-3 px-6 text-left">{item.id}</td>
                <td className="py-3 px-6 text-left">{item.donation_title}</td>
                <td className="py-3 px-6 text-left">{item.pricing}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-xs mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {retailDonations.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500 italic">
                  No Retail Donation data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50"
          onClick={handleCloseModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center pb-3 border-b">
              <h3 className="text-xl font-semibold">
                {currentItem ? "Edit Retail Donation" : "Add Retail Donation"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-2xl text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
              {formFields.map((field) => (
                <div className="mb-4" key={field.name}>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  {currentItem ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-slideInFromRight">
          <div className={`${getToastColor(toastType)} text-white px-6 py-3 rounded-lg shadow-lg flex items-center`}>
            <span>{toastMessage}</span>
            <button
              onClick={() => setShowToast(false)}
              className="ml-4 text-white text-xl font-bold opacity-75 hover:opacity-100"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RetailDonation;
