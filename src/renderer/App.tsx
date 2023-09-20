import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import NetworksPage from './Pages/NetworksPage';

import Navbar from './components/Navbar';
import AlertsPage from './Pages/AlertsPage';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<NetworksPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
      </Routes>
    </Router>
  );
}
