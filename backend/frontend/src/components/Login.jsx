import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function Login() {

    const [show, setShow] = useState(false)
    const [ authUser, setAuthUser] = useAuth();

   
    
    const {
        register,
        handleSubmit,
   
        formState: { errors },
    } = useForm();
    
    const onSubmit = async (data) => {
        console.log("Form Data:", data); // Debugging line to check form data

        const UserInfo = {
            email: data.email,
            password: data.password,
        };

        
        try {
            // const response = await axios.post('http://localhost:3000/user/login', UserInfo);
            const response = await axios.post('/api/user/login', UserInfo);
            console.log("Response data:", response.data); // Debugging line to check response data
            // alert("Login successful");
            toast.success("Login successful");
            localStorage.setItem("ChatApp", JSON.stringify(response.data));
            setAuthUser(response.data)
        } catch (error) {
            console.error("Error details:", error); // Detailed error logging
            if (error.response) {
                // Server responded with a status other than 200 range
                // alert("Error: " + (error.response.data.message || 'An error occurred'));
                alert("error: "+ error.response.data.error)
            } else if (error.request) {
                // Request was made but no response was received
                // alert("No response from server. Please try again later.");
                toast.error("No response from server. Please try again later.");
            } else {
                // Something else happened while setting up the request
                toast.error(`Error: ${error.message}`);
            }
        }

    };
    const showPassword = () => setShow((prevState) => !prevState);
    return (
        <>

            <div className='flex items-center justify-center h-screen '>
                <form 
                onSubmit={handleSubmit(onSubmit)}
                 className='border border-gray-700 px-6 py-2 rounded space-y-3 w-[400px] h-[330px]'>
                    <h1 className='mt-2 text-2xl text-center'>Chat
                 <span className='font-bold text-yellow-800'>App</span></h1>
                    <h2 className='text-xl font-bold text-gray-700'>Login</h2>
                    <br/>
                    {/* usernamame */}
                   

                    {/* email */}
                    <label className="flex items-center gap-2 input input-bordered">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input type="text" className="grow" placeholder="Email"
                        {...register("email", { required: "Email is required" })} 
                         />
                    </label>
                    {errors.email && <span className='text-sm text-red-500'>{errors.email.message}</span>}


                    {/* password */}
                    <label className="flex items-center gap-2 input input-bordered">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd" />
                        </svg>
                        {/* <input type="password" className="grow" placeholder="Password" */}
                         <input type={show? "text":"password"} className="grow" placeholder="Password"
                        {...register("password", { required: "Password is required" })} 
                         />
                          <button
                          className='font-semibold '
                        type='button'
                        onClick={showPassword}
                    >
                     {show?"Hide":"Show"}   
                    </button>
                    </label>
                   
                    {errors.password && <span className='text-sm text-red-500'>{errors.password.message}</span>}
                    
                    {/* text and signup button */}
                    <div className='flex justify-between'>
                        <p>Dont have an account?
                        <Link to={'/signup'} className='ml-1 text-orange-600 underline cursor-pointer'>Signup</Link>
                        </p>
                        <input type='submit' value='Login' className='px-3 px-4 py-1 py-2 text-white bg-green-500 rounded-lg cursor-pointer hover:bg-green-400'/>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
