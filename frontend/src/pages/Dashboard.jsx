import React from 'react'
import {motion as Motion} from 'framer-motion'
import { useAuthStore } from '../store/authStore'
const Dashboard = () => {
  const{ user } = useAuthStore();
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
			</div>
    </Motion.div>
  )
}

export default Dashboard