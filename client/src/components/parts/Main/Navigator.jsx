import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Navigator({userData}) {

  const navigator = useNavigate()
  const location = useLocation()

  return (
    <div className='h-full min-w-[6%] bg-gray-100 pr-8 pb-14 pt-6 z-10'>
        <div className="w-full h-full flex flex-col gap-5 items-end">

        { !location.pathname.startsWith('/user/home')&&!location.pathname.startsWith('/user/products') ?
        <i onClick={()=>navigator(-1)} className="ri-arrow-left-s-fill text-[35px]"></i>:
        <i className="ri-menu-line text-[30px]"></i>
        }

        <i className="ri-search-line text-[30px]"></i>
        <span className='h-14'></span>
        <i onClick={()=>navigator('/user/home')} className="ri-home-line text-[30px]"></i>
        <i className="ri-movie-line text-[30px]"></i>
        <i onClick={()=>navigator('/user/products')} className="ri-shopping-bag-line text-[30px]"></i>
        <i className="ri-bookmark-line text-[30px]"></i>
        <span className='flex-1'></span>
        { userData &&  <i onClick={()=>navigator(`/user/profile/${userData._id}`)} className="ri-user-line text-[30px]"></i>}
        <i className="ri-shopping-cart-line text-[30px]"></i>
        </div>
        
    </div>
  )
}
