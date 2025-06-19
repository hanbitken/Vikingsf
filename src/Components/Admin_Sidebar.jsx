import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../assets/logic/api";
import Logo from "../assets/Picture/LOGO VIKINGS 1.png";

const Admin_Sidebar = ({ onMenuClick, activePage }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState({
    table: false,
    gameInfo: false,
    serverInfo: false,
    featureInfo: false,
    generalInfo: false,
    npcList: false,
    dropList: false,
    questInfo: false,
    donation: false,
    serviceDonationSubmenu: false,
  });

  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleMenuClick = async (id) => {
    if (id === "logout") {
      try {
        await api.post("/logout");
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    } else {
      onMenuClick(id);
    }
  };

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-6 overflow-y-auto h-screen">
      <div className="flex justify-center mb-6">
        <img src={Logo} alt="Logo Vikings" className="h-20 w-auto" />
      </div>

      <nav className="flex flex-col space-y-2 text-sm">
        <button
          onClick={() => handleMenuClick("news")}
          className={`text-left hover:bg-gray-700 p-2 rounded ${
            activePage === "news" ? "bg-gray-700" : ""
          }`}
        >
          News
        </button>

        {/* Table List */}
        <button
          onClick={() => toggle("table")}
          className="text-left hover:bg-gray-700 p-2 rounded flex justify-between items-center"
        >
          <span>Table List</span>
          <span>{open.table ? "▲" : "▼"}</span>
        </button>

        {open.table && (
          <div className="ml-4 space-y-2">
            {/* <button
              onClick={() => handleMenuClick("userTable")}
              className="hover:bg-gray-700 p-2 rounded w-full text-left"
            >
              User Table
            </button> */}

            {/* Game Info */}
            <button
              onClick={() => toggle("gameInfo")}
              className="hover:bg-gray-700 p-2 rounded w-full text-left flex justify-between"
            >
              <span>Game Info</span>
              <span>{open.gameInfo ? "▲" : "▼"}</span>
            </button>

            {open.gameInfo && (
              <div className="ml-4 space-y-2">
                {/* Server Info */}
                <button
                  onClick={() => toggle("serverInfo")}
                  className="hover:bg-gray-700 p-2 rounded w-full text-left flex justify-between"
                >
                  <span>Server Info</span>
                  <span>{open.serverInfo ? "▲" : "▼"}</span>
                </button>

                {open.serverInfo && (
                  <div className="ml-4 space-y-2">
                    {/* Feature Info */}
                    <button
                      onClick={() => toggle("featureInfo")}
                      className="hover:bg-gray-700 p-2 rounded w-full text-left flex justify-between"
                    >
                      <span>Feature Info</span>
                      <span>{open.featureInfo ? "▲" : "▼"}</span>
                    </button>
                    {open.featureInfo && (
                      <div className="ml-4 space-y-1">
                        <button
                          onClick={() => handleMenuClick("pendantInformation")}
                          className="hover:bg-gray-700 p-2 rounded w-full text-left"
                        >
                          Pendant Info
                        </button>
                        <button
                          onClick={() => handleMenuClick("gemInformation")}
                          className="hover:bg-gray-700 p-2 rounded w-full text-left"
                        >
                          Gem Info
                        </button>
                      </div>
                    )}

                    {/* General Info */}
                    <button
                      onClick={() => toggle("generalInfo")}
                      className="hover:bg-gray-700 p-2 rounded w-full text-left flex justify-between"
                    >
                      <span>General Info</span>
                      <span>{open.generalInfo ? "▲" : "▼"}</span>
                    </button>
                    {open.generalInfo && (
                      <div className="ml-4 space-y-1">
                        <button
                          onClick={() => handleMenuClick("serversinfo")}
                          className="hover:bg-gray-700 p-2 rounded w-full text-left"
                        >
                          Servers Info
                        </button>
                        <button
                          onClick={() => handleMenuClick("systeminfo")}
                          className="hover:bg-gray-700 p-2 rounded w-full text-left"
                        >
                          System Info
                        </button>
                        <button
                          onClick={() => handleMenuClick("feature-disable")}
                          className="hover:bg-gray-700 p-2 rounded w-full text-left"
                        >
                          Feature Disable
                        </button>
                        <button
                          onClick={() => handleMenuClick("feature-enable")}
                          className="hover:bg-gray-700 p-2 rounded w-full text-left"
                        >
                          Feature Enable
                        </button>
                      </div>
                    )}

                    {/* NPC List */}
                    <button
                      onClick={() => toggle("npcList")}
                      className="hover:bg-gray-700 p-2 rounded w-full text-left flex justify-between"
                    >
                      <span>NPC List</span>
                      <span>{open.npcList ? "▲" : "▼"}</span>
                    </button>
                    {open.npcList && (
                      <div className="ml-4 space-y-1">
                        <button
                          onClick={() => handleMenuClick("npclist")}
                          className="hover:bg-gray-700 p-2 rounded w-full text-left"
                        >
                          NPC List
                        </button>
                      </div>
                    )}

                    {/* Drop List */}
                    <button
                      onClick={() => toggle("dropList")}
                      className="hover:bg-gray-700 p-2 rounded w-full text-left flex justify-between"
                    >
                      <span>Drop List</span>
                      <span>{open.dropList ? "▲" : "▼"}</span>
                    </button>
                    {open.dropList && (
                      <div className="ml-4 space-y-1">
                        <button
                          onClick={() => handleMenuClick("droplist")}
                          className="hover:bg-gray-700 p-2 rounded w-full text-left"
                        >
                          Drop List
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Quest Info */}
                <button
                  onClick={() => toggle("questInfo")}
                  className="hover:bg-gray-700 p-2 rounded w-full text-left flex justify-between"
                >
                  <span>Quest Info</span>
                  <span>{open.questInfo ? "▲" : "▼"}</span>
                </button>
                {open.questInfo && (
                  <div className="ml-4 space-y-1">
                    <button
                      onClick={() => handleMenuClick("dailyquestafterwar")}
                      className="hover:bg-gray-700 p-2 rounded w-full text-left"
                    >
                      Daily Quest After War
                    </button>
                    <button
                      onClick={() => handleMenuClick("dailyquest")}
                      className="hover:bg-gray-700 p-2 rounded w-full text-left"
                    >
                      Daily Quest
                    </button>
                  </div>
                )}

                <button
                  onClick={() => handleMenuClick("mapinfo")}
                  className="hover:bg-gray-700 p-2 rounded w-full text-left"
                >
                  Map Info
                </button>
                <button
                  onClick={() => handleMenuClick("serverrules")}
                  className="hover:bg-gray-700 p-2 rounded w-full text-left"
                >
                  Server Rules
                </button>
              </div>
            )}

            {/* Donation Info */}
            <button
              onClick={() => toggle("donation")}
              className="hover:bg-gray-700 p-2 rounded w-full text-left flex justify-between"
            >
              <span>Donation Info</span>
              <span>{open.donation ? "▲" : "▼"}</span>
            </button>
            {open.donation && (
              <div className="ml-4 space-y-1">
                <button
                  onClick={() => toggle("serviceDonationSubmenu")}
                  className="hover:bg-gray-700 p-2 rounded w-full text-left flex justify-between"
                >
                  <span>Service Donation</span>
                  <span>{open.serviceDonationSubmenu ? "▲" : "▼"}</span>
                </button>
                {open.serviceDonationSubmenu && (
                  <div className="ml-4 space-y-1">
                    <button
                      onClick={() => handleMenuClick("services")}
                      className="hover:bg-gray-700 p-2 rounded w-full text-left"
                    >
                      Service
                    </button>
                    <button
                      onClick={() => handleMenuClick("gemstone")}
                      className="hover:bg-gray-700 p-2 rounded w-full text-left"
                    >
                      Gemstone
                    </button>
                    <button
                      onClick={() => handleMenuClick("resources")}
                      className="hover:bg-gray-700 p-2 rounded w-full text-left"
                    >
                      Resources
                    </button>
                  </div>
                )}

                <button
                  onClick={() => handleMenuClick("retail")}
                  className="hover:bg-gray-700 p-2 rounded w-full text-left"
                >
                  Retail Donation
                </button>
                <button
                  onClick={() => handleMenuClick("seassonpass")}
                  className="hover:bg-gray-700 p-2 rounded w-full text-left"
                >
                  Season Pass
                </button>
                <button
                  onClick={() => handleMenuClick("packages")}
                  className="hover:bg-gray-700 p-2 rounded w-full text-left"
                >
                  Packages
                </button>
                <button
                  onClick={() => handleMenuClick("howto")}
                  className="hover:bg-gray-700 p-2 rounded w-full text-left"
                >
                  How To
                </button>
                <button
                  onClick={() => handleMenuClick("package-categories")}
                  className="hover:bg-gray-700 p-2 rounded w-full text-left"
                >
                  Package Category
                </button>
                <button
                  onClick={() => handleMenuClick("item-package")}
                  className="hover:bg-gray-700 p-2 rounded w-full text-left"
                >
                  Item Package Bonus
                </button>
                <button
                  onClick={() => handleMenuClick("package-bonuses")}
                  className="hover:bg-gray-700 p-2 rounded w-full text-left"
                >
                  Package Bonuses
                </button>
              </div>
            )}
          </div>
        )}

        <button
          // onClick={() => handleMenuClick("logout")}
          onClick={() => navigate("/")}
          className="text-left hover:bg-gray-700 p-2 rounded"
        >
          Back to Home
        </button>
      </nav>
    </aside>
  );
};

export default Admin_Sidebar;
