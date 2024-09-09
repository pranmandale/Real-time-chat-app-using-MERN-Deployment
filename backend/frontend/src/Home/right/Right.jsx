import React, { useEffect } from 'react';
import ChatUser from './ChatUser';
import Messages from './Messages';
import TypeSend from './TypeSend';
import UseConversation from '../../zustand/UseConversation.js';
import { useAuth } from '../../context/AuthProvider.jsx';
import { CiMenuFries } from "react-icons/ci";


function Right() {
  const { selectedConversation, setSelectedConversation } = UseConversation();

  useEffect(() => {
    setSelectedConversation(null); // Reset on mount
    return () => setSelectedConversation(null);  // Reset on unmount (if needed)
  }, [setSelectedConversation]);

  return (
    <div className='w-full bg-blue-200 text-gray-700 flex flex-col h-full'>
      {
        !selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <ChatUser />
            <div
              className='flex-1 overflow-y-auto custom-scroll'
              style={{ maxHeight: "calc(92vh - 12vh)" }}
            >
              <Messages />
            </div>
            <TypeSend />
          </>
        )
      }
    </div>
  );
}

export default Right;



const NoChatSelected = () => {
  const [authUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="relative">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <CiMenuFries className="text-gray-700 text-xl" />
          Contacts
        </label>
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-center">
            Welcome{" "}
            <span className="font-semibold text-xl">
              {authUser.user.fullname}
            </span>
            <br />
            {/* No chat selected, please start conversation by selecting anyone to
            your contacts */}
            Please select chat to start conversation
          </h1>
        </div>
      </div>
    </>
  );
};