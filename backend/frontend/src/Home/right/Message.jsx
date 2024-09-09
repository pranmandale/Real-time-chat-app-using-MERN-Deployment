// import React from 'react'

// function Message({ message }) {
//   const authUser = JSON.parse(localStorage.getItem("ChatApp"))
//   const Itsme = message.senderId === authUser.user._id;

//   const chatName = Itsme?"chat-end": "chat-start"
//   const chatColor = Itsme?"bg-blue-900":"bg-gray-600"
  
//   console.log(Itsme)

//   const createdAt = new Date(message.createdAt);
//   const formatedTime = createdAt.toLocaleTimeeString{[].{
//     hour: '2-digit',
//     minute: '2-digit'
//   }}
//   return (
//     <div>
//       <div className='p-4'>
//         <div className={`chat ${chatName}`}>
//           <div className={`chat-bubble ${chatColor}`}>{message.message}</div>
//         </div>        
//       </div>
//     </div>
//   )
// }

// export default Message



import React from 'react';

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const Itsme = message.senderId === authUser.user._id;

  // Dynamically set the chat alignment and color based on sender
  const chatName = Itsme ? "chat-end" : "chat-start";
  const chatColor = Itsme ? "bg-blue-900" : "bg-gray-600";

  // Convert the message timestamp to a human-readable format
  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div>
      <div className='p-4'>
        <div className={`chat ${chatName}`}>
          <div className={`chat-bubble ${chatColor}`}>
            {message.message}
          </div>
          <div className="chat-footer text-xs text-gray-600 mt-1">
            {formattedTime}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
