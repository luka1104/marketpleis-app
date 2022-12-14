import React, { useContext } from 'react'
import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Text,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useSession, signIn, signOut } from "../../sdk/next-auth/react"
import Router from 'next/router'

const Navbar = () => {
    const { data: session } = useSession();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Box><Text>Market Preis</Text></Box>

                <Flex alignItems={'center'}>
                <Stack direction={'row'} spacing={7}>
                    {session ? (
                        <Button onClick={() => {
                            signOut()
                            Router.push('/signin')
                        }}>
                            SignOut
                        </Button>
                    ) : (
                        <Button onClick={() => {signIn()}}>
                            SignIn
                        </Button>
                    )}
                    <Button onClick={toggleColorMode}>
                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    </Button>
                </Stack>
                </Flex>
            </Flex>
            </Box>
        </>
    );
}

export default Navbar;
