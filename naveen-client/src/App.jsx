import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Toaster } from 'sonner';
import './css/style.css';

import './charts/ChartjsConfig';
import MainLayout from './layout/MainLayout';

// Import pages

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <MainLayout />
      <Toaster />
    </>
  );
}

export default App;
