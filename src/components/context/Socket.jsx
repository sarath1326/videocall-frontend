
import { createContext,useMemo } from "react";
import {io} from "socket.io-client"


export const socketContext=createContext(null)



export const SocketProvider=(props)=>{

    const Socket=useMemo(()=>io("https://videocallbackend-pye0.onrender.com"),[])

    return (

         <socketContext.Provider value={{Socket}}>

            {props.children}


         </socketContext.Provider>
    )

     
}