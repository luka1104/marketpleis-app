import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../lib/prisma";

export type ItemData = {
  id: number;
  isPublished: boolean,
};

const publishItem = async (data: ItemData) => {
    const resp = await prisma.item.update({
      where: {
        id: data.id,
      },
      data: {
        isPublished: data.isPublished,
      },
    })
    return resp
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  const data = {
    id: JSON.parse(req.body.id),
    isPublished: req.body.isPublished,
  }
  const resp = await publishItem(data)
  console.log(resp);
  if(resp) {
      res.status(200)
  } else {
      res.status(500)
  }
};
export default handler;
