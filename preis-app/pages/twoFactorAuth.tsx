import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

const twoFactorAuth = () => {
    const { data: session } = useSession()
    if (session) {
      return (
        <>
          Signed in as {session.user?.name}<br />
          <button onClick={() => signOut()}>Sign out</button>
          Phone
          <input type="text" />
        </>
      )
    }
    return (
        <>
            Invalid access <br />
        </>
    )
}

export default twoFactorAuth
