import React, { useState } from 'react';
import { useSession } from "../../sdk/next-auth/react"

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
      {children}
    </UserContext.Provider>
  );
};
