import React, { useEffect, useState } from "react";
import BookmarkCard from "../../../parts/Cards/Bookmarks";
import { useAddtoCartMutation, useCheckPorductInCartMutation, useGetBookmarkItemsMutation } from "../../../../services/User/userApi";
import EmptyState from "../../../parts/Main/EmptySatate";
import { useNavigate } from "react-router-dom";

export default function Bookmark({userData}) {

  const [ getBookmarkItems,{ data } ] =  useGetBookmarkItemsMutation()

  const [bookData,setBookData] = useState([])


  const navigate = useNavigate()

  useEffect(()=>{
    if(data){
      setBookData(data?.items)
    }
  },[data])

  useEffect(() => {
    (async () => {
      await getBookmarkItems().unwrap();
    })(); 
  },[])

  return (
    <div className="w-[96%] h-full">
      <div className=" mix-blend-screen absolute w-full h-full"></div>
      <div className="w-full h-full px-0 backdrop-blur-3xl">
        <div className="w-full h-full pt-16 overflow-y-scroll px-40">
          {/* Main head */}
          <h1 className="text-[30px] font-bold">Bookmarks</h1>
          <p className="opacity-45 translate-y-[-9px]">2 totel bookmarks</p>

          {/* menu navigator */}
          { bookData?.length > 0?
          <>
          <div className="flex gap-8 text-[20px] my-10 mb-5 font-[500] relative py-3 items-center">
            <p className="mt-3">All</p>
            <p className="opacity-45">Fruits</p>
            <p className="opacity-45">Vegetables</p>
            <p className="opacity-45">Collections</p>
            <div className="w-8 h-1 bg-black absolute bottom-0"></div>
          </div>

            {/* the list of bookmarks */}
            <div className="w-full mt-10 h-full flex flex-wrap gap-6">
              {
                bookData?.map((item, index) => {
                  return <BookmarkCard userData={userData} setBookData={setBookData} data={item} key={index} col={true} />;
                })
              }
            </div>
          </>
            :
            
            <EmptyState action={()=>navigate("/user/products")} data={{title:"No Bookmarks",description:"You have no bookmarks yet",button:"Add your bookmarks"}} />

          }

        </div>
      </div>
    </div>
  );
}
