import React from 'react'
import Navbar from '../src/components/navbar'
import ItemCard from '../src/components/itemCard'
import type { GetServerSideProps } from "next";
import prisma from '../lib/prisma'
import {
  Grid,
} from '@chakra-ui/react'

type Props = {
  items: any;
};
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const itemsRaw = await prisma.item.findMany({
    where: {
      isPublished: true,
    }
  })
  const items = JSON.parse(JSON.stringify(itemsRaw))
  return {
    props: {
      items,
    },
  };
}

const Items = (props: any) => {
  return (
    <div>
      <Navbar />
      items
      <Grid gridTemplateColumns={{sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)'}} gap={6}>
        {props.items.map((val: any, key: any) => {
          return (

            <ItemCard
              item={val}
              key={key}
            />
          )
        })}
      </Grid>
    </div>
  )
}

export default Items
