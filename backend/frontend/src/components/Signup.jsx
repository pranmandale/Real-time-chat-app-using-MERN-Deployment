import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function Signup() {
    
    // State for toggling password visibility
    // this state is for password field
    const [show, setShow] = useState(false);

    // this state is for confirm password
    const [ch, setCh] = useState(false);

    // this usestate is for contextapi       
    const [ authUser, setAuthUser] = useAuth();

    const showPassword = () => setShow(prevState => !prevState);
    const chPassword = () => setCh(prevState => !prevState);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    // Watching the password fields for validation
    const password = watch('password', '');

    // Validate that confirm password matches password
    const validatePasswordMatch = (value) => {
        return value === password || "Passwords do not match";
    };

    const onSubmit = async (data) => {
        console.log("Form Data:", data); // Debugging line to check form data

        const UserInfo = {
            fullname: data.fullname,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword
        };

        try {
            // const response = await axios.post('http://localhost:3000/user/signup', UserInfo);
            const response = await axios.post('/api/user/signup', UserInfo);
            console.log("Response data:", response.data); // Debugging line to check response data
            // alert("Signup successful");
            toast.success("Signup successful");
            localStorage.setItem("ChatApp", JSON.stringify(response.data));
            setAuthUser(response.data)
        } catch (error) {
            console.error("Error details:", error); // Detailed error logging
            if (error.response) {
                // Server responded with a status other than 200 range
                // alert("Error: " + (error.response.data.message || 'An error occurred'));
                toast.error("error: "+ error.response.data.error)
            } else if (error.request) {
                // Request was made but no response was received
                toast.error("No response from server. Please try again later.");
            } else {
                // Something else happened while setting up the request
                toast.error(`Error: ${error.message}`);
            }
        }
    };

    return (
        <div className='flex h-screen items-center justify-center'>
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className='border border-gray-700 px-6 py-2 rounded space-y-3 w-[400px] pb-4'
            >
                <h1 className='text-2xl text-center mt-2'>Chat
                    <span className='text-yellow-800 font-bold'>App</span>
                </h1>
                <h2 className='text-xl text-gray-700 font-bold'>Signup</h2>
                <br />
                {/* Fullname */}
                <label className="input input-bordered flex items-center gap-2">
                    <input 
                        type="text" 
                        className="grow" 
                        placeholder="Fullname"
                        {...register("fullname", { required: "Fullname is required" })} 
                    />
                </label>
                {errors.fullname && <span className='text-red-500 text-sm'>{errors.fullname.message}</span>}

                {/* Email */}
                <label className="input input-bordered flex items-center gap-2">
                    <input 
                        type="email" 
                        className="grow" 
                        placeholder="Email"
                        {...register("email", { required: "Email is required" })} 
                    />
                </label>
                {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}

                {/* Password */}
                <label className="input input-bordered flex items-center gap-2">
                    <input 
                        type={show ? "text" : "password"} 
                        className="grow" 
                        placeholder="Password"
                        {...register("password", { required: "Password is required" })} 
                    />
                    <button
                        type='button'
                        onClick={showPassword}
                    >{show ? "Hide" : "Show"}</button>
                </label>
                {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}

                {/* Confirm Password */}
                <label className="input input-bordered flex items-center gap-2">
                    <input 
                        type={ch ? "text" : "password"} 
                        className="grow" 
                        placeholder="Confirm Password"
                        {...register("confirmPassword", { 
                            required: "Confirm Password is required", 
                            validate: validatePasswordMatch 
                        })} 
                    />
                    <button
                        type='button'
                        onClick={chPassword}
                    >{ch ? "Hide" : "Show"}</button>
                </label>
                {errors.confirmPassword && <span className='text-red-500 text-sm'>{errors.confirmPassword.message}</span>}

                {/* Text and Signup Button */}
                <div className='flex justify-between'>
                    <p>Already have an account?
                        <Link to={'/login'} className='text-orange-600 underline cursor-pointer ml-1'>Login</Link>
                    </p>
                    <input 
                        type='submit' 
                        value='Signup' 
                        className='py-1 text-white bg-green-500 px-3 py-2 rounded-lg cursor-pointer hover:bg-green-400'
                    />
                </div>
            </form>
        </div>
    );
}

export default Signup;

