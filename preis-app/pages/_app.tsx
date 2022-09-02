import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from '../sdk/next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp
