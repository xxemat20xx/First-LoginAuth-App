import React from 'react'
import {motion as Motion} from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { formatDate } from '../utils/date'
const Dashboard = () => {
 
  const{ user, logout } = useAuthStore();
   const handleLogout = () => {
    logout();
  }
  return (
    <Motion.div 
    initial={{opacity:0, scale: 0.9}}
    animate={{opacity:1, scale:1}}
    exit={{opacity:0, scale: 0.9}}
    transition={{duration: 0.5}}
    className='z-1 max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter background-blur-lg
    rounded-xl shadow-xl border border-gray-800'>
      <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-4 to-emerald-600
      text-transparent bg-clip-text'>Dashboard</h2>
        			<div className='space-y-6'>
				<Motion.div
					className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					<h3 className='text-xl font-semibold text-green-400 mb-3'>Profile Information</h3>
					<p className='text-gray-300'>Name: {user.name}</p>
					<p className='text-gray-300'>Email: {user.email}</p>
				</Motion.div>

				<Motion.div
					className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
					<h3 className='text-xl font-semibold text-green-400 mb-3'>Account Activity</h3>
					<p className='text-gray-300'>
						<span className='font-bold'>Joined: </span>
						{new Date(user.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
					<p className='text-gray-300'>
						<span className='font-bold'>Last Login: </span>

						{formatDate(user.lastLogin)}
					</p>
				</Motion.div>


  
			</div>
              {/* Logout */}
      <Motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				className='mt-4'
			>
				<Motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleLogout}
					className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
				 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
				>
					Logout
				</Motion.button>
			</Motion.div>

    </Motion.div>
  )
}

export default Dashboard