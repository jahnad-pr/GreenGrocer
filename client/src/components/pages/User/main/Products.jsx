import React, { useEffect, useState } from "react";
import List from "../../../parts/Main/List";
import {
  useGetCategoriesMutation,
  useGetCAtegoryCollctiionsMutation,
  useGetCAtegoryProductsMutation,
  useGetCollectionsMutation,
} from "../../../../services/User/userApi";
import Product from "../../../parts/Cards/Product";
import { useNavigate } from "react-router-dom";


export default function Products() {

    const [cPosition,setPosition] = useState(0)
    const navigator = useNavigate()

  const [
    getCategories,
    { isLoading: catLoading, error: catError, data: catData },
  ] = useGetCategoriesMutation();
  const [ getCAtegoryCollctiions, { sLoading: colllLooading, error: collEroor, data: CollData }, ] = useGetCAtegoryCollctiionsMutation();
  const [ getCAtegoryProducts, { sLoading: proLoading, error: proError, data: proData }, ] = useGetCAtegoryProductsMutation();

  useEffect(() => {
    (async () => {
      await getCategories().unwrap();
    })();
  }, []);

  useEffect(()=>{ console.log(CollData);
   },[CollData])

  

  useEffect(() => {
    if (catData?.data) {
      // const id = catData?.data
      // data
      (async () => {
        await getCAtegoryProducts(catData?.data[cPosition]._id).unwrap();
        await getCAtegoryCollctiions(catData?.data[cPosition]._id).unwrap();
      })();
    }
  }, [catData,cPosition]);


  return (
    <div className="w-[96%] h-full bg-gray-100 motion-preset-slide-right ">
      <div className="w-full h-full bg-gray-200 px-40">
        <div className="w-full h-full bg-gray-300 pt-16 overflow-y-scroll">
          {/* Main head */}
          <h1 className="text-[30px] font-bold">All Products and Servce</h1>

          {/* menu navigator */}
          <div className="flex text-[20px] my-10 font-[500] relative py-3">
            {catData?.data?.map((data,index) => {
              
              return data.isListed && <p  onClick={()=>setPosition(index)} className="w-28">{data.name}</p>;
            })}
            <p className="opacity-45">Service</p>
            <div className={`w-16 h-1 duration-500 left-${28*cPosition} bg-black absolute bottom-0`}></div>
          </div>

          {/* Banners */}
          {/* <div className="w-full h-60 "></div> */}



          {/* fruit collection */}
          <h1 className={`text-[30px] $'ml-40':''} font-semibold mt-20`}>
            Collections
          </h1>
          <div className="w-full h-auto flex my-5 mt-8 gap-5 relative">
          <p onClick={()=>navigator(`/user/collection/${catData?.data[cPosition].name}/products`,{ state:{products:CollData?.data,action:'collectionw'} })} className='px-8 inline absolute right-0 top-[-65px] py-2 bg-green-900 text-white tex-[20px] rounded-l-full'>View all</p>
            {CollData?.data?.map((data, index) => {
                if(data.isListed){

                    return <Product key={index} type={'collection'} data={data} pos={index} />;
                    
                }
            })}
          </div>


           {/* fruit collection */}
           <h1 className={`text-[30px] $'ml-40':''} font-semibold mt-20`}>
            Products
          </h1>
          <div className="w-full h-auto flex my-5 mt-8 gap-5  mb-80 relative flex-wrap">
            <p  onClick={()=>navigator(`/user/collection/${catData?.data[cPosition].name}/products`,{ state:{products:proData?.data,action:'gategory'} })} className='px-8 inline absolute right-0 top-[-65px] py-2 bg-green-900 text-white tex-[20px] rounded-l-full'>View all</p>
            {proData?.data?.map((data, index) => {
                if(data.isListed){

                    return <Product key={index} type={'product'} data={data} pos={index} />;
                    
                }
            })}
          </div>




          {/* fruits collection */}
          {/* <div className="w-full h-auto">
            <List
              listData={{
                title: "Fruit Collections",
                wrap: true,
                ml: false,
                data: CollData?.data,
              }}
            />
          </div> */}

          {/* fruits
          <div className="w-full h-auto my-40">
            <List
              listData={{
                title: "Fruits",
                wrap: true,
                ml: false,
                data: CollData?.data,
              }}
            />
          </div>
           */}
        </div>
      </div>
    </div>
  );
}
