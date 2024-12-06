import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Navigator({userData}) {

  const navigator = useNavigate()
  const location = useLocation()

  return (
    <div className='h-full min-w-[6%] bg-gradient-to-bl from-[#52a556] to-[#3c6e51]  pr-8 pb-14 pt-6 z-10'>
        <div className="w-full h-full flex flex-col gap-5 items-end">

        { !location.pathname.startsWith('/user/home')&&!location.pathname.startsWith('/user/products') ?
        <i onClick={()=>navigator(-1)} className="ri-arrow-left-s-fill text-[35px]"></i>:
        <i className="ri-menu-line text-[30px]"></i>
        }

        <i onClick={()=>navigator('/user/search')} className="ri-search-line text-[30px] cursor-pointer hover:text-green-600 transition-colors"></i>
        <span className='h-14'></span>
        <i onClick={()=>navigator('/user/home')} className="ri-home-line text-[30px] cursor-pointer hover:text-green-600 transition-colors"></i>
        <i className="ri-movie-line text-[30px] cursor-pointer hover:text-green-600 transition-colors"></i>
        <i onClick={()=>navigator('/user/products')} className="ri-shopping-bag-line text-[30px] cursor-pointer hover:text-green-600 transition-colors"></i>
        <i onClick={()=>navigator('/user/bookmarks')} className="ri-bookmark-line text-[30px] cursor-pointer hover:text-green-600 transition-colors"></i>
        <span className='flex-1'></span>
        { location.pathname.startsWith('/user/profile') && <i onClick={()=>navigator('/user/profile/logout')} className="ri-logout-circle-r-line text-[30px] text-red-600 hover:scale-110 duration-500 cursor-pointer"></i>}
        { location.pathname.startsWith('/user/profile') && <i onClick={()=>navigator('/user/Wallet')} className="ri-wallet-line text-[30px] text-green-600 hover:scale-110 duration-500 cursor-pointer"></i>}
        { userData &&  <i onClick={()=>navigator(`/user/profile/${userData._id}`)} className="ri-user-line text-[30px] cursor-pointer hover:text-green-600 transition-colors"></i>}
        { userData && <i onClick={()=>navigator(`/user/Cart`)}  className="ri-shopping-cart-line text-[30px] cursor-pointer hover:text-green-600 transition-colors"></i>}
        </div>
        
    </div>
  )
}
