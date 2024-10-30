import React from 'react'
import List from '../../parts/Main/List'

export default function Products() {
  return (
    <div className='w-[96%] h-full bg-gray-100'>
        <div className="w-full h-full bg-gray-200 px-40">
            <div className="w-full h-full bg-gray-300 pt-16 overflow-y-scroll">

                {/* Main head */}
                <h1 className='text-[30px] font-bold'>All Products and Servce</h1>

                {/* menu navigator */}
                <div className='flex gap-8 text-[20px] my-10 font-[500] relative py-3'>
                    <p className=''>Fruits</p>
                    <p className='opacity-45'>Vegetables</p>
                    <p className='opacity-45'>Service</p>
                    <div className="w-16 h-1 bg-black absolute bottom-0"></div>
                </div>


                {/* Banners */}
                <div className="w-full h-60 bg-gray-400"></div>


                 {/* fruit collection */}
                 <div className="w-full h-auto">
                    <List listData={{
                        title:'Fruits Collections',
                        wrap:true,
                        ml:false
                    }} />
                </div>


                 {/* fruits collection */}
                 <div className="w-full h-auto">
                    <List listData={{
                        title:'Fruit Collections',
                        wrap:true,
                        ml:false
                    }} />
                </div>

                {/* fruits */}
                <div className="w-full h-auto my-40">
                    <List listData={{
                        title:'Fruits',
                        wrap:true,
                        ml:false
                    }} />
                </div>

            </div>
        </div>
    </div>
  )
}
