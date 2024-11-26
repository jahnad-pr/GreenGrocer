import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';

export default function DeletePopup({showPopup,deleteData={},updater,action='delete',isUser=false,isCart,setDeleteData}) {
    const cancelHandler = ()=>{
        showPopup(false)
    }

    const deleteHanler = async()=>{
        if(!isUser){
            const uniqeID = deleteData.uniqeID
            const updateBool = deleteData.updateBool
            const action = deleteData.action
            await updater({uniqeID, updateBool, action}).unwrap();
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
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='w-screen h-screen absolute left-0 top-0 bg-[#00000083] backdrop-blur-sm z-20 grid place-items-center text-white'
            >
                {/* Backdrop with blur */}
                <motion.div
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
                    exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                    onClick={cancelHandler}
                />

                <motion.div 
                    initial={{ 
                        scale: 0.4,
                        opacity: 0,
                        rotateX: 90,
                        y: -60
                    }}
                    animate={{ 
                        scale: [0.4, 1.1, 1],
                        opacity: 1,
                        rotateX: 0,
                        y: 0
                    }}
                    exit={{ 
                        scale: 0.4,
                        opacity: 0,
                        rotateX: -90,
                        y: 60
                    }}
                    transition={{ 
                        type: "spring",
                        damping: 15,
                        stiffness: 300,
                        bounce: 0.4,
                        duration: 0.6
                    }}
                    style={{
                        transformPerspective: 1200,
                        transformStyle: "preserve-3d"
                    }}
                    className="w-full max-w-[550px] backdrop-blur-2xl py-10 bg-[linear-gradient(45deg,#00000080,#412524)] flex items-center justify-center flex-col gap-5 rounded-3xl px-10 relative z-10"
                >
                    <motion.h1 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className='text-[25px] font-bold'
                    >
                        Are You sure to {action} ?
                    </motion.h1>
                    <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className='opacity-45 translate-y-[-18px] text-center px-10'
                    >
                        Your desition may reduce the items, make sure your ok with it, press confirm to {action}
                    </motion.p>
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="w-full flex gap-3 px-5"
                    >
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={cancelHandler} 
                            className="flex-1 border-2 border-red-900 rounded-2xl grid place-items-center text-[18px] font-medium py-3 text-white cursor-pointer"
                        >
                            Cancel
                        </motion.div>
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={deleteHanler} 
                            className="flex-1 bg-[linear-gradient(to_left,#7c165a,#dc262670)] rounded-2xl grid place-items-center font-medium text-[18px] py-3 cursor-pointer"
                        >
                            Confirm
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
