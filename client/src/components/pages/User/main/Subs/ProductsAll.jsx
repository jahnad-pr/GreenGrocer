import React from 'react'
import List from '../../../../parts/Main/List'

export default function ProductsAll() {
  return (
    <div className='w-[96%] h-full bg-gray-100'>
        <div className="w-full h-full bg-gray-200 px-40">
            <div className="w-full h-full bg-gray-300 pt-0 overflow-y-scroll">

                 {/* fruits collection */}
                 <div className="w-full h-auto">
                    <List listData={{
                        title:'Fruit Collections',
                        wrap:true,
                        ml:false
                    }} />
                    
                </div>
            

            </div>
        </div>
    </div>
  )
}
