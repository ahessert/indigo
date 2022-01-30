import React from 'react';
import { Routes as ReactRoutes, Route, Navigate } from 'react-router-dom';
import Home from './views/Home';
import Market from './views/Market';

const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<Home  />} />
      <Route path="/developers" element={<Home/>} />
      <Route path="/market" element={<Market/>} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </ReactRoutes>
  );
};

export default Routes;
