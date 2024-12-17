import React, { useEffect, useState } from 'react'
import logout from '../../../../assets/images/logout.png'
import { useNavigate, useParams } from 'react-router-dom';
import { useLogoutUserMutation } from '../../../../services/User/userApi';
import DeletePopup from '../../../parts/popups/DeletePopup';
import HoverKing from '../../../parts/buttons/HoverKing';


export default function Logout({userData}) {

  const [popup,showPopup] = useState(false)

  // const { id } = useParams()

  const navigator = useNavigate()

  const [logoutUser,{ isLoading,error,data }] = useLogoutUserMutation()

  useEffect(()=>{

    if(data?.forWord){
      navigator('/user/home')
    }
  },[data])


  
   return (
    <>
   { popup &&
    <DeletePopup updater={logoutUser} deleteData={{id:userData._id}} showPopup={showPopup} action={'logout'} isUser={true}   />
   }
      <div className="w-[96%] h-full bg-[#f2f2f2]">
        <div className="w-full h-full px-96 flex flex-col items-center gap-5">

          {/* Head */}
          <h1 className="text-[35px] font-bold my-16 mb-0">Logout</h1>

          <img className="w-[35%]" src={'/logout.svg'} alt="" />


          <h1 className="text-[40px] font-bold">Are you sure you want to log out?</h1>

          <p className="text-center mt-2 text-[18px] opacity-60">You are about to log out of your account. Make sure you have saved any changes before continuing" is a prompt that alerts users of their impending logout, encouraging them to confirm they've preserved any unsaved work. This reminder is essential for preventing data loss, as logging out typically ends the current session and may discard any unsaved progress. It serves as a cautionary step to ensure users don't accidentally lose important edits, updates, or entries made during their session. By prompting users to verify their actions, this message aims to enhance the user experience and prevent potential frustration due to unintentional data loss</p>

          {/* <button onClick= className="px-0 py-[15px] bg-[linear-gradient(to_left,#be2727,#A51B87)] text-[18px] rounded-full text-white font-medium mt-5 w-full max-w-[300px]">Logout</button> */}
        <HoverKing  event={()=>showPopup(true)} styles={'fixed bottom-24 left-1/2 -translate-x-[15%] rounded-full border-0 font-medium text-[16px] bg-white'} redish={true} Icon={<i className="ri-expand-left-line text-[30px] "></i>} >Go with logout</HoverKing>


        
      
        </div>
      </div>
    </>
  );
}
