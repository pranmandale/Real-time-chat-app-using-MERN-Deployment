import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import UseGetAllUsers from '../../context/UseGetAllUsers';
import UseConversation from '../../zustand/UseConversation';
import toast from 'react-hot-toast';

function Search() {

  const [search,setSearch] = useState("");
  const [allUsers] = UseGetAllUsers();
  const {setSelectedConversation} = UseConversation();
  
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent browser refresh
    if(!search) return;
    
    const conversation = allUsers.find((user) => 
      user.fullname.toLowerCase().includes(search.toLowerCase()))
    
    if(conversation) {
      setSelectedConversation(conversation);
      setSearch(""); // Clear the search input after successful search
    } else {
      toast.error("User not found");
      setSearch(""); // Clear the input even if no user is found
    }
  }

  return (
   <div className='h-[10vh]'>
       <div className='px-5 py-4'>
      <form onSubmit={handleSubmit}>
        <div className='flex space-x-3'>
          <label className="border-[1px] border-gray-700 bg-slate-300 rounded-lg p-3 flex items-center gap-2 w-[90%]">
            {/* Apply a consistent background color and text color to the input field */}
            <input 
              type="text" 
              className="text-gray-700 placeholder-gray-500 bg-transparent outline-none grow" 
              placeholder="Search" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <button type="submit">
            <FaSearch className='p-2 text-5xl duration-200 rounded-full hover:bg-gray-400' />
          </button>
        </div>
      </form>
    </div>
   </div>
  )
}

export default Search
