import React, { useEffect, useState } from 'react'
import banana from "../../../assets/images/ban.png";
import { useNavigate } from 'react-router-dom';
import { useAddToBookmarkMutation, useCheckItemIntheBookmarkMutation, useRemoveBookmarkItmeMutation } from '../../../services/User/userApi';


export default function Product({pos,data,type,userData}) {

  const [addToBookmark, { data: addToBookmarkData }] = useAddToBookmarkMutation();
  const [checkItemIntheBookmark, { data: bookMarkData }] = useCheckItemIntheBookmarkMutation();
  const [removeBookmarkItme, { data: removeData }] = useRemoveBookmarkItmeMutation();

  // const [dPopup,setDPopup] = useState(false);
  const [isMared,setMarked] = useState(false);
  const [isUnmarked,setUnMarked] = useState(false);

  useEffect(()=>{ checkItemIntheBookmark(data._id) },[])
  useEffect(()=>{ if(addToBookmarkData){ setMarked(true) } },[addToBookmarkData])
  useEffect(()=>{ if(bookMarkData){ setMarked(true)  } },[bookMarkData])
  useEffect(()=>{ if(removeData){ setMarked(false)  } },[removeData])

  const bookmarkHandler = (id,action) => {
    if(action==='remove'){

      removeBookmarkItme(id)

    }else if(action==='add'){

      const userId = userData._id

      const bookmarkData = {
          user: userData._id,
          product: id,
      }
      addToBookmark({ bookmarkData, userId })
    }

  }


  const navigate = useNavigate()

  return (
    <div className={`h-80 min-w-56 max-w-56 flex flex-col justify-center items-center rounded-[40px] relative`}>
        <img className='max-w-[120px] h-[120px] w-[120px] object-cover max-h-[120px]  oscillater mix-blend-darken drop-shadow-2xl z-20' src={data.pic||data?.pics?.one} alt="" />
        {/* <img className="px-0 max-w-[80px] shadowed opacity-20 absolute" src={data.pic||data?.pics?.one} alt="" /> */}

        <span className='w-full h-auto bg-[linear-gradient(#ffffff40,#ffffff70)] flex flex-col px-10 rounded-t-[30px] rounded-bl-[30px] rounded-br-[120px] pt-10 flex-1 justify- gap-2 pb-0'>
          <span className='mt-2'>    

        <h1 className='text-[28px] font-medium'>{data.name}</h1>
        {/* <p className='opacity-30' >{data.category.name}</p> */}
        <span className='flex flex-col'>
        <s><p className='opacity-30' >₹ {data?.regularPrice}</p></s>
        <p className='opacity-60 text-[25px] font-bold text-[#14532d]' >₹ {(data?.regularPrice - (data?.discount?.isPercentage ? (data?.regularPrice * data?.discount?.value / 100) : (data?.discount?.value || 0))).toFixed(2)}</p>

        <i onClick={()=>isMared?bookmarkHandler(data._id,'remove'):bookmarkHandler(data._id,'add')} className={` ri-bookmark-${isMared?'fill':'line'} absolute top-28 right-0 rounded-full p-5 text-[30px] hover:scale-125 duration-500 `}></i>

        </span>
          </span>
        <button onClick={()=>type==='product'?(navigate('/user/productPage',{ state:{ id:data._id } })):navigate(`/user/collection/${data.name}/products`,{ state:{products:data?.products,action:'collection'} })} className='flex justify-start items-center font-bold rounded-full text-white absolute bottom-0 right-3 bg-[linear-gradient(#b4c2ba,#789985)] overflow-hidden w-[70px] h-[70px] hover:scale-125 duration-500 group'>
        <i className="ri-shopping-bag-line font-thin rounded-full min-w-[70px] text-[25px]  group-hover:-translate-x-full duration-500"></i>
        <i className="ri-arrow-right-line rounded-full min-w-[70px] text-[25px] group-hover:-translate-x-full duration-500"></i>
        </button>



        </span>
    </div>
  )
}
