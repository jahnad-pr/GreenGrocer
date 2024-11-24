import React from 'react'

export default function DeletePopup({showPopup,deleteData={},updater,action='delete',isUser=false,isCart,setDeleteData}) {


    const cancelHandler = ()=>{
        showPopup(false)
    }

    const deleteHanler = async()=>{
        if(!isUser){
            const uniqeID = deleteData.uniqeID
            const updateBool = deleteData.updateBool
            const action = deleteData. action
            await updater( {uniqeID, updateBool,  action} ).unwrap();
            showPopup(false)
        }else if(isUser&&!isCart){
            await updater(deleteData.id)
            showPopup(false)
        }else{
            await updater({id:deleteData.id})
            showPopup(false)
            setDeleteData(deleteData.id)
        }
    }


  return (
    <div className='w-screen  h-screen absolute left-0 top-0 bg-[#000000b4] backdrop-blur-sm z-20 grid place-items-center text-white'>
        <div className="w-full max-w-[550px] backdrop-blur-2xl h- py-10 bg-[linear-gradient(45deg,#00000080,#412524)] flex items-center justify-center flex-col gap-5 rounded-3xl px-10">
            <h1 className='text-[25px] font-bold'>Are You sure to {action} ?</h1>
            <p className='opacity-45 translate-y-[-18px] text-center px-10' >Your desition may reduce the items, make sure your ok with it, press confirm to {action}</p>
            <div className="w-full flex gap-3 px-5">
                <div onClick={cancelHandler} className="flex-1 border-2 border-red-900 rounded-2xl grid place-items-center text-[18px] font-medium py-3 text-white">
                    Cancel
                </div>
                <div onClick={deleteHanler} className="flex-1 bg-[linear-gradient(to_left,#7c165a,#dc262670)] rounded-2xl grid place-items-center font-medium text-[18px] py-3">
                    Confirm
                </div>
            </div>
        </div>
    </div>
  )
}
