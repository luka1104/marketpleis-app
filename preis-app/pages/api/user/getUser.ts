import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from '../auth/[...nextauth]'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getUser = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { email: String(email) },
    });
    return user
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    //@ts-ignore
    const session = await unstable_getServerSession(res, req, authOptions)
    console.log(session);
    const user = getUser(req.body.email)
    if(user) {
        // console.log(user);
        res.status(200).json({ data: user })
    } else {
        res.status(500)
    }
};
export default handler;