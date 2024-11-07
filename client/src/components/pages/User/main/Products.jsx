import React, { useEffect, useState } from "react";
import List from "../../../parts/Main/List";
import {
  useGetCategoriesMutation,
  useGetCollectionsMutation,
} from "../../../../services/userApi";
import Product from "../../../parts/Cards/Product";
import { useGetProductsMutation } from "../../../../services/adminApi";

export default function Products() {

    const [cPosition,setPosition] = useState(0)

  const [
    getCategories,
    { isLoading: catLoading, error: catError, data: catData },
  ] = useGetCategoriesMutation();
  const [ getCollections, { sLoading: colllLooading, error: collEroor, data: CollData }, ] = useGetCollectionsMutation();
  const [ getProducts, { sLoading: proLoading, error: proError, data: proData }, ] = useGetProductsMutation();

  useEffect(() => {
    (async () => {
      await getCategories().unwrap();
    })();
  }, []);

  useEffect(() => {
    if (catData?.data) {
      // const id = catData?.data
      // data
      (async () => {
        console.log(cPosition);
        
          await getProducts(proData?.data[cPosition]._id).unwrap();
        await getCollections(catData?.data[cPosition]._id).unwrap();
      })();
    }
  }, [catData,cPosition]);

  useEffect(() => {
    console.log(proData?.data);
  }, [proData]);

  return (
    <div className="w-[96%] h-full bg-gray-100">
      <div className="w-full h-full bg-gray-200 px-40">
        <div className="w-full h-full bg-gray-300 pt-16 overflow-y-scroll">
          {/* Main head */}
          <h1 className="text-[30px] font-bold">All Products and Servce</h1>

          {/* menu navigator */}
          <div className="flex gap-8 text-[20px] my-10 font-[500] relative py-3">
            {catData?.data?.map((data,index) => {
              return <p  onClick={()=>setPosition(index)} className="w-28">{data.name}</p>;
            })}
            <p className="opacity-45">Service</p>
            <div className="w-16 h-1 bg-black absolute bottom-0"></div>
          </div>

          {/* Banners */}
          <div className="w-full h-60 "></div>



          {/* fruit collection */}
          <h1 className={`text-[30px] $'ml-40':''} font-semibold`}>
            Collections
          </h1>
          <div className="w-full h-auto flex my-5 mt-8 gap-5">
            {CollData?.data?.map((data, index) => {
                if(data.isListed){

                    return <Product type={'collection'} data={data} pos={index} />;
                    
                }
            })}
          </div>


           {/* fruit collection */}
           <h1 className={`text-[30px] $'ml-40':''} font-semibold mt-20`}>
            Products
          </h1>
          <div className="w-full h-auto flex my-5 mt-8 gap-5">
            {proData?.data?.map((data, index) => {
                if(data.isListed){

                    return <Product type={'product'} data={data} pos={index} />;
                    
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
