import React, { useState, useEffect } from "react";
import api from "../../api";

const NpcList = () => {
  const [npcLists, setNpcLists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    map_information_id: "",
    npc: "",
    buy_with: "",
  });
  const [currentItem, setCurrentItem] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("info");

  const formFields = [
    {
      label: "Map Info ID",
      name: "map_information_id",
      type: "number",
      required: true,
      placeholder: "Enter Map Info ID (e.g., 1)",
    },
    {
      label: "NPC",
      name: "npc",
      type: "text",
      required: true,
      placeholder: "Enter NPC Name",
    },
    {
      label: "Buy With",
      name: "buy_with",
      type: "textarea",
      required: false,
      placeholder: "Enter what can be bought with (e.g., Honor, PvP Points)",
    },
  ];

  useEffect(() => {
    fetchNpcLists();
  }, []);

  const fetchNpcLists = async () => {
    try {
      const response = await api.get("/game-info/server-information/npclist");
      const data = response.data;

      if (Array.isArray(data)) {
        setNpcLists(data);
      } else if (data && typeof data === "object") {
        setNpcLists([data]);
      } else {
        setNpcLists([]);
      }

      setToastMessage("Data NPC List berhasil dimuat.");
      setToastType("success");
      setShowToast(true);
    } catch (error) {
      if (error.response?.status === 404) {
        setNpcLists([]);
        setToastMessage("Data NPC List belum ada.");
        setToastType("info");
        setShowToast(true);
      } else {
        setToastMessage(`Gagal mengambil data NPC List: ${error.message}`);
        setToastType("error");
        setShowToast(true);
        setNpcLists([]);
      }
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
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    if (showModal) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [showModal]);

  const handleShowModal = () => {
    setCurrentItem(null);
    setFormData({
      map_information_id: "",
      npc: "",
      buy_with: "",
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
      const payload = { ...formData };
      const url = `/game-info/server-information/npclist${
        currentItem ? `/${currentItem.id}` : ""
      }`;
      const method = currentItem ? api.put : api.post;

      const response = await method(url, payload);

      fetchNpcLists();
      handleCloseModal();
      setToastMessage(
        currentItem
          ? "NPC List berhasil diperbarui."
          : "NPC List berhasil ditambahkan."
      );
      setToastType("success");
      setShowToast(true);
    } catch (error) {
      const data = error.response?.data;
      let errorMessage = "Terjadi kesalahan.";
      if (data?.message) {
        errorMessage = data.message;
      } else if (data?.errors) {
        errorMessage = Object.values(data.errors).flat().join("; ");
      }
      setToastMessage(`Gagal menyimpan NPC List: ${errorMessage}`);
      setToastType("error");
      setShowToast(true);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({
      map_information_id: item.map_information_id,
      npc: item.npc,
      buy_with: item.buy_with,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await api.delete(`/game-info/server-information/npclist/${id}`);
        fetchNpcLists();
        setToastMessage("NPC List berhasil dihapus.");
        setToastType("success");
        setShowToast(true);
      } catch (error) {
        const data = error.response?.data;
        let errorMessage = "Gagal menghapus data.";
        if (data?.message) {
          errorMessage = data.message;
        }
        setToastMessage(`Terjadi kesalahan saat menghapus: ${errorMessage}`);
        setToastType("error");
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
      case "info":
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">NPC List</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
          onClick={handleShowModal}
        >
          Tambah NPC
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">NPC</th>
              <th className="py-3 px-6 text-left">Buy With</th>
              <th className="py-3 px-6 text-left">Map Info ID</th>
              <th className="py-3 px-6 text-center">Action</th>{" "}
              {/* Adjusted colSpan */}
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {npcLists.length > 0 ? (
              npcLists.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 border-b border-gray-200 transition duration-150 ease-in-out`}
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="py-3 px-6 text-left">{item.npc}</td>
                  <td className="py-3 px-6 text-left">{item.buy_with}</td>
                  <td className="py-3 px-6 text-left">
                    {item.map_information_id}
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
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b border-gray-200">
                <td
                  colSpan="5"
                  className="py-3 px-6 text-center text-gray-500 italic"
                >
                  {" "}
                  {/* Adjusted colSpan */}
                  Tidak ada data NPC List yang tersedia.
                </td>
              </tr>
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
              transform: showModal
                ? "translateY(0) scale(1)"
                : "translateY(-50px) scale(0.95)",
              opacity: showModal ? 1 : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {currentItem ? "Edit NPC List" : "Tambah NPC List"}
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
                  <label
                    htmlFor={field.name}
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
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
                      placeholder={field.placeholder}
                      className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
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
            )} text-white px-6 py-3 rounded-lg shadow-lg flex items-center transition duration-300 ease-in-out transform hover:scale-105`}
          >
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

export default NpcList;
