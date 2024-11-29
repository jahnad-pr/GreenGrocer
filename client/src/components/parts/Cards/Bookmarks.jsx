import React, { useEffect, useState } from "react";
import aplle from "../../../assets/images/aplle.png";
import { Tostify, showToast } from "../Toast/Tostify";
import { useAddtoCartMutation, useCheckPorductInCartMutation, useRemoveBookmarkItmeMutation } from "../../../services/User/userApi";
import DeletePopup from "../popups/DeletePopup";
import { useNavigate } from "react-router-dom";

export default function BookmarkCard({ data,userData,setBookData }) {

  const [removeBookmark, { data: removeData }] = useRemoveBookmarkItmeMutation();
  const [addtoCart, { error: addError, data: addData }] = useAddtoCartMutation()
  const [checkPorductInCart, { data: checkData }] = useCheckPorductInCartMutation();

  const [dPopup,setDPopup] = useState(false);
  const [goToCart,setGoToCart] = useState(false);

  const addToCartItem = (id) => {

    const userId = userData._id
    const cartData = {
        quantity: data?.product?.stock>1000?1000:500,
        product: id,
    }
    addtoCart({ cartData, userId })
  }

  const navigate = useNavigate();

  useEffect(()=>{
    checkPorductInCart(data.product._id)
  },[])

  useEffect(() => {
    if (checkData) {
      setGoToCart(true);
    }
  }, [checkData]);


  useEffect(() => {
    if (removeData) {
      showToast("Removed from bookmark", "success");
      setBookData((prevData) => prevData.filter((item) => item.product._id !== data.product._id));
    }
  }, [removeData]);

  useEffect(() => {
    if (addData) {
      showToast(addData, "success");
    }
  }, [addData]);

  return (
    <> 
    {dPopup && (
        <DeletePopup
        action={'remove from bookmark'}
          updater={removeBookmark} 
          deleteData={{id:data.product._id}} 
          // setDeleteData={setDeleteData}
          showPopup={setDPopup}
          isUser={true}
          // isCart={true}
        />
      )}

    <div className="h-60 min-w-60 max-w-48 relative">

      <button onClick={() =>addData||goToCart?navigate('/user/cart'):addToCartItem(data.product._id)} className={`flex justify-start items-center font-bold rounded-full group text-white absolute ${!data.is_collection?'-left-4':'-right-4'} bg-[linear-gradient(#b4c2ba,#789985)] overflow-hidden w-[70px] h-[70px] hover:scale-125 duration-500 bottom-0 z-10`}>
        <i className="ri-shopping-cart-line font-thin rounded-full min-w-[70px] text-[25px]  group-hover:-translate-x-full duration-500"></i>
        <i className={`${addData||goToCart?'ri-arrow-right-line':'ri-add-large-fill'} rounded-full min-w-[70px] text-[25px] group-hover:-translate-x-full duration-500`}></i>
      </button>

      <div className={`w-60 h-60 overflow-hidden bg-gradient-to-br from-[#ffffff20] to-[#ffffff40] rounded-[30px] ${data.is_collection?'rounded-tr-[120px]':'rounded-bl-[120px]'} -z-10`}>

      <div className=" h-auto w-auto pl-8 relative py-2 z-10 leading-none">

        <p onClick={()=>console.log(data.product)} className="text-[25px] font-bold mt-3 text-black">{data.product.name}</p>
        <p className="text-[20px] font-medium text-[#2b662c]">{data.product?.category?.name}</p>
        {
          !data.is_collection &&
          <i onClick={()=>(navigate('/user/productPage',{ state:{ id:data.product._id } }))} className="ri-shopping-bag-fill absolute top-0 right-0 rounded-full p-5 text-[30px] hover:scale-125 duration-500"></i>
        }
        <i onClick={() => setDPopup(true)} className="ri-bookmark-fill absolute top-12 right-0 rounded-full p-5 text-[30px] hover:scale-125 duration-500"></i>

        </div>

          <img className={`w-4/3 relative ${data.is_collection?'-right-[50px] -translate-y-[20%]':'-left-[50px] -translate-y-[00%]'}`} src={data?.product?.pics?.one} alt="" />

        <div className="flex flex-col flex-0 self-start max-w-[60%] gap-3 text-white">
          {/* <button className={`bg-[#8d45458e] px-6 py-1 rounded-3xl ${col ? "hidden" : "block" }`} > Add to cart </button>
          <button className={`bg-[#00000020] px-6 py-1 rounded-3xl text-black font-bold ${col ? "hidden" : "block" }`} > Buy now </button> */}
        </div>

      </div>
    </div>
    <Tostify />
    </>
  );
}
