import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import api from "./assets/logic/api";

// Layouts
import Header from "./Components/header";
import Footer from "./Components/footer";
import ProtectedRoute from "./Components/ProtectedRoute";
import DashboardLayout from "./Components/Admin/DashboardLayout"; // Pastikan path ini sesuai

// Pages - Public
import Home from "./Pages/home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Forgot from "./Components/forgot";
import ResetPassword from "./Components/ResetPassword";
import ServerInfo from "./Pages/GameInfo/serverinfo";
import QuestInfo from "./Pages/GameInfo/questinfo";
import Rules from "./Pages/GameInfo/rules";
import MapInfo from "./Pages/GameInfo/mapinfo";
import Donation from "./Pages/donation";
import NewsDetail from "./Pages/News/NewsDetail";
import News from "./Pages/News/News";
import Download from "./Pages/Download/Download";
import Admin from "./Pages/Admin/main";

// Admin Components
import Dashboard from "./Page/Dashboard";
import UsersTable from "./Components/UserTable";
import GameInformation from "./Components/GameInfo/GameInformation";
import ServerRules from "./Components/GameInfo/ServerRules";

// Server Info
import PendantInformation from "./Components/ServerInfo/FeatureInformation/PendantInformation";
import GemInformation from "./Components/ServerInfo/FeatureInformation/GemInformation";
import RaceHqNpc from "./Components/ServerInfo/NPCList/RaceHqNpc";
import ElanPlateauNpc from "./Components/ServerInfo/NPCList/ElanPlateauNpc";
import SetteDessertNpc from "./Components/ServerInfo/NPCList/SetteDessertNpc";
import VolcanicCauldronNpc from "./Components/ServerInfo/NPCList/VolcanicCauldronNpc";
import Cragmine from "./Components/ServerInfo/DropList/Cragmine";
import DropOnHq from "./Components/ServerInfo/DropList/DropOnHq";
import ElanPlateau from "./Components/ServerInfo/DropList/ElanPlateau";
import ElfLand from "./Components/ServerInfo/DropList/ElfLand";
import EtherPlatform from "./Components/ServerInfo/DropList/EtherPlatform";
import OutcastLand from "./Components/ServerInfo/DropList/OutcastLand";
import PitbossDrop from "./Components/ServerInfo/DropList/PitbossDrop";
import SetteDesert from "./Components/ServerInfo/DropList/SetteDesert";
import VolcanicCauldron from "./Components/ServerInfo/DropList/VolcanicCauldron";
import FeaturesDisable from "./Components/ServerInfo/GeneralInfo/FeaturesDisable";
import FeaturesEnable from "./Components/ServerInfo/GeneralInfo/FeaturesEnable";

// Quest Info
import DailyQuestAfterWar from "./Components/QuestInfo/DailyQuestAfterWar";
import DailyQuestMonday from "./Components/QuestInfo/DailyQuestMonday";
import DailyQuestTuesday from "./Components/QuestInfo/DailyQuestTuesday";
import DailyQuestWednesday from "./Components/QuestInfo/DailyQuestWednesday";
import DailyQuestThursday from "./Components/QuestInfo/DailyQuestThursday";
import DailyQuestFriday from "./Components/QuestInfo/DailyQuestFriday";
import DailyQuestSaturday from "./Components/QuestInfo/DailyQuestSaturday";
import DailyQuestSunday from "./Components/QuestInfo/DailyQuestSunday";

// Donation
import DonationInformation from "./Components/Donation/DonationInformation";
import RetailDonation from "./Components/Donation/RetailDonation";
import SeassonPassDonation from "./Components/Donation/SeassonPassDonation";
import PackageDonation from "./Components/Donation/PackageDonation";
import HowToDonation from "./Components/Donation/HowToDonation";
import ServiceDonation from "./Components/Donation/ServiceDonation/ServiceDonation";
import TabGemstone from "./Components/Donation/ServiceDonation/TabGemstone";
import TabResources from "./Components/Donation/ServiceDonation/TabResources";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}

function App() {
  const [redirectPath, setRedirectPath] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setRedirectPath("/login");
      setLoading(false);
      return;
    }

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    api
      .get("/me")
      .then((res) => {
        const role = res.data.role?.toLowerCase();
        if (role === "admin") {
          setRedirectPath("/admin");
        } else {
          setRedirectPath("/home");
        }
      })
      .catch(() => {
        setRedirectPath("/login");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-white text-center">Loading...</p>;

  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/gameinfo/server"
          element={
            <MainLayout>
              <ServerInfo />
            </MainLayout>
          }
        />
        <Route
          path="/gameinfo/quest"
          element={
            <MainLayout>
              <QuestInfo />
            </MainLayout>
          }
        />
        <Route
          path="/gameinfo/map"
          element={
            <MainLayout>
              <MapInfo />
            </MainLayout>
          }
        />
        <Route
          path="/gameinfo/rules"
          element={
            <MainLayout>
              <Rules />
            </MainLayout>
          }
        />
        <Route
          path="/donation"
          element={
            <MainLayout>
              <Donation />
            </MainLayout>
          }
        />
        <Route
          path="/news"
          element={
            <MainLayout>
              <News />
            </MainLayout>
          }
        />
        <Route
          path="/news/:id"
          element={
            <MainLayout>
              <NewsDetail />
            </MainLayout>
          }
        />
        <Route
          path="/download"
          element={
            <MainLayout>
              <Download />
            </MainLayout>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roleRequired="admin">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="table-list/users" element={<UsersTable />} />

          {/* Game Info */}
          <Route
            path="table-list/game-info/game-data"
            element={<GameInformation />}
          />
          <Route
            path="table-list/game-info/server-rules"
            element={<ServerRules />}
          />
          <Route
            path="table-list/game-info/mapinfo/by-number/:mapNumber"
            element={<MapInfo />}
          />

          {/* Server Info */}
          <Route
            path="table-list/game-info/server-info/featureinfo/pendant-information"
            element={<PendantInformation />}
          />
          <Route
            path="table-list/game-info/server-info/featureinfo/gem-information"
            element={<GemInformation />}
          />
          <Route
            path="table-list/game-info/server-info/npclist/racehqnpc"
            element={<RaceHqNpc />}
          />
          <Route
            path="table-list/game-info/server-info/npclist/elanplateaunpc"
            element={<ElanPlateauNpc />}
          />
          <Route
            path="table-list/game-info/server-info/npclist/settedessertnpc"
            element={<SetteDessertNpc />}
          />
          <Route
            path="table-list/game-info/server-info/npclist/volcaniccauldronnpc"
            element={<VolcanicCauldronNpc />}
          />
          <Route
            path="table-list/game-info/server-info/droplist/cragmine"
            element={<Cragmine />}
          />
          <Route
            path="table-list/game-info/server-info/droplist/droponhq"
            element={<DropOnHq />}
          />
          <Route
            path="table-list/game-info/server-info/droplist/elanplateau"
            element={<ElanPlateau />}
          />
          <Route
            path="table-list/game-info/server-info/droplist/elfland"
            element={<ElfLand />}
          />
          <Route
            path="table-list/game-info/server-info/droplist/etherplatform"
            element={<EtherPlatform />}
          />
          <Route
            path="table-list/game-info/server-info/droplist/outcastland"
            element={<OutcastLand />}
          />
          <Route
            path="table-list/game-info/server-info/droplist/pitbossdrop"
            element={<PitbossDrop />}
          />
          <Route
            path="table-list/game-info/server-info/droplist/settedesert"
            element={<SetteDesert />}
          />
          <Route
            path="table-list/game-info/server-info/droplist/volcaniccauldron"
            element={<VolcanicCauldron />}
          />
          <Route
            path="table-list/game-info/server-info/GeneralInfo/feature-disable"
            element={<FeaturesDisable />}
          />
          <Route
            path="table-list/game-info/server-info/GeneralInfo/feature-enable"
            element={<FeaturesEnable />}
          />

          {/* Quest Info */}
          <Route
            path="table-list/game-info/quest-info/dailyquestafterwar"
            element={<DailyQuestAfterWar />}
          />
          <Route
            path="table-list/game-info/quest-info/dailyquestmonday"
            element={<DailyQuestMonday />}
          />
          <Route
            path="table-list/game-info/quest-info/dailyquesttuesday"
            element={<DailyQuestTuesday />}
          />
          <Route
            path="table-list/game-info/quest-info/dailyquestwednesday"
            element={<DailyQuestWednesday />}
          />
          <Route
            path="table-list/game-info/quest-info/dailyquestthursday"
            element={<DailyQuestThursday />}
          />
          <Route
            path="table-list/game-info/quest-info/dailyquestfriday"
            element={<DailyQuestFriday />}
          />
          <Route
            path="table-list/game-info/quest-info/dailyquestsaturday"
            element={<DailyQuestSaturday />}
          />
          <Route
            path="table-list/game-info/quest-info/dailyquestsunday"
            element={<DailyQuestSunday />}
          />

          {/* Donation */}
          <Route
            path="table-list/donation/service/services"
            element={<ServiceDonation />}
          />
          <Route
            path="table-list/donation/service/gemstone"
            element={<TabGemstone />}
          />
          <Route
            path="table-list/donation/service/resources"
            element={<TabResources />}
          />
          <Route
            path="table-list/donation/donation-info"
            element={<DonationInformation />}
          />
          <Route
            path="table-list/donation/retail"
            element={<RetailDonation />}
          />
          <Route
            path="table-list/donation/seassonpass"
            element={<SeassonPassDonation />}
          />
          <Route
            path="table-list/donation/package"
            element={<PackageDonation />}
          />
          <Route path="table-list/donation/howto" element={<HowToDonation />} />
        </Route>

        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <h4 className="text-center mt-5">Halaman Tidak Ditemukan</h4>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
