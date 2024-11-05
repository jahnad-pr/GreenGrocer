import React, { useEffect } from 'react'
import List from '../../../parts/Main/List'
import { useGetCategoriesMutation, useGetCollectionsMutation } from '../../../../services/userApi';

export default function Products() {

    const [ getCategories, { isLoading: catLoading, error: catError, data: catData }, ] = useGetCategoriesMutation();
    const [getCollections, { sLoading:colllLooading,error:collEroor,data:CollData }] = useGetCollectionsMutation();


    useEffect(()=>{
        (async()=>{ await getCategories().unwrap() })()
    },[])

    useEffect(()=>{

        

        if(catData?.data){
            (async()=>{ await getCollections(catData?.data[0].items?.collections).unwrap() })()
        }

    },[catData])
        console.log(CollData);

    useEffect(()=>{
        
    },[CollData])

  return (
    <div className='w-[96%] h-full bg-gray-100'>
        <div className="w-full h-full bg-gray-200 px-40">
            <div className="w-full h-full bg-gray-300 pt-16 overflow-y-scroll">

                {/* Main head */}
                <h1 className='text-[30px] font-bold'>All Products and Servce</h1>

                {/* menu navigator */}
                <div className='flex gap-8 text-[20px] my-10 font-[500] relative py-3'>
                    {
                        catData?.data?.map((data)=>{
                            return(  <p className='w-28'>{data.name}</p> )
                        })
                    }
                    <p className='opacity-45'>Service</p>
                    <div className="w-16 h-1 bg-black absolute bottom-0"></div>
                </div>


                {/* Banners */}
                <div className="w-full h-60 bg-gray-400"></div>


                 {/* fruit collection */}
                 {/* <div className="w-full h-auto">
                    <List listData={{
                        title:'Fruits Collections',
                        wrap:true,
                        ml:false
                    }} />
                </div> */}


                 {/* fruits collection */}
                 <div className="w-full h-auto">
                    <List listData={{
                        title:'Fruit Collections',
                        wrap:true,
                        ml:false,
                        data:CollData?.data
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
