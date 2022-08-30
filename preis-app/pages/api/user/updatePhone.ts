import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const resp = await prisma.user.update({
        where: {
          email: req.body.email,
        },
        data: {
          mobile: req.body.mobile,
        },
    });
    if(resp) {
        res.status(200)
    } else {
        res.status(500)
    }
};
export default handler;