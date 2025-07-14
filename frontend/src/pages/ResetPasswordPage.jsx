import {motion as Motion } from 'framer-motion';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useParams, useNavigate} from 'react-router-dom';
import Input from '../components/Input';
import { Lock,  Loader} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { isLoading, resetPassword, error, message} = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Token from params:", token);
  }, [token]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }
    try {
      await resetPassword(token, password);
      toast.success("Password reset successfully");
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(error.message || " Failed to reset password. Please try again.");
    }
  }
  return (
         <Motion.div
        initial={{opacity: 0, y:20}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.5}}
        className='z-1 max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter background-blur-xl rounded-xl shadow-xl overflow-hidden'>
        <div className='p-8'>
          <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
            Reset Password
          </h2>
          {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
          {message && <p className='text-green-500 text-center mb-4'>{message}</p>}

          <form onSubmit={handleResetPassword}>
              <Input 
                icon={Lock}
                type='password'
                placeholder='New Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Input 
                icon={Lock}
                type='password'
                placeholder='Confirm Password'
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