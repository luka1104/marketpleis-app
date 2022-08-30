import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { 
    Input,
    Button
} from '@chakra-ui/react'
import Navbar from '../src/components/navbar'

const mypage = () => {
    const { data: session } = useSession()
    return (
        <>
            <Navbar />
            MyPage!!
            Signed in as {session?.user?.email}<br />
        </>
    )
}

export default mypage
