
import React from 'react'
import User from './User'
import UseGetAllUsers from '../../context/UseGetAllUsers'

function Users() {
    const [allUsers, loading] = UseGetAllUsers() // Correct hook name case

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1 className='px-8 py-2 mt-2 text-xl font-semibold text-gray-800 rounded-md bg-slate-500'>
                Contacts
            </h1>
            {/* this div is for displaying users */}
            <div className='flex-1 py-2 overflow-y-auto custom-scroll' style={{ maxHeight: "calc(84vh - 13vh)" }}>
                {
                    allUsers.map((user, index) => (
                        <User key={index} user={user} /> // Ensure component name is capitalized
                    ))
                }
            </div>
        </div>
    )
}

export default Users
