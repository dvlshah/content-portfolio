import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'light' ? 'white' : 'gray.900',
        color: props.colorMode === 'light' ? 'gray.900' : 'white',
      },
    }),
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'blackAlpha',
      },
      variants: {
        solid: (props) => ({
          bg: props.colorMode === 'light' ? 'black' : 'white',
          color: props.colorMode === 'light' ? 'white' : 'black',
          _hover: {
            bg: props.colorMode === 'light' ? 'gray.800' : 'gray.100',
          },
        }),
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: 'none',
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          _hover: {
            transform: 'translateY(-4px)',
          },
          transition: 'transform 0.2s',
        },
      },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

export default theme;