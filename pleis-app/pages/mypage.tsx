import React, { useContext } from 'react'
import type { GetServerSideProps } from "next";
import { useRouter,  } from 'next/router'
import prisma from '../lib/prisma'
import { useSession, signIn, signOut } from "../sdk/next-auth/react"
import {
    Input,
    Button
} from '@chakra-ui/react'
import Navbar from '../src/components/navbar'
import { UserContext } from '../src/contexts/userContext';

type Props = {
  users: any;
};
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const usersRaw = await prisma.user.findMany()
  const users = JSON.parse(JSON.stringify(usersRaw))
  console.log(users);
  return {
    props: {
      users,
    },
  };
}

const Mypage = (props: any) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const router = useRouter();
  const isReady = router.isReady;
  const { data: session, status } = useSession();

  if(status === 'loading') {
    return (
      <>
          <Navbar />
          <p>loading</p>
      </>
    )
  }
  if(status === "unauthenticated") {
    return (
      <>
        <Navbar />
        <p>Access Denied</p>
      </>
    )
  }
  //@ts-ignore
  const user = props.users.find(u => u.email === session?.user?.email)
  console.log(props.users);
  console.log(user);
  if(!currentUser) {
    setCurrentUser(user);
  }
  if(user?.isCompany) {
    router.push('company/dashboard')
  }
  return (
      <>
          <Navbar />
          MyPage!!
          Signed in as {session?.user?.email}<br />
      </>
  )
}

export default Mypage
