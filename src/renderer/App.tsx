import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import NetworksPage from './Pages/NetworksPage';

import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<NetworksPage />} />
      </Routes>
    </Router>
  );
}
