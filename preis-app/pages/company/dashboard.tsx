import React, { useContext } from 'react'
import Navbar from '../../src/components/navbar'
import AddItems from '../../src/components/company/addItems'
import type { GetServerSideProps } from "next";
import prisma from '../../lib/prisma'
import { UserContext } from '../../src/contexts/userContext';
import { useSession } from "../../sdk/next-auth/react"

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

const Dashboard = (props: any) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { data: session, status } = useSession();

  if(status) {
    //@ts-ignore
    const user = props.users.find(u => u.email === session?.user?.email)
    console.log(props.users);
    console.log(user);
    if(!currentUser) {
      setCurrentUser(user);
    }
  }
  return (
    <div>
      <Navbar />
      dashboard
      <AddItems />
    </div>
  )
}

export default Dashboard
