import React, { useEffect } from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import ModernPortfolio from './components/ModernPortfolio';
import theme from './theme';
import { initGA, logPageView } from './utils/analytics';

function App() {
  useEffect(() => {
    // Initialize Google Analytics
    initGA();
    logPageView();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ModernPortfolio />
      <Analytics /> {/* Vercel Analytics */}
    </ChakraProvider>
  );
}

export default App;