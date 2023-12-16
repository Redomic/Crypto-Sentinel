import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';

import React from 'react';

import agent from './agent';
import { setNodes } from './store/slices/blockchain';
import { useDispatch, useSelector } from 'react-redux';

import NetworksPage from './Pages/NetworksPage';

import Navbar from './components/Navbar';
import AlertsPage from './Pages/AlertsPage';
import NodePage from './Pages/NodePage';
import NodeGraphPage from './Pages/NodeGraphPage';
import ErrorPage from './Pages/ErrorPage';

export default function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state: any) => state.blockchain);

  React.useEffect(() => {
    if (blockchain.nodes.length === 0) {
      agent.blockchain
        .getNodes()
        .then((res: any) => {
          if (res.data.status === 'success') {
            console.log(res.data);
            dispatch(setNodes(res.data));
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<NetworksPage />} />
        <Route path="/crawler" element={<Navigate to={'/404'} />} />
        <Route path="/node/:id" element={<NodePage />} />
        <Route path="/node/:id/graph" element={<NodeGraphPage />} />
        {/* <Route path="/404" element={<ErrorPage />} /> */}
      </Routes>
    </Router>
  );
}
