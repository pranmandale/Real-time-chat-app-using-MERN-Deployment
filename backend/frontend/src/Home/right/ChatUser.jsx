
import React from "react";
import useConversation from "../../zustand/UseConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  // Placeholder or fallback avatar image
  const defaultAvatar = "https://i.pinimg.com/736x/90/d1/ac/90d1ac48711f63c6a290238c8382632f.jpg";

  const isOnline = getOnlineUsersStatus(selectedConversation._id) === "Online";

  return (
    <div className="relative flex items-center px-6 py-2 h-[10%] justify-start gap-3 bg-blue-300 cursor-pointer border-b-[1px] border-gray-200">
      {/* Menu icon (visible on small screens) */}
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden"
      >
        <CiMenuFries className="text-gray-600 text-xl" />
      </label>
      
      {/* Avatar */}
      <div className="relative avatar">
        <div className={`w-12 h-12 rounded-full ${isOnline ? 'ring-2 ring-green-500' : ''}`}>
          {/* Display user's profile image if available, otherwise use the default */}
          <img
            src={selectedConversation?.profileImage || defaultAvatar}
            alt={selectedConversation?.fullname || "User Avatar"}
            className="object-cover rounded-full"
          />
        </div>
        {/* Green dot indicator for online status */}
        {isOnline && (
          <span className="absolute bottom-0 right-0 block w-3 h-3 rounded-full bg-green-500 ring-2 ring-white"></span>
        )}
      </div>

      {/* User details */}
      <div className="text-left">
        <h1 className="text-xl font-bold text-gray-800">
          {selectedConversation.fullname}
        </h1>
        <span className="text-md font-semibold text-gray-700">
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
}

export default Chatuser;
