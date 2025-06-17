import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout & Pages
import DashboardLayout from './Components/DashboardLayout';
import Dashboard from './Page/Dashboard';

// Tables
import UsersTable from './Components/UserTable';
import ServerRules from './Components/GameInfo/ServerRules';
import MapInfo from './Components/MapInfo/MapInfo';

// Feature Info
import PendantInformation from './Components/ServerInfo/FeatureInformation/PendantInformation';
import GemInformation from './Components/ServerInfo/FeatureInformation/GemInformation';

// NPC & Drop
import NpcList from './Components/ServerInfo/NPCList/NpcList';
import DropList from './Components/ServerInfo/DropList/DropList';
import ItemsInfo from './Components/GameInfo/ItemsInfo';

// General Info
import ServersInformation from './Components/ServerInfo/GeneralInfo/ServersInformation';
import SystemInformation from './Components/ServerInfo/GeneralInfo/SystemInformation';
import FeaturesDisable from './Components/ServerInfo/GeneralInfo/FeaturesDisable';
import FeaturesEnable from './Components/ServerInfo/GeneralInfo/FeaturesEnable';

// Quest Info
import DailyQuestAfterWar from './Components/QuestInfo/DailyQuestAfterWar';
import DailyQuest from './Components/QuestInfo/DailyQuest';

// Donation
import RetailDonation from './Components/Donation/RetailDonation';
import SeassonPassDonation from './Components/Donation/SeassonPassDonation';
import HowToDonation from './Components/Donation/HowToDonation';
import ServiceDonation from './Components/Donation/ServiceDonation/ServiceDonation';
import TabGemstone from './Components/Donation/ServiceDonation/TabGemstone';
import TabResources from './Components/Donation/ServiceDonation/TabResources';

import PackagesInfo from './Components/PackagesInfo';
import PackageCategoryInfo from './Components/PackageCategoryInfo';
import PackageBonusInfo from './Components/PackageBonusInfo';
import ItemPackageBonusInfo from './Components/ItemPackageBonusInfo';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />

      <Route path="/admin" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="table-list/users" element={<UsersTable />} />

        <Route path="table-list/game-info">
          <Route path="items" element={<ItemsInfo />} />
          <Route path="server-rules" element={<ServerRules />} />
          <Route path="mapinfo" element={<MapInfo />} />

          <Route path="server-info">
            <Route path="npclist" element={<NpcList />} />
            <Route path="droplist" element={<DropList />} />

            <Route path="featureinfo">
              <Route path="pendant-information" element={<PendantInformation />} />
              <Route path="gem-information" element={<GemInformation />} />
            </Route>

            <Route path="GeneralInfo">
              <Route path="systeminfo" element={<SystemInformation />} />
              <Route path="serversinfo" element={<ServersInformation />} />
              <Route path="feature-disable" element={<FeaturesDisable />} />
              <Route path="feature-enable" element={<FeaturesEnable />} />
            </Route>
          </Route>

          <Route path="quest-info">
            <Route path="dailyquestafterwar" element={<DailyQuestAfterWar />} />
            <Route path="dailyquest" element={<DailyQuest />} />
          </Route>
        </Route>

        <Route path="table-list/donation">
          <Route path="service">
            <Route path="services" element={<ServiceDonation />} />
            <Route path="gemstone" element={<TabGemstone />} />
            <Route path="resources" element={<TabResources />} />
          </Route>
          <Route path="retail" element={<RetailDonation />} />
          <Route path="seassonpass" element={<SeassonPassDonation />} />
          <Route path="packages" element={<PackagesInfo />} />
          <Route path="howto" element={<HowToDonation />} />
          <Route path='package-categories' element={<PackageCategoryInfo />} />
          <Route path='package-bonuses' element={<PackageBonusInfo />} />
          <Route path='item-package' element={<ItemPackageBonusInfo />} />

        </Route>
      </Route>

      <Route path="*" element={<h4 className="text-center mt-5">Halaman Tidak Ditemukan</h4>} />
    </Routes>
  );
}

export default App;
