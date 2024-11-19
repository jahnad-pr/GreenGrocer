import React, { useEffect, useState } from 'react'
import apple from '../../../../assets/images/aplle.png'
import { useLocation } from 'react-router-dom'

export default function OrderDetails() {

    const [currentPosition,setCurrentPosition] = useState(1)
    const [limit,setLimit] = useState(1)
    const [crrentOrder,setCreentOrder] = useState([])

    const location = useLocation()

    useEffect(()=>{ 
        if(location.state){
            setCreentOrder(location.state)
            setLimit(location.state?.items?.length)
            setCurrentPosition(location.state?.items?.length)
        }
    },[location])

  return (
    <div className='w-[94%] hull bg-product'>
      <div className="bg-[#5a52319c] mix-blend-screen absolute w-full h-full"></div>
        <div className="w-full h-full backdrop-blur-3xl">
            
            {/* details container */}
            <div className="w-full mx-auto pt-16 px-20 h-[70%] bg-[#00000040] flex">

                {/* product details and other product navigator */}
                <div className="w-[20%] bg-red-500 flex flex-col gap-1">
                    <p className='text-[45px] leading-none'>Apple</p>
                    <p className='text-[20px] opacity-45'>1 kilo gram</p>
                    <p className='opacity-65'>Product from : shalu</p>
                </div>

                {/* prodcut show container and alll details */}
                <div className="w-[60%] flex items-center flex-col">
                <p>ORDER SATAUS : PROCESSING</p>
                <p>Ship to Shalu</p>

                {/* product container */}
                <div style={{transform:`translateX(-${100*(currentPosition-1)}%)`}}  className={`w-full flex-1 flex items-center duration-1000`}>
                    {  
                        
                    }
                    <span className='min-w-[100%] flex justify-center'> 
                        <img style={{transform:`translateY(-${Math.abs((currentPosition-1)*100)}px)`}} className={`w-60 h-60 duration-500`} src={apple} alt="" />
                        <img className={`px-60 shadower ${currentPosition==0?'opacity-40':'opacity-0'} duration-500 absolute`} src={apple} alt="" />
                    </span>
                    {/* <span className='min-w-[100%] flex justify-center'>
                        <img className={`px-60 shadower ${currentPosition==2?'opacity-40':'opacity-0'} duration-500 absolute`} src={apple} alt="" />
                        <img style={{transform:`translateY(-${Math.abs((currentPosition-2)*100)}px)`}} className={`w-60 h-60 duration-500`} src={apple} alt="" /> 
                    </span>
                    <span className='min-w-[100%] flex justify-center'>
                        <img className={`px-60 shadower ${currentPosition==3?'opacity-40':'opacity-0'} duration-500 absolute`} src={apple} alt="" />
                        <img style={{transform:`translateY(-${Math.abs((currentPosition-3)*100)}px)`}} className={`w-60 h-60 duration-500`} src={apple} alt="" /> 
                    </span> */}

                
                </div>
                <div className="w-24 h-12 bg-gray-200 text-[30px] flex items-center justify-center rounded-full z-10">
                <i onClick={()=>setCurrentPosition(currentPosition>1?currentPosition-1:currentPosition)} className="ri-arrow-left-s-fill"></i>
                <i onClick={()=>setCurrentPosition(currentPosition<limit?currentPosition+1:currentPosition)} className="ri-arrow-right-s-fill"></i>
                </div>

                </div>

                {/* Amount Details */}
                <div className="w-[20%] bg-green-500 flex flex-col gap-1">
                    <p className='text-[45px] leading-none'>2000₹</p>
                    <p className='text-[15px] opacity-45'>PAYMENT STATUS: PENDING</p>
                    <p className='opacity-65 text-[22px] leading-none'>UPI</p>
                </div>

            </div>

            {/* order navigator */}
            <div className="w-full h-[30%] bg-[#792e2e25]"></div>

        </div>
    </div>
  )
}
