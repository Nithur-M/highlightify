import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
}

const customTheme = extendTheme({ 
  styles: {
    global: {
      // styles for the `body`
      body: {
        width: 'sm',
        minH: '12em',
        p: '4',
        bgGradient: 'linear(to-br, #d4e9bc, #f2f5c0)'
      },
    }
  },
  colors: {
    brand: {
      500: '#0eaf1b'
    }
  }
  ,config });

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
