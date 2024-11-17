import React from 'react';
import { IoSend } from 'react-icons/io5';

// Utility function to join class names (simple replacement for `cn`)
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

 const HoverKing = ({ children, Icon,event,styles, ...rest }) => {
  return (
    <button 
    onClick={()=>event()}
      {...rest}
      className={classNames(
        `overflow-hidden border shadow group w-60 rounded-[22px] h-16 flex ${styles}`,
        // light mode
        'border-zinc-300 text-zinc-800',
        // dark mode
        'dark:border-[#5fb064] dark:text-zinc-100 dark:bg-[#3c6e51]',
        rest.className
      )}
    >
      <span className="absolute inset-0 rounded-sm flex items-center justify-center w-full h-full duration-[600ms] ease-[cubic-bezier(0.50,0.20,0,1)] -translate-x-full group-hover:translate-x-0 bg-zinc-800 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-800">
        {Icon}
      </span>
      <span className="absolute flex items-center justify-center w-full h-full transition-all duration-500 ease transform group-hover:translate-x-full">
        ADD ADDRESS
      </span>
      {/* <span className="relative invisible">{children}</span> */}
    </button>
  );
};

export default HoverKing