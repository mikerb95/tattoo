import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import { PortfolioPage, ArtistPage } from './pages/Portfolio';
import ServicesPage from './pages/Services';
import { BiosafetyPage, AftercarePage } from './pages/Biosafety';
import {
  CrmDashboardPage,
  CrmAgendaPage,
  CrmClientsPage,
  CrmConsentPage,
  CrmHealingPage,
} from './pages/CrmDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portafolio" element={<PortfolioPage />} />
        <Route path="/portafolio/artista" element={<ArtistPage />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/bioseguridad" element={<BiosafetyPage />} />
        <Route path="/aftercare" element={<AftercarePage />} />
        <Route path="/crm" element={<CrmDashboardPage />} />
        <Route path="/crm/agenda" element={<CrmAgendaPage />} />
        <Route path="/crm/clientes" element={<CrmClientsPage />} />
        <Route path="/crm/consentimientos" element={<CrmConsentPage />} />
        <Route path="/crm/curacion" element={<CrmHealingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
