import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import "@fontsource/poppins"
import Layout from '../components/layout'

const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
}

const customTheme = extendTheme({ 
  styles: {
    global: {
      // styles for the `body`
      body: {
        
      },
    }
  },
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Poppins, sans-serif'
  },
  colors: {
    brand: {
      
    }
  }
  ,config });

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
