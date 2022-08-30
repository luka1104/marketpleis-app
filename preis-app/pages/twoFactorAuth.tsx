import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { 
    PinInput,
    PinInputField,
    HStack,
} from '@chakra-ui/react'
import axios from 'axios'
import Navbar from '../src/components/navbar'
import { useRouter } from 'next/router'

const twoFactorAuth = () => {
    const router = useRouter();
    const [value, setValue] = useState('')
    const handlePinChange = (value: string) => {
        setValue(value)
    }
    const handleOTP = async (value: string) => {
        console.log(value);
        router.push(`/api/auth/callback/email?callbackUrl=${process.env.NEXTAUTH_URL}/mypage&token=${value}&email=${router.query.email}`)
    }
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

export default twoFactorAuth
