import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import ModernPortfolio from './components/ModernPortfolio';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ModernPortfolio />
    </ChakraProvider>
  );
}

export default App;