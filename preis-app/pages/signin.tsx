import { getCsrfToken } from "../sdk/next-auth/react"
import Navbar from '../src/components/navbar'

//@ts-ignore
export default function SignIn({ csrfToken }) {
  return (
    <>
        <Navbar />
        <form method="post" action="/api/auth/signin/email">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <label>
                Email address
                <input type="email" id="email" name="email" />
            </label>
            <button type="submit">Sign in with Email</button>
        </form>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const csrfToken = await getCsrfToken(context)
  return {
    props: { csrfToken },
  }
}
