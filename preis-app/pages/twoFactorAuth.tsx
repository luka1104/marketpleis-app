import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { 
    Input,
    Button,
    Text,
    Link,
} from '@chakra-ui/react'
import Navbar from '../src/components/navbar'

const twoFactorAuth = () => {
    const { data: session } = useSession()
    const [mobile, setMobile] = useState('')
    const handlePhoneChange = (e: any) => {
        const val = e.target.value;
        setMobile(val);
    }
    const handleSubmit = async () => {
        console.log(mobile);
        const data = {
            'email': session?.user?.email,
            'mobile': mobile
        }
        await fetch('/api/user/updatePhone', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(resp => {
            console.log(resp);
        })
        .catch(e => {
            console.log(e);
        })
    }
    if (session) {
        return (
            <>
                <Navbar />
                Signed in as {session.user?.name}<br />
                <Button onClick={() => signOut()}>Sign out</Button>
                Phone
                <Input 
                    w="50%"
                    type="tel"
                    onChange={(e) => {handlePhoneChange(e)}}
                />
                <Button onClick={handleSubmit}>Submit</Button>
            </>
        )
    } 
    {
        return (
            <>
                <Navbar />
                <Text>Invalid access</Text> <br />
                <Link href="/login">Go back to Login</Link>
            </>
        )
    }
}

export default twoFactorAuth
