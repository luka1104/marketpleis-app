import React, { useState } from 'react'
import type { GetServerSideProps } from "next";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import { getRequestInstance } from "../modules/request";
import prisma from '../lib/prisma'

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
    if(!props?.user?.mobile) {
      console.log("no mobile");
      router.push('/twoFactorAuth')
    }
    return (
      <>
        Signed in as {session.user?.name}<br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
      <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
      </>
  )
}

export default Login
