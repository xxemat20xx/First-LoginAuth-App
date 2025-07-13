import React from 'react'
import { useState } from 'react';
import {motion as Motion} from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { Lock } from 'lucide-react';
import toast from 'react-hot-toast';
const ResetPasswordPage = () => {
  const { resetPassword, isLoading, error, message } = useAuthStore();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const  { token } = useParams();
  const navigate = useNavigate();

const handleResetPassword = async (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  try {
    await resetPassword(token, password); // ← if this throws, it skips everything below
    toast.success("Password reset successfully! You can now log in with your new password.");
    setTimeout(() => {
      navigate('/login'); 
    }, 2000);
  } catch (err) {
    console.error("Reset password error:", err);
    toast.error(err.response?.data?.message || "Error resetting password");
  }
};



  return (
    <Motion.div 
      className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow
      flex flex-col items-center space-y-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-8">
        <h2 className='text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
          Reset Password
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}

        <form onSubmit={handleResetPassword}>
          <Input 
          icon={Lock}
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
          <Input
          icon={Lock}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          />
          <Motion.button
                className='mt-5 w-full py-3 px-4 bg-gradient-to-r 
                    from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 
                    hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                    focus:ring-offset-gray-900 transition duration-200 cursor-pointer'
                    whileHover={{scale: 1.02}}
                    whileTap={{scale: 0.98}}
                    type='submit'
                    disabled={isLoading}
                >
                    {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto'/>: "Reset Password"}
         </Motion.button>
        </form>
      </div>
      
    </Motion.div>
  )
}

export default ResetPasswordPage