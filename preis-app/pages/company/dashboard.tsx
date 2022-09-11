import React, { useContext } from 'react'
import Navbar from '../../src/components/navbar'
import AddItems from '../../src/components/company/addItems'
import PostedItem from '../../src/components/company/postedItem'
import type { GetServerSideProps } from "next";
import prisma from '../../lib/prisma'
import { UserContext } from '../../src/contexts/userContext';
import { useSession } from "../../sdk/next-auth/react"
import {
  Grid,
} from '@chakra-ui/react'

type Props = {
  users: any;
  items: any;
};
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const usersRaw = await prisma.user.findMany()
  const users = JSON.parse(JSON.stringify(usersRaw))
  console.log(users);
  const itemsRaw = await prisma.item.findMany()
  const items = JSON.parse(JSON.stringify(itemsRaw))
  return {
    props: {
      users,
      items,
    },
  };
}

const Dashboard = (props: any) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { data: session, status } = useSession();

  if(status) {
    //@ts-ignore
    const user = props.users.find(u => u.email === session?.user?.email)
    // console.log(props.users);
    //@ts-ignore
    const items = props.items.filter(i => i.userId === session?.user?.id)
    // console.log(items);
    // console.log(session);
    // console.log(props.items);
    if(!currentUser) {
      setCurrentUser(user);
    }
    return (
      <div>
        <Navbar />
        dashboard
        <AddItems />
        <Grid gridTemplateColumns={{sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)'}} gap={6}>
          {//@ts-ignore
          items.map((val: any, key: any) => {
            return (
              <PostedItem
                item={val}
                key={key}
              />
            )
          })}
        </Grid>
      </div>
    )
  }
  return (
    <div>
      <Navbar />
      dashboard
      <AddItems />
      {/* {//@ts-ignore
      items.map((val: any, key: any) => {
        return (
          <PostedItem
            item={val}
            key={key}
          />
        )
      })} */}
    </div>
  )
}

export default Dashboard
