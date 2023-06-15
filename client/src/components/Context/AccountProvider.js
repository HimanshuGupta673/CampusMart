import { createContext, useState } from "react";

export const AccountContext = createContext(null)

const AccountProvider = ({children}) =>{
    const [user,setUser] = useState('');
    return(
         <AccountContext.Provider value={{
            user,
            setUser
         }}>
            {children}
         </AccountContext.Provider>
    )
}
export default AccountProvider