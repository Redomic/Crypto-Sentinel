import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import InfiniteStage from './components/InfiniteStage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InfiniteStage />} />
      </Routes>
    </Router>
  );
}
