import React, { useEffect } from "react";
import MianList from "../../../parts/Main/MianList";
import Carts from "../../../parts/Cards/Carts";
import { useGetCartItemsMutation } from "../../../../services/User/userApi";

export default function Cart() {

  const [ getCartItems, { data } ] = useGetCartItemsMutation()

  useEffect(()=>{
    getCartItems()
  },[])


  return (
    <div className="w-[96%] h-full bg-product">
      <div className="bg-[#201c1c20] mix-blend-scree absolute w-full h-full backdrop-blur-3xl"></div>
      <div className="w-full h-full backdrop-blur-3xl">
        <div className="w-full h-full  pt-16 overflow-y-scroll relative">
          {/* Main head */}
          <h1 className="text-[35px] font-bold px-40 ">Carts</h1>
          <p className="opacity-45 translate-y-[-5px] px-40 ">2 totel items</p>


            {/* the list of bookmarks */}
            <div className="w-full px-40  0 mt-12 flex gap-5">

              {
                data?.items?.map(item => {
                  return <Carts data={item} />
                } )
              }

                {/* <Carts col={true} /> */}
            </div>

            <button className="absolute bottom-16 right-16 px-16 py-2 bg-[linear-gradient(to_left,#0bc175,#0f4586)] text-[20px] rounded-full text-white font-medium">Continue</button>

        </div>
      </div>
    </div>
  );
}
