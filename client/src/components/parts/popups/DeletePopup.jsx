import React from 'react'

export default function DeletePopup({showPopup,deleteData={},updater,action='delete',isUser=false}) {


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
        }else if(isUser){
            await updater(deleteData.id)
            showPopup(false)
        }
    }


  return (
    <div className='w-screen  h-screen absolute left-0 top-0 bg-[#00000080]  z-10 grid place-items-center text-white'>
        <div className="w-full max-w-[550px] h- py-8 bg-gray-900 flex items-center justify-center flex-col gap-5 rounded-3xl px-10">
            <h1 className='text-[30px] font-bold'>Are You sure to {action} ?</h1>
            <p className='opacity-45 translate-y-[-18px]' >Press confirm to {action}</p>
            <div className="w-full flex gap-3 px-5">
                <div onClick={cancelHandler} className="flex-1 border-2 border-red-700 rounded-2xl grid place-items-center text-[22px] font-medium py-3 text-white">
                    Cancel
                </div>
                <div onClick={deleteHanler} className="flex-1 bg-[linear-gradient(to_left,#8c02f3,#dc2626)] rounded-2xl grid place-items-center font-medium text-[22px] py-3">
                    Confirm
                </div>
            </div>
        </div>
    </div>
  )
}
