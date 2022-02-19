import React from 'react';
import { Routes as ReactRoutes, Route, Navigate } from 'react-router-dom';
import Market from './views/Market';
import DisplayData from './views/DisplayData';
import Developer from './views/Developer';
import ModelPreview from './views/ModelPreview';
import Airdrop from './views/Airdrop';
import Mint from './views/Mint';


const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<Market/>} />
      <Route path="/developer" element={<Developer/>} />
      <Route path="/market/:id" element={<ModelPreview/>} />
      <Route path="/airdrop" element={<Airdrop />} />
      <Route path="/mint" element={<Mint />} />
      <Route path="/data" element={<DisplayData/>} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </ReactRoutes>
  );
};

export default Routes;
