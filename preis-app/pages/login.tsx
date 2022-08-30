import React, { useState } from 'react'
import type { GetServerSideProps } from "next";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import prisma from '../lib/prisma'
import { 
  Input,
  Button
} from '@chakra-ui/react'
import Navbar from '../src/components/navbar'

type Props = {
  user: any;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const user = await prisma.user.findMany()
  console.log(user);
  return {
    props: {
      user,
    },
  };
}
const Login = (props: any) => {
  const [user, setUser] = useState(null)
  const { data: session } = useSession()
  //@ts-ignore
  const currentUser = props.user.find(e => e.email === session?.user?.email)
  console.log(currentUser);
  console.log(props.user);
  const router = useRouter();
  if (session) {
    if(!currentUser.mobile) {
      console.log("no mobile");
      router.push('/twoFactorAuth')
    } else {
      router.push('/mypage')
    }
    return (
      <>
        <Navbar />
      </>
    )
  }
  return (
      <>
          <Navbar />
      </>
  )
}

export default Login
