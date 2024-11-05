import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navigator() {

  const navigator = useNavigate()

  return (
    <div className='h-full min-w-[6%] bg-gray-100 pr-8 pb-14 pt-6'>
        <div className="w-full h-full flex flex-col gap-5 items-end">
        <i className="ri-menu-line text-[30px]"></i>
        <i className="ri-search-line text-[30px]"></i>
        <span className='h-14'></span>
        <i className="ri-home-line text-[30px]"></i>
        <i className="ri-movie-line text-[30px]"></i>
        <i onClick={()=>navigator('/user/products')} className="ri-shopping-bag-line text-[30px]"></i>
        <i className="ri-bookmark-line text-[30px]"></i>
        <span className='flex-1'></span>
        <i className="ri-user-line text-[30px]"></i>
        <i className="ri-shopping-cart-line text-[30px]"></i>
        </div>
    </div>
  )
}
