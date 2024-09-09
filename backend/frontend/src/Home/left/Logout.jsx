import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import axios from 'axios';
import Cookies from 'js-cookie'
import toast from 'react-hot-toast';

function Logout() {
  const [loading, setLoading] = useState(false);
  const handleLogout = async() =>{
    setLoading(true)
    try {
      const res = await axios.post('/api/user/logout')
      localStorage.removeItem('ChatApp');
      Cookies.remove('jwt')
      setLoading(false)
      toast.success("logout successful")
      window.location.reload();
    } catch (error) {
      console.log("Error : error in logout", error)
    }
  }
  return (
    <div className='h-[10vh] bg-slate-500 rounded-md'>
       <div>
       <BiLogOutCircle className='flex justify-center text-6xl hover:bg-slate-400 duration-200 cursor-pointer rounded-full p-2 ml-1 '
        onClick={handleLogout}
       />
       </div>
    </div>
  )
}

export default Logout
