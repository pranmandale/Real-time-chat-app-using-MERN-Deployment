import React, { useEffect } from 'react'
import { useSocketContext } from './SocketContext'
import UseConversation from '../zustand/UseConversation.js';

function UseGetSocketMessage() {
    const {socket} = useSocketContext();
    const {messages, setMessage} = UseConversation();

    useEffect(() =>{
        socket.on("newMessage",(newMessage) => {
            setMessage([...messages,newMessage]);        
        }) 
        return () => {
          socket.off("newMessage");
        }
    },[socket,messages,setMessage])
 
}

export default UseGetSocketMessage


