import React from 'react';
import {motion as Motion }from 'framer-motion';

const FloatingShape = ({
  color, size, top, left, delay
}) => {
  return (
    <Motion.div 
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl ${top} ${left}`}
      style={{top, left}}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: ["0", "360"],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay
      }}
      aria-hidden='true'
    />
  );
};

export default FloatingShape;
