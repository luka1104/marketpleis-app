import React, { useState, useEffect } from 'react'
import type { GetServerSideProps } from "next";
import {
    PinInput,
    PinInputField,
    HStack,
    useColorModeValue,
    Box,
    Text,
    Stack,
} from '@chakra-ui/react'
import prisma from '../lib/prisma'
import Navbar from '../src/components/navbar'
import { useRouter } from 'next/router'

type Props = {
    token: any;
};
export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const verificationToken = await prisma.verificationToken.findMany()
    const token = JSON.parse(JSON.stringify(verificationToken))
    console.log(token);
    return {
      props: {
        token,
      },
    };
}

const VerifyEmailCode = (props: any) => {
    const router = useRouter();
    const isReady = router.isReady;
    const [value, setValue] = useState('')
    const handlePinChange = (value: string) => {
        setValue(value)
    }
    const handleOTP = async (value: string) => {
        router.push(`/api/auth/callback/email?callbackUrl=${process.env.NEXTAUTH_URL}/mypage&token=${value}&email=${router.query.email}`)
    }
    console.log(props.token);
    useEffect(() => {
        //@ts-ignore
        const token = props.token.find(e => e.identifier === router.query.email)
        if(router.query.email !== token?.identifier && isReady || !router.query.email && isReady) {
            router.push('/signin')
        }
    }, [])
    return (
        <>
            <Navbar />
            <Box
              bg={useColorModeValue('gray.100', 'gray.900')}
              w={{ base: '90%', md: '60%', lg: '40%' }}
              ml="auto"
              mr="auto"
              mt="50px"
              borderRadius="10px"
            >
              <Stack spacing={4} p="3%">
              <Text
                fontSize="25px"
                fontWeight="bolder"
                textAlign={'center'}
              >
                Check your email for a code
              </Text>
              <Text textAlign="center">We’ve sent a 6-character code to</Text>
              <Text fontWeight="medium" as="span" textAlign="center">{router.query.email}</Text>
              <Text as="span" textAlign="center">The code expires shortly, so please enter it soon.</Text>
                <HStack alignSelf={'center'}>
                    <PinInput
                      value={value}
                      onChange={handlePinChange}
                      onComplete={handleOTP}
                      size='lg'
                    >
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                    </PinInput>
                </HStack>
                <Text fontSize="13px" textAlign="center">
                  Can’t find your code? Check your spam folder!
                </Text>
              </Stack>
            </Box>

        </>
    )
}

export default VerifyEmailCode
