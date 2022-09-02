import React, { useState, useEffect } from 'react'
import type { GetServerSideProps } from "next";
import {
    PinInput,
    PinInputField,
    HStack,
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
            <HStack>
                <PinInput value={value} onChange={handlePinChange} onComplete={handleOTP}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                </PinInput>
            </HStack>
        </>
    )
}

export default VerifyEmailCode
