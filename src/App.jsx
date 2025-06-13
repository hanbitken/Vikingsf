// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './Components/DashboardLayout';
import UsersTable from './Components/UserTable';
import GameInformation from './Components/GameInfo/GameInformation';
import ServerRules from './Components/GameInfo/ServerRules';
import MapInfo from './Components/MapInfo/MapInfo';

// Server Info - Feature Information
import PendantInformation from './Components/ServerInfo/FeatureInformation/PendantInformation';
import GemInformation from './Components/ServerInfo/FeatureInformation/GemInformation';

// Server Info - NPC List
import RaceHqNpc from './Components/ServerInfo/NPCList/RaceHqNpc';
import ElanPlateauNpc from './Components/ServerInfo/NPCList/ElanPlateauNpc';
import SetteDessertNpc from './Components/ServerInfo/NPCList/SetteDessertNpc';
import VolcanicCauldronNpc from './Components/ServerInfo/NPCList/VolcanicCauldronNpc';

// Server Info - Drop List
import Cragmine from './Components/ServerInfo/DropList/Cragmine';
import DropOnHq from './Components/ServerInfo/DropList/DropOnHq';
import ElanPlateau from './Components/ServerInfo/DropList/ElanPlateau';
import ElfLand from './Components/ServerInfo/DropList/ElfLand';
import EtherPlatform from './Components/ServerInfo/DropList/EtherPlatform';
import OutcastLand from './Components/ServerInfo/DropList/OutcastLand';
import PitbossDrop from './Components/ServerInfo/DropList/PitbossDrop';
import SetteDesert from './Components/ServerInfo/DropList/SetteDesert';
import VolcanicCauldron from './Components/ServerInfo/DropList/VolcanicCauldron';

// Server Info - General Info
import FeaturesDisable from './Components/ServerInfo/GeneralInfo/FeaturesDisable';
import FeaturesEnable from './Components/ServerInfo/GeneralInfo/FeaturesEnable';

// Quest Info
import DailyQuestAfterWar from './Components/QuestInfo/DailyQuestAfterWar';
import DailyQuestMonday from './Components/QuestInfo/DailyQuestMonday';
import DailyQuestTuesday from './Components/QuestInfo/DailyQuestTuesday';
import DailyQuestWednesday from './Components/QuestInfo/DailyQuestWednesday';
import DailyQuestThursday from './Components/QuestInfo/DailyQuestThursday';
import DailyQuestFriday from './Components/QuestInfo/DailyQuestFriday';
import DailyQuestSaturday from './Components/QuestInfo/DailyQuestSaturday';
import DailyQuestSunday from './Components/QuestInfo/DailyQuestSunday';

// Donation Components
import DonationInformation from './Components/Donation/DonationInformation';
import RetailDonation from './Components/Donation/RetailDonation';
import SeassonPassDonation from './Components/Donation/SeassonPassDonation';
import PackageDonation from './Components/Donation/PackageDonation';
import HowToDonation from './Components/Donation/HowToDonation';
import ServiceDonation from './Components/Donation/ServiceDonation/ServiceDonation';
import TabGemstone from './Components/Donation/ServiceDonation/TabGemstone';


// Other
import Dashboard from './Page/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import TabResources from './Components/Donation/ServiceDonation/TabResources';

function App() {
  return (
    <Routes>
      {/* Redirect root to /admin */}
      <Route path="/" element={<Navigate to="/admin" />} />

      {/* Dashboard layout as base route */}
      <Route path="/admin" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="table-list/users" element={<UsersTable />} />

        {/* Game Info with nested routes */}
        <Route path="table-list/game-info">
          <Route path="game-data" element={<GameInformation />} />

          {/* This <Route index> will render if the path is exactly /admin/table-list/game-info
              and no other child routes match. If GameInformation is meant to be the default,
              you can remove this Navigate and perhaps put GameInformation as index.
              For now, keeping it as is as a fallback. */}
          <Route index element={<Navigate to="/admin" replace />} />
          
          <Route path="server-rules" element={<ServerRules />} />

          {/* Server Info Sub-routes */}
          <Route path="server-info">
            <Route path="featureinfo">
              <Route path="pendant-information" element={<PendantInformation />} />
              <Route path="gem-information" element={<GemInformation />} />
            </Route>
            <Route path="npclist">
              <Route path="racehqnpc" element={<RaceHqNpc />} />
              <Route path="elanplateaunpc" element={<ElanPlateauNpc />} />
              <Route path="settedessertnpc" element={<SetteDessertNpc />} />
              <Route path="volcaniccauldronnpc" element={<VolcanicCauldronNpc />} />
            </Route>
            <Route path="droplist">
              <Route path="droponhq" element={<DropOnHq />} />
              <Route path="cragmine" element={<Cragmine />} />
              <Route path="elanplateau" element={<ElanPlateau />} />
              <Route path="elfland" element={<ElfLand />} />
              <Route path="etherplatform" element={<EtherPlatform />} />
              <Route path="outcastland" element={<OutcastLand />} />
              <Route path="pitbossdrop" element={<PitbossDrop />} />
              <Route path="settedesert" element={<SetteDesert />} />
              <Route path="volcaniccauldron" element={<VolcanicCauldron />} />
            </Route>
            <Route path="GeneralInfo">
              <Route path="feature-disable" element={<FeaturesDisable />} />
              <Route path="feature-enable" element={<FeaturesEnable />} />
            </Route>
          </Route>

          {/* Quest Info Sub-routes */}
          <Route path="quest-info">
            <Route path="dailyquestafterwar" element={<DailyQuestAfterWar />} />
            <Route path="dailyquestmonday" element={<DailyQuestMonday />} />
            <Route path="dailyquesttuesday" element={<DailyQuestTuesday />} />
            <Route path="dailyquestwednesday" element={<DailyQuestWednesday />} />
            <Route path="dailyquestthursday" element={<DailyQuestThursday />} />
            <Route path="dailyquestfriday" element={<DailyQuestFriday />} />
            <Route path="dailyquestsaturday" element={<DailyQuestSaturday />} />
            <Route path="dailyquestsunday" element={<DailyQuestSunday />} />
          </Route>

          {/* Map Info Dynamic Route */}
          <Route path="mapinfo/by-number/:mapNumber" element={<MapInfo />} />
        </Route>

        {/* Donation Info with nested routes */}
        <Route path="table-list/donation">
          <Route path="service">
            <Route path="services" element={<ServiceDonation />} />
            <Route path="gemstone" element={<TabGemstone />} />
            <Route path="resources" element={<TabResources />} />
          </Route>
          <Route path="donation-info" element={<DonationInformation />} />
          <Route path="retail" element={<RetailDonation />} />
          <Route path="seassonpass" element={<SeassonPassDonation />} />
          <Route path="package" element={<PackageDonation />} />
          <Route path="howto" element={<HowToDonation />} />
        </Route>
      </Route> {/* End of DashboardLayout routes */}

      {/* Fallback for 404 */}
      <Route path="*" element={<h4 className="text-center mt-5">Halaman Tidak Ditemukan</h4>} />
    </Routes>
  );
}

export default App;