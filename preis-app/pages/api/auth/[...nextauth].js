import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from '@prisma/client'
import EmailProvider from 'next-auth/providers/email';
import { redirect } from "next/dist/server/api-utils"

const prisma = new PrismaClient()

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
            async generateVerificationToken() {
                return "123456"
            }
        }),
    ],
    // pages: {
    //     verifyRequest: '/twoFactorAuth'
    // },
    callbacks: {
        async session({ session, user, token }) {
          session.user.id = user.id;
          return session;
        },
    },
    secret: 'secret',
}

export default NextAuth(authOptions)