// this file is for displaying all users and selected user

import React from 'react';
import UseConversation from '../../zustand/UseConversation';
import { useSocketContext } from '../../context/SocketContext';

function User({ user }) {
  // Use Zustand to manage global state
  const { selectedConversation, setSelectedConversation } = UseConversation();

  // Check if the current user is selected
  const isSelected = selectedConversation?._id === user._id;

  const {socket,onlineUsers} = useSocketContext()
  const isOnline = onlineUsers.includes(user._id)
  

  return (
    <div
      className={`${isSelected ? "bg-slate-400" : ""}`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className='flex px-8 py-3 space-x-4 duration-300 rounded-md cursor-pointer hover:bg-slate-400'>
        <div className={`avatar ${isOnline?"online":""}`}>
          <div className="w-12 rounded-full">
            <img src="https://i.pinimg.com/736x/90/d1/ac/90d1ac48711f63c6a290238c8382632f.jpg" alt="User Avatar" />
          </div>
        </div>
        <div>
          <h1 className='font-bold'>{user.fullname}</h1>
          {/* <span>{user.email}</span> */}
          <span className='font-semibold'>Say Hi</span>
        </div>
      </div>
    </div>
  );
}

export default User;
