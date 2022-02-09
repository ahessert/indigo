import React from 'react';
import { Routes as ReactRoutes, Route, Navigate } from 'react-router-dom';
import Home from './views/Home';
import Market from './views/Market';
import DisplayData from './views/DisplayData';
import Developer from './views/Developer';

const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<Home  />} />
      <Route path="/developer" element={<Developer/>} />
      <Route path="/market" element={<Market/>} />
      <Route path="/data" element={<DisplayData/>} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </ReactRoutes>
  );
};

export default Routes;
