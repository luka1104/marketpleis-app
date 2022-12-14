import NextAuth from "../../../sdk/next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '../../../lib/prisma'
import EmailProvider from '../../../sdk/next-auth/providers/email';
import otpGenerator from 'otp-generator'

const options = {
    adapter: PrismaAdapter(prisma),
    providers: [
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
            async generateVerificationToken() {
                return otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
            },
        }),
    ],
    pages: {
        signIn: '/signin'
    },
    callbacks: {
        async session({session, user}) {
          session = {
              ...session,
              user: {
                  id: user.id,
                  ...session.user
              }
          }
          return session
        }
    },
    secret: 'secret',
}

export default (req, res) => NextAuth(req, res, options)
