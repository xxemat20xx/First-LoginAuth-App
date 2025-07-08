import React, { useState } from 'react'
import {motion as Motion} from 'framer-motion'
import Input from '../components/Input'
import {User, Mail, Lock} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader } from 'lucide-react'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'
import { useAuthStore } from '../store/authStore'

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { signup, error, isLoading } = useAuthStore();

  const handleSignUp = async(e) => {
    e.preventDefault();

    try {
      await signup(email,password,email);
      navigate('/verify-email');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Motion.div
    initial={{opacity: 0, y:20}}
    animate={{opacity:1, y:0}}
    transition={{duration:0.5}}
    className='z-1 max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter background-blur-xl rounded-xl shadow-xl overflow-hidden'>
          <div className="p-8">
              <h2 className='text-xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                Create Account
              </h2>

              <form onSubmit={handleSignUp}>
                <Input 
                  icon={User} 
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                  <Input 
                  icon={Mail} 
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                 <Input 
                  icon={Lock} 
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* error message */}
                {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
                {/* password strength meter */}
                <PasswordStrengthMeter password={password} />

                <Motion.button
                className='mt-5 w-full py-3 px-4 bg-gradient-to-r 
                    from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 
                    hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                    focus:ring-offset-gray-900 transition duration-200 cursor-pointer'
                    whileHover={{scale: 1.02}}
                    whileTap={{scale: 0.98}}
                    disabled={isLoading}
                    type='submit'
                >
                    {isLoading ? <Loader className="animate-spin mx-auto"/> : "Sign Up"}
                </Motion.button>
              </form>
          </div>
          <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
              <p className='text-sm text-gray-400'>
                Already have and account?{" "}
                <Link to={"/login"}
                 className='text-green-400 hover:underline'
                >Login</Link>
              </p>
          </div>
    </Motion.div>
  )
}

export default SignUpPage