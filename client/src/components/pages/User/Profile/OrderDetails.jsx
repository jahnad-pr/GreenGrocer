import React, { useEffect, useState } from 'react'
import apple from '../../../../assets/images/aplle.png'
import { useLocation } from 'react-router-dom'
import { current } from '@reduxjs/toolkit'

export default function OrderDetails() {

    const [currentPosition,setCurrentPosition] = useState(1)
    const [limit,setLimit] = useState(0)
    const [crrentOrder,setCreentOrder] = useState([])

    const location = useLocation()

    useEffect(()=>{ 
        if(location.state){
            console.log(location.state);
            
            setCreentOrder(location.state)
            setLimit(location.state?.items?.length)
            // setCurrentPosition(location.state?.items?.length)
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
                    {  crrentOrder.items&&
                        <>
                        <p onClick={()=>console.log(crrentOrder?.items[currentPosition-1]?.product?.salePrice)} className='text-[45px] leading-none'>{crrentOrder?.items[currentPosition-1]?.product?.name}</p>
                        {/* <p onClick={()=>console.log(crrentOrder?.items[currentPosition-1]?.product?.salePrice)} className='text-[45px] leading-none'>{crrentOrder?.items[currentPosition-1]?.product?.category?.name}</p> */}
                        <p onClick={()=>console.log(crrentOrder?.items[currentPosition-1]?.product?.salePrice)} className='text-[25px] leading-none'>{crrentOrder?.items[currentPosition-1]?.product?.description}</p>
                        <p className='text-[20px] opacity-45'>{crrentOrder?.items[currentPosition-1]?.quantity/(crrentOrder?.items[currentPosition-1]?.quantity>=1000?1000:1)}{crrentOrder?.items[currentPosition-1]?.quantity>=1000?'Kg':'g'}</p>
                        <p className='opacity-65'>Product from : {crrentOrder?.items[currentPosition-1]?.product?.from}</p>
                        </>

                    }
                </div>

                {/* prodcut show container and alll details */}
                <div className="w-[60%] flex items-center flex-col">
                {/* <p>ORDER SATAUS : PROCESSING</p>
                <p>Ship to Shalu</p> */}

                {/* product container */}
                <div style={{transform:`translateX(-${100*(currentPosition-1)}%)`}}  className={`w-full flex-1 flex items-center duration-1000`}>
                    {  
                        crrentOrder.items?.map( (data,index)  => {
                            return (
                                <span className='min-w-[100%] flex justify-center'> 
                                <img style={{transform:`translateY(-${Math.abs((currentPosition-(index+1))*100)}px)`}} className={`w-60 h-60 duration-500 object-cover`} src={data.product.pics.one} alt="" />
                                <img className={`px-60 shadower ${currentPosition==index+1?'opacity-40':'opacity-0'} duration-500 absolute`} src={apple} alt="" />
                    </span>
                            )
                        } )
                    }
                    
                    {/* <span className='min-w-[100%] flex justify-center'>
                        <img className={`px-60 shadower ${currentPosition==2?'opacity-40':'opacity-0'} duration-500 absolute`} src={apple} alt="" />
                        <img style={{transform:`translateY(-${Math.abs((currentPosition-2)*100)}px)`}} className={`w-60 h-60 duration-500`} src={apple} alt="" /> 
                    </span>
                    <span className='min-w-[100%] flex justify-center'>
                        <img className={`px-60 shadower ${currentPosition==3?'opacity-40':'opacity-0'} duration-500 absolute`} src={apple} alt="" />
                        <img style={{transform:`translateY(-${Math.abs((currentPosition-3)*100)}px)`}} className={`w-60 h-60 duration-500`} src={apple} alt="" /> 
                    </span> */}

                
                </div>
                { crrentOrder.items?.length>1 &&
                <div className="w-24 h-12 bg-gray-200 text-[30px] flex items-center justify-center rounded-full z-10">
                <i onClick={()=>setCurrentPosition(currentPosition>1?currentPosition-1:currentPosition)} className="ri-arrow-left-s-fill"></i>
                <i onClick={()=>setCurrentPosition(currentPosition<limit?currentPosition+1:currentPosition)} className="ri-arrow-right-s-fill"></i>
                </div>

                }

                </div>

                {/* Amount Details */}
                {
                    crrentOrder.items&&
                    <>
                <div className="w-[20%] bg-green-500 flex flex-col gap-1">
                    <span className='flex items-end gap-6'>
                    <s><p className='text-[30px] leading-none opacity-45'>₹ {(crrentOrder?.items[currentPosition-1]?.quantity/1000)*crrentOrder?.items[currentPosition-1]?.product?.regularPrice}</p></s>
                    <p className='text-[45px] leading-none'>₹ {(crrentOrder?.items[currentPosition-1]?.quantity/1000)*crrentOrder?.items[currentPosition-1]?.product?.salePrice}</p>

                    </span>
                    {/* <p className='text-[15px] opacity-45'>PAYMENT STATUS: PENDING</p>
                    <p className='opacity-65 text-[22px] leading-none'>UPI</p> */}
                </div>
                    </>
                }

            </div>

            {/* order navigator */}
            <div className="w-full h-[30%] p-12 bg-[#792e2e25]">
                <div className="ww-full h-full bg-red-300 flex p-10 items-center">
                    <span>
                    {/* <p>Order status: {crrentOrder?.order_status}</p> */}
                    <p>Order payment Method: <span className='text-[20px]'>{crrentOrder?.payment_method}</span></p>
                    <p>Ship to: <span className='text-[20px]'>{crrentOrder?.delivery_address?.FirstName} {crrentOrder?.delivery_address?.LastName}</span></p>
                    {/* <p>Date: {crrentOrder?.time}</p> */}
                    <p>Order Date: <span className='text-[20px]'>{new Date(crrentOrder?.time).getDate()}th {new Date(crrentOrder?.time).getMonth()} {new Date(crrentOrder?.time).getFullYear()}</span></p>

                    </span>
                    <span className='flex-1'>

                    </span>
                    <p>Totel: <span className='text-[45px] leading-none font-bold'>₹ {crrentOrder?.price?.grandPrice}</span></p>
                    
                </div>
            </div>

        </div>
    </div>
  )
}
