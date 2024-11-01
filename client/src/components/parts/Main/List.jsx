import React from 'react'
import Product from '../Cards/Product'

export default function List({listData}) {
  return (
    <div className='w-full auto'>
        <div className="w-full h-full flex flex-col justify-between">

            <div className='flex my-10 mt-20 items-center justify-center'>
            <h1 className={`text-[30px] ${listData.ml?'ml-40':''} font-semibold`}>{listData.title}</h1>
            <span className='flex-1'></span>
            <p className='px-8 py-2 bg-green-900 text-white tex-[20px] rounded-l-full'>View all</p>
            </div>

            <div className={`flex w-full h-auto gap-10 overflow-x-scroll flex-wrap`}>
            <Product pos={listData.ml?1:0} />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            </div>
        </div>
    </div>
  )
}
