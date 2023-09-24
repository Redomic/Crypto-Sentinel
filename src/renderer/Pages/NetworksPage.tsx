import React from 'react';

import InfiniteStage from '../components/InfiniteStage';
import NodeInformation from '../components/NodeInformation';

import './NetworksPage.css';

const [CRIMINAL, SUSPICIOUS, NORMAL, OFFICIAL] = [
  '#BC3326',
  '#CE762A',
  '#9ABB53',
  '0070D8',
];

const NetworksPage = () => {
  return (
    <>
      <div className="search-bar-container">
        <div className="search-bar">
          <input type="text" placeholder="Search for wallets" />
        </div>
      </div>
      <NodeInformation />
      <InfiniteStage />
    </>
  );
};

export default NetworksPage;
