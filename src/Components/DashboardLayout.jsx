import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  Navbar, Nav, Form, FormControl, Button, InputGroup
} from 'react-bootstrap';
import {
  FaBars, FaBell, FaUserCircle, FaHome, FaSignInAlt, FaUserPlus,
  FaTable, FaCog, FaSearch, FaChevronDown, FaChevronRight
} from 'react-icons/fa';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [submenus, setSubmenus] = useState({
    table: false,
    gameInfo: false,
    serverInfo: false,
    questInfo: false,
    mapInfo: false,
    donation: false, 
    serviceDonationSubmenu: false, 
    featureInfo: false,
    npcList: false,
    dropList: false,
    generalInfo: false,
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSubmenu = (name) =>
    setSubmenus(prev => ({ ...prev, [name]: !prev[name] }));

  const dailyQuests = ["Sunday", "Saturday", "Friday", "Thursday", "Wednesday", "Tuesday", "Monday"];
  const donationTypes = ['Retail', 'SeassonPass', 'Package', 'HowTo'];
  const dropListAreas = [
    "droponhq", "elanplateau", "volcaniccauldron", "outcastland", "settedesert", "etherplatform", "elfland", "cragmine", "pitbossdrop"
  ];

  const dropListNames = {
    droponhq: "Drop on HQ",
    elanplateau: "Elan Plateau",
    volcaniccauldron: "Volcanic Cauldron",
    outcastland: "Outcast Land",
    settedesert: "Sette Desert",
    etherplatform: "Ether Platform",
    elfland: "Elf Land",
    cragmine: "Cragmine",
    pitbossdrop: "Pitboss Drop"
  };

  return (
    <div className="d-flex">
      {sidebarOpen && (
        <div
          className="bg-dark text-light p-3 d-none d-md-block"
          style={{
            width: '250px',
            height: '100vh',
            overflowY: 'auto',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1020
          }}
        >
          <div className="d-flex align-items-center mb-2">
            <img src="/vikings.png" alt="Logo Vikings" height={70} className="me-2" />
            <span className="fs-6 fw-light">Vikings</span>
          </div>

          <Nav className="flex-column mt-5">
            <Nav.Link as={Link} to="/admin" className="text-white fw-light d-flex align-items-center mb-2">
              <FaHome className="me-2" /> Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="text-white fw-light d-flex align-items-center mb-2">
              <FaSignInAlt className="me-2" /> Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register" className="text-white fw-light d-flex align-items-center mb-2">
              <FaUserPlus className="me-2" /> Register
            </Nav.Link>

            <Nav.Link
              onClick={() => toggleSubmenu('table')}
              className="text-white fw-light d-flex align-items-center mb-2"
              style={{ cursor: 'pointer' }}
            >
              <FaTable className="me-2" /> Table Lists
              <span className="ms-auto">{submenus.table ? <FaChevronDown /> : <FaChevronRight />}</span>
            </Nav.Link>

            {submenus.table && (
              <div className="ms-4">
                <Nav.Link as={Link} to="/admin/table-list/users" className="text-white fw-light mb-1">
                  User Table
                </Nav.Link>

                <Nav.Link
                  onClick={() => toggleSubmenu('gameInfo')}
                  className="text-white fw-light d-flex justify-content-between mb-1"
                  style={{ cursor: 'pointer' }}
                  as="div"
                >
                  <span>Game Info</span>
                  <span>{submenus.gameInfo ? <FaChevronDown /> : <FaChevronRight />}</span>
                </Nav.Link>

                {submenus.gameInfo && (
                  <div className="ms-3">
                    <Nav.Link as={Link} to="/admin/table-list/game-info/game-data" className="text-white fw-light mb-1">
                      Game Information CRUD
                    </Nav.Link>

                    <Nav.Link
                      onClick={() => toggleSubmenu('serverInfo')}
                      className="text-white fw-light d-flex justify-content-between mb-1"
                      style={{ cursor: 'pointer' }}
                      as="div"
                    >
                      <span>Server Info</span>
                      <span>{submenus.serverInfo ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}</span>
                    </Nav.Link>

                    {submenus.serverInfo && (
                      <div className="ms-3">
                        <Nav.Link
                          onClick={() => toggleSubmenu('featureInfo')}
                          className="text-white fw-light d-flex justify-content-between mb-1"
                          style={{ cursor: 'pointer' }}
                          as="div"
                        >
                          <span>Feature Information</span>
                          <span>{submenus.featureInfo ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}</span>
                        </Nav.Link>

                        {submenus.featureInfo && (
                          <div className="ms-3">
                            <Nav.Link as={Link} to="/admin/table-list/game-info/server-info/featureinfo/pendant-information" className="text-white fw-light mb-1">
                              Pendant Information
                            </Nav.Link>
                            <Nav.Link as={Link} to="/admin/table-list/game-info/server-info/featureinfo/gem-information" className="text-white fw-light mb-1">
                              Gem Information
                            </Nav.Link>
                          </div>
                        )}

                        <Nav.Link
                          onClick={() => toggleSubmenu('generalInfo')}
                          className="text-white fw-light d-flex justify-content-between mb-1"
                          style={{ cursor: 'pointer' }}
                          as="div"
                        >
                          <span>General Information</span>
                          <span>{submenus.generalInfo ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}</span>
                        </Nav.Link>

                        {submenus.generalInfo && (
                          <div className="ms-3">
                            <Nav.Link as={Link} to="/admin/table-list/game-info/server-info/generalinfo/feature-disable" className="text-white fw-light mb-1">
                              Feature Disable
                            </Nav.Link>
                            <Nav.Link as={Link} to="/admin/table-list/game-info/server-info/generalinfo/feature-enable" className="text-white fw-light mb-1">
                              Feature Enable
                            </Nav.Link>
                          </div>
                        )}

                        <Nav.Link
                          onClick={() => toggleSubmenu('npcList')}
                          className="text-white fw-light d-flex justify-content-between mb-1"
                          style={{ cursor: 'pointer' }}
                          as="div"
                        >
                          <span>NPC List Information</span>
                          <span>{submenus.npcList ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}</span>
                        </Nav.Link>

                        {submenus.npcList && (
                          <div className="ms-3">
                            <Nav.Link as={Link} to="/admin/table-list/game-info/server-info/npclist/racehqnpc" className="text-white fw-light mb-1">
                              Race HQ NPC
                            </Nav.Link>
                            <Nav.Link as={Link} to="/admin/table-list/game-info/server-info/npclist/elanplateaunpc" className="text-white fw-light mb-1">
                              Elan Plateau
                            </Nav.Link>
                            <Nav.Link as={Link} to="/admin/table-list/game-info/server-info/npclist/settedessertnpc" className="text-white fw-light mb-1">
                              Sette Dessert
                            </Nav.Link>
                            <Nav.Link as={Link} to="/admin/table-list/game-info/server-info/npclist/volcaniccauldronnpc" className="text-white fw-light mb-1">
                              Volcanic Cauldron
                            </Nav.Link>
                          </div>
                        )}

                        <Nav.Link
                          onClick={() => toggleSubmenu('dropList')}
                          className="text-white fw-light d-flex justify-content-between mb-1"
                          style={{ cursor: 'pointer' }}
                          as="div"
                        >
                          <span>Drop List Information</span>
                          <span>{submenus.dropList ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}</span>
                        </Nav.Link>

                        {submenus.dropList && (
                          <div className="ms-3">
                            {dropListAreas.map(area => (
                              <Nav.Link
                                key={area}
                                as={Link}
                                to={`/admin/table-list/game-info/server-info/droplist/${area}`}
                                className="text-white fw-light mb-1"
                              >
                                {dropListNames[area]}
                              </Nav.Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )} 


                    <Nav.Link
                      onClick={() => toggleSubmenu('questInfo')}
                      className="text-white fw-light d-flex justify-content-between mb-1"
                      style={{ cursor: 'pointer' }}
                      as="div"
                    >
                      <span>Quest Info</span>
                      <span>{submenus.questInfo ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}</span>
                    </Nav.Link>

                    {submenus.questInfo && (
                      <div className="ms-3">
                        <Nav.Link
                          as={Link}
                          to="/admin/table-list/game-info/quest-info/dailyquestafterwar"
                          className="text-white fw-light mb-1"
                        >
                          Daily Quest After War
                        </Nav.Link>
                        {dailyQuests.map(day => (
                          <Nav.Link
                            key={day}
                            as={Link}
                            to={`/admin/table-list/game-info/quest-info/dailyquest${day.toLowerCase()}`}
                            className="text-white fw-light mb-1"
                          >
                            Daily Quest [{day}]
                          </Nav.Link>
                        ))}
                      </div>
                    )} 

                    <Nav.Link
                      onClick={() => toggleSubmenu('mapInfo')}
                      className="text-white fw-light d-flex justify-content-between mb-1"
                      style={{ cursor: 'pointer' }}
                      as="div"
                    >
                      <span>Map Info</span>
                      <span>{submenus.mapInfo ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}</span>
                    </Nav.Link>

                    {submenus.mapInfo && (
                      <div className="ms-3">
                        {[1, 2, 3, 4].map(i => (
                          <Nav.Link
                            key={i}
                            as={Link}
                            to={`/admin/table-list/game-info/mapinfo/by-number/${i}`}
                            className="text-white fw-light mb-1"
                          >
                            Map {i}
                          </Nav.Link>
                        ))}
                      </div>
                    )} 

                    <Nav.Link as={Link} to="/admin/table-list/game-info/server-rules" className="text-white fw-light mb-1">
                      Server Rules
                    </Nav.Link>
                  </div>
                )} 

                <Nav.Link
                  onClick={() => toggleSubmenu('donation')}
                  className="text-white fw-light d-flex justify-content-between mb-1"
                  style={{ cursor: 'pointer' }}
                  as="div"
                >
                  <span>Donation Info</span>
                  <span>{submenus.donation ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}</span>
                </Nav.Link>

                {submenus.donation && (
                  <div className="ms-3">
                    <Nav.Link as={Link} to="/admin/table-list/donation/donation-info" className="text-white fw-light mb-1">
                      Donation Information
                    </Nav.Link>

                    <Nav.Link
                      onClick={() => toggleSubmenu('serviceDonationSubmenu')}
                      className="text-white fw-light d-flex justify-content-between mb-1"
                      style={{ cursor: 'pointer' }}
                      as="div"
                    >
                      <span>Service Donation</span> 
                      <span>{submenus.serviceDonationSubmenu ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}</span>
                    </Nav.Link>

                    {submenus.serviceDonationSubmenu && (
                      <div className="ms-3">
                        <Nav.Link as={Link} to="/admin/table-list/donation/service/services" className="text-white fw-light mb-1">
                          Service Donation 
                        </Nav.Link>
                        <Nav.Link as={Link} to="/admin/table-list/donation/service/gemstone" className="text-white fw-light mb-1">
                          Tab Gemstone 
                        </Nav.Link>
                        <Nav.Link as={Link} to="/admin/table-list/donation/service/resources" className="text-white fw-light mb-1">
                          Tab Resources 
                        </Nav.Link>
                      </div>
                    )}


                    {donationTypes.filter(type => type !== 'Service').map(type => (
                      <Nav.Link
                        key={type}
                        as={Link}
                        to={`/admin/table-list/donation/${type.toLowerCase()}`}
                        className="text-white fw-light mb-1"
                      >
                        {type} Donation
                      </Nav.Link>
                    ))}
                  </div>
                )} 
              </div>
            )} 

            <Nav.Link as={Link} to="/settings" className="text-white fw-light d-flex align-items-center mb-2">
              <FaCog className="me-2" /> Settings
            </Nav.Link>
          </Nav>
        </div>
      )}

      <div
        style={{
          marginLeft: sidebarOpen ? '250px' : '0',
          flex: 1,
          minHeight: '100vh',
          backgroundColor: '#f8f9fa',
          overflowX: 'hidden'
        }}
      >
        <Navbar bg="white" className="px-4 shadow-sm">
          <div className="d-flex align-items-center w-100 justify-content-between">
            <div className="d-flex align-items-center">
              <Button variant="dark" onClick={toggleSidebar} className="me-3 d-md-none">
                <FaBars size={24} />
              </Button>
              <span className="fs-5 fw-bold text-dark d-md-none">Vikings</span>
            </div>
            <Form className="d-none d-md-flex me-3">
              <InputGroup className="rounded-pill bg-white border border-dark overflow-hidden">
                <FormControl type="search" placeholder="Search..."/>
                <InputGroup.Text className="bg-white border-0">
                  <FaSearch />
                </InputGroup.Text>
              </InputGroup>
            </Form>
          </div>
        </Navbar>
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;