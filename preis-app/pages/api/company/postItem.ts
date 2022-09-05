import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../lib/prisma";
const formidable = require("formidable");

export type ItemData = {
  userId: number;
  title: string;
  price: number;
  quantity: number;
  image: any;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const postItem = async (data: ItemData) => {
    const resp = await prisma.item.create({
      data: {
        userId: data.userId,
        title: data.title,
        price: data.price,
        quantity: data.quantity,
        image: data.image,
      },
    });
    return resp
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm({ multiples: true });
  form.parse(req, async (err: any, fields: any, files: any) => {
    if (err) {
      res.statusCode = 500;
      res.json({
        method: req.method,
        error: err
      });
      res.end();
      return;
    }
    const data = {
      userId: JSON.parse(fields.user_id),
      title: fields.title,
      price: JSON.parse(fields.price),
      quantity: JSON.parse(fields.quantity),
      image: files
    }
    console.log(data);
    const resp = await postItem(data)
    console.log(resp);
    if(resp) {
        res.status(200)
    } else {
        res.status(500)
    }
  });
};
export default handler;
