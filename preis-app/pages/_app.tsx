import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from '../sdk/next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import { UserProvider } from '../src/contexts/userContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <ChakraProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </ChakraProvider>
      </UserProvider>
    </SessionProvider>
  )
}

export default MyApp
