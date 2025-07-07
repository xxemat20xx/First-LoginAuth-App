import React, { useState, useRef, useEffect } from 'react'
import {motion as Motion} from 'framer-motion'

const EmailVerificationPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);// KEEP track input ref 

    const isLoading = false;
const handleChange = (index, value) => {

  const newCode = [...code];

  // Handle paste
  if (value.length > 1) {
    const pastedCode = value.replace(/\D/g, "").slice(0, 6).split("");
    for (let i = 0; i < 6; i++) {
      newCode[i] = pastedCode[i] || "";
    }
    setCode(newCode);

    const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
    const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
    inputRefs.current[focusIndex]?.focus();
  } else {
    newCode[index] = value.slice(0, 1);
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }
};


    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace") {
    const newCode = [...code];

    if (code[index] === "") {
        // Move focus to previous input if current is already empty
        if (index > 0) {
            inputRefs.current[index - 1].focus();
        }
    } else {
        // Clear current input
        newCode[index] = "";
        setCode(newCode);
    }

    e.preventDefault();
    }

    }
    const handleSubmit =(e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        console.log("You submitted code: ", verificationCode);
    }
    useEffect(() => {
        if(code.every(digit => digit !== '')){
            handleSubmit(new Event('submit'));
        }
    })
    return (
        <Motion.div
    initial={{opacity: 0, y:20}}
    animate={{opacity:1, y:0}}
    transition={{duration:0.5}}
    className='z-1 max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter background-blur-xl rounded-xl shadow-xl overflow-hidden'>
          <div className="p-8">
              <h2 className='text-xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                Verify Email
              </h2>
             <p className='text-center text-gray-300 mb-6'>Enter the 6-digit code sent to your email address</p>
             <form className='space-y-6' onSubmit={handleSubmit}>
                <div className='flex justify-between'>
                    {code.map((digit,index) => (
                        <input 
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type='text'
                            maxLength='6'
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2
                            border-gray-500 rounded-lg focus:border-green-500 focus:outline-none'
                            readOnly={code.every((d) => d !== "")} //disable when all complete
                        />
                    ))}
                </div>
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
                    {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto'/>: "Verify"}
                </Motion.button>
             </form>
            </div>
    </Motion.div>
  )
}

export default EmailVerificationPage