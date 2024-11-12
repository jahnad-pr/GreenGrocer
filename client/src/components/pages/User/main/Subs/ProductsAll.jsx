import React, { useEffect, useState } from 'react'
import List from '../../../../parts/Main/List'
import { useLocation, useParams } from 'react-router-dom';
import Product from '../../../../parts/Cards/Product';
import { useGetCollectionProductsMutation } from '../../../../../services/User/userApi';

export default function ProductsAll() {

  const [productsData,setProducts] = useState()
  const location = useLocation()

  useEffect(()=>{
    console.log(location?.state);
    
      if(location?.state?.products){
        setProducts(location?.state?.products)
      }
  },[location])

  
  return (
    <div className='w-[96%] h-full bg-gray-100'>
        <div className="w-full h-full bg-gray-200 px-40">
            <div className="w-full h-full bg-gray-300 pt-0 overflow-y-scroll">

                {/* fruit collection */}
           <h1 className={`text-[30px] $'ml-40':''} font-semibold mt-20`}>
            Products
          </h1>
          <div className="w-full h-auto flex my-5 mt-8 gap-5 flex-wrap">
            {productsData?.map((data, index) => {
                if(true){

                    return <Product type={'product'} data={data} pos={index} />;
                  
                }
            })}
          </div>
            

            </div>
        </div>
    </div>
  )
}
