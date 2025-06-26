import React, { useState, useEffect } from "react";
import api from '../../Components/api'; // Sesuaikan path sesuai struktur folder

const HowToDonation = () => {
  const [howToDonations, setHowToDonations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    donation_guide: "",
    description: "",
  });
  const [currentItem, setCurrentItem] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("info");

  const formFields = [
    {
      label: "Donation Guide",
      name: "donation_guide",
      type: "text",
      required: true,
      placeholder: "Enter title for how-to guide",
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      required: false,
      placeholder:
        "Enter description steps, each on a new line. Example:\n1. Open donation menu\n2. Select amount",
    },
  ];

  useEffect(() => {
    fetchHowToDonations();
  }, []);

  const fetchHowToDonations = async () => {
    try {
      const response = await api.get("/donation/howto");
      setHowToDonations(response.data);
    } catch (error) {
      console.error("Error fetching How To donations:", error);
      setToastMessage(
        `Gagal mengambil How To Donation: ${
          error.response?.data?.message || error.message
        }`
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
    setFormData({ donation_guide: "", description: "" });
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
        await api.put(`/donation/howto/${currentItem.id}`, formData);
        setToastMessage("How To Donation berhasil diperbarui.");
      } else {
        await api.post("/donation/howto", formData);
        setToastMessage("How To Donation berhasil ditambahkan.");
      }

      fetchHowToDonations();
      handleCloseModal();
      setToastType("success");
      setShowToast(true);
    } catch (error) {
      console.error("Error submitting How To donation:", error);
      setToastMessage(
        `Gagal menyimpan How To Donation: ${
          error.response?.data?.message || error.message
        }`
      );
      setToastType("error");
      setShowToast(true);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({
      donation_guide: item.donation_guide,
      description: item.description,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await api.delete(`/donation/howto/${id}`);
        setToastMessage("How To Donation berhasil dihapus.");
        setToastType("success");
        fetchHowToDonations();
      } catch (error) {
        console.error("Error deleting How To donation:", error);
        setToastMessage(
          `Terjadi kesalahan saat menghapus: ${
            error.response?.data?.message || error.message
          }`
        );
        setToastType("error");
        setShowToast(true);
      }
    }
  };

  const renderAsOrderedList = (text) => {
    if (!text) return null;
    const items = text.split("\n").filter((item) => item.trim() !== "");
    if (items.length === 0) return null;

    return (
      <ol className="list-decimal list-inside pl-5 mt-0 mb-0 text-gray-700">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    );
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
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">How To Donation</h2>
        <button
          onClick={handleShowModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transition"
        >
          Tambah How To Donation
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Donation Guide</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {howToDonations.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 border-b`}
              >
                <td className="py-3 px-6">{item.id}</td>
                <td className="py-3 px-6">{item.donation_guide}</td>
                <td className="py-3 px-6">{renderAsOrderedList(item.description)}</td>
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
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {howToDonations.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500 italic">
                  Data How To Donation tidak tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 w-full max-w-md rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-xl font-semibold">
                {currentItem ? "Edit How To Donation" : "Tambah How To Donation"}
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
                <div key={field.name} className="mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      rows={5}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full px-3 py-2 border rounded shadow-sm focus:ring focus:ring-blue-500"
                    ></textarea>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full px-3 py-2 border rounded shadow-sm focus:ring focus:ring-blue-500"
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  {currentItem ? "Perbarui" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-slideInFromRight">
          <div
            className={`${getToastColor(
              toastType
            )} text-white px-6 py-3 rounded-lg shadow-lg flex items-center`}
          >
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

export default HowToDonation;
