import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import Page from './components/Page';
import { ContextProvider } from 'context/AppContext';

import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-image-lightbox/style.css';
import 'aos/dist/aos.css';

const App = () => {
  return (
    <Page>
      <ContextProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ContextProvider>
    </Page>
  );
};

export default App;
