import React from 'react'
import banana from "../../../assets/images/ban.png";
import { useNavigate } from 'react-router-dom';


export default function Product({pos,data,type}) {

  const Navigate = useNavigate()

  return (
    <div className={`h-80 min-w-60 max-w-60 bg-white flex flex-col justify-center items-center rounded-[40px]`}>
        <img className='max-w-[50%] aspect-square' src={data.pic||data.pics.one} alt="" />
        <h1 className='text-[23px] font-bold'>{data.name}</h1>
        <p className='opacity-30 mb-5' >{type}</p>
        <button onClick={()=>type==='product'?Navigate('/user/productPage',{ state:data }):""} className='px-16 py-3 bg-green-800 font-bold rounded-br-full rounded-tl-full text-white'>View</button>
    </div>
  )
}
