import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import api from "../api";

const ServerRules = () => {
  const [serverRules, setServerRules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    rules: "",
    description: "",
    category: "", // Added category to formData
  });
  const [currentRule, setCurrentRule] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("info");

  const formFields = [
    {
      label: "Rules",
      name: "rules",
      type: "text",
      required: true,
      placeholder: "Enter rule title",
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      required: false,
      placeholder:
        "Write each list item on a new line. Example:\nFirst item\nSecond item",
    },
    {
      label: "Category",
      name: "category",
      type: "text",
      required: true,
      placeholder: "Enter rule category",
    }, // Added category form field
  ];

  useEffect(() => {
    fetchServerRules();
  }, []);

  const fetchServerRules = async () => {
    try {
      const response = await api.get("/game-info/server-rules");
      const data = response.data;

      setServerRules(Array.isArray(data) ? data : []);
      setToastMessage("Data Server berhasil dimuat.");
      setToastType("success");
      setShowToast(true);
    } catch (error) {
      console.error("Error fetching:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal mengambil data Server.";
      setToastMessage(errorMessage);
      setToastType("error");
      setShowToast(true);
      setItems([]);
    } finally {
      setLoading(false);
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
    setCurrentRule(null);
    setFormData({
      rules: "",
      description: "",
      category: "", // Reset category when opening for add
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
      const method = currentRule ? "PUT" : "POST";
      const url = currentRule
        ? `/game-info/server-rules/${currentRule.id}`
        : "/game-info/server-rules";

      const response = currentRule
        ? await api.put(url, formData)
        : await api.post(url, formData);

      fetchServerRules();
      handleCloseModal();
      setToastMessage(
        currentItem
          ? "Rules berhasil diperbarui."
          : "Rules berhasil ditambahkan."
      );
      setToastType("success");
      setShowToast(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setToastMessage(
        `Terjadi kesalahan saat ${
          currentItem ? "memperbarui" : "menambahkan"
        } data: ${error.message}`
      );
      setToastType("error");
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (rule) => {
    setCurrentRule(rule);
    setFormData({
      rules: rule.rules,
      description: rule.description,
      category: rule.category, // Populate category when editing
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
    try {
      const response = await api.delete(`/game-info/server-rules/${id}`);
      fetchServerRules();
      setToastMessage("Rules berhasil dihapus.");
      setToastType("success");
      setShowToast(true);
    } catch (error) {
      console.error("Error deleting rules:", error);
      setToastMessage(
        `Gagal menghapus rules: ${
          error.response?.data?.message || error.message
        }`
      );
      setToastType("error");
      setShowToast(true);
      return;
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
        <h2 className="text-3xl font-bold text-gray-800">Server Rules</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
          onClick={handleShowModal}
        >
          Add Rule
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Rules</th>
              <th className="py-3 px-6 text-left">Category</th>{" "}
              {/* Added Category column header */}
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {serverRules.map((rule, index) => (
              <tr
                key={rule.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 border-b border-gray-200 transition duration-150 ease-in-out`}
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {rule.id}
                </td>
                <td className="py-3 px-6 text-left">{rule.rules}</td>
                <td className="py-3 px-6 text-left">{rule.category}</td>{" "}
                {/* Display category */}
                <td className="py-3 px-6 text-left">
                  {rule.description && (
                    <ol className="list-decimal list-inside pl-4 m-0">
                      {rule.description
                        .split("\n")
                        .map(
                          (item, descIndex) =>
                            item.trim() !== "" && (
                              <li key={descIndex}>{item}</li>
                            )
                        )}
                    </ol>
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-xs mr-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
                    onClick={() => handleEdit(rule)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
                    onClick={() => handleDelete(rule.id)}
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
              transform: showModal
                ? "translateY(0) scale(1)"
                : "translateY(-50px) scale(0.95)",
              opacity: showModal ? 1 : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {currentRule ? "Edit Server Rule" : "Add Server Rule"}
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
                      className={`
                        shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition duration-150 ease-in-out
                      `}
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  {currentRule ? "Update" : "Save"}
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

export default ServerRules;
