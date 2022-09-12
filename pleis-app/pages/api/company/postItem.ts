import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../lib/prisma";

export type ItemData = {
  userId: number;
  title: string;
  price: number;
  quantity: number;
  imagePath: string;
};

const postItem = async (data: ItemData) => {
    const resp = await prisma.item.create({
      data: {
        userId: data.userId,
        title: data.title,
        price: data.price,
        quantity: data.quantity,
        imagePath: data.imagePath,
      },
    });
    return resp
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);

  const data = {
    userId: req.body.userId,
    title: req.body.title,
    price: JSON.parse(req.body.price),
    quantity: JSON.parse(req.body.quantity),
    imagePath: req.body.imagePath
  }
  console.log(data);
  const resp = await postItem(data)
  console.log(resp);
  if(resp) {
      res.status(200).json({"message":"Added successfully"})
  } else {
      res.status(500).json({"message":"Sorry, Something went wrong"})
  }
};
export default handler;
