import React from 'react'
import banana from "../../../assets/images/ban.png";


export default function Product({pos}) {
  return (
    <div className={`h-80 min-w-60 max-w-60 bg-white flex flex-col justify-center items-center rounded-[40px] ${pos?'ml-40':''}`}>
        <img src={banana} alt="" />
        <h1 className='text-[23px] font-bold'>Tomato</h1>
        <p className='opacity-30 mb-5' >Collection</p>
        <button className='px-16 py-3 bg-green-800 font-bold rounded-br-full rounded-tl-full text-white'>View</button>
    </div>
  )
}
