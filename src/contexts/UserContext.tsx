import axios from "axios";
import Cookies from "js-cookie";
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useState } from "react";

interface UserContextData {
  userName:string
  getGitUser:() =>void
  setUserName:Dispatch<SetStateAction<string>>
}

interface UserProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextData)

export function UsersProvider({ 
  children,
} : UserProviderProps) {
  const [userName,setUserName] = useState('CHABALU')




   function getGitUser(){
    console.log(userName)
    // try {
    //   await axios.get(`https://api.github.com/users/${userName}`)
    // .then(res => {
    //   const user = res.data;
    //   if (!user){
    //     console.log('deu ruim')
    //   }
    // })
    // } catch (error) {
    //   console.log(error)
    // }
  }
  
  useEffect(() => {
    Cookies.set('userName',userName)
  },[userName]) 
  return(
    <UserContext.Provider value={{
      userName,
      getGitUser,
      setUserName,
    }}>
      {children}
    </UserContext.Provider>
  )
}