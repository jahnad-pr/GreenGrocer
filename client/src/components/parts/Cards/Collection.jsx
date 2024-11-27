import React from 'react'
import banana from "../../../assets/images/ban.png";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


export default function CollectionCard({ pos, data, type }) {

  const navigate = useNavigate()

  return (
    <div className={`h-80 min-w-56 max-w-56 flex flex-col justify-center items-center rounded-[40px] relative group`}>
      {/* <img className="px-0 max-w-[80px] shadowed opacity-20 absolute" src={data.pic} alt="" /> */}

      <span layoutId='full' className='w-full h-auto bg-[linear-gradient(#ffffff70,#ffffff30)] flex flex-col px-10 rounded-[30px] rounded-tr-[120px] flex-1 justify- gap-2 pb-0'>
        <span className='mt-10 flex flex-col gap-3 '>
          <motion.h1 layoutId='oi' className='text-[28px] font-medium leading-none text-[#14532d]'>{data?.name}</motion.h1>
          {/* <p className='opacity-30' >{data.category.name}</p> */}
          <span className='flex flex-col'>
            <><p className='opacity-30' >{data?.description}</p></>
            {/* <p className='opacity-60 text-[25px] font-bold text-[#14532d]' >{data.description}</p> */}

          </span>
        </span>
        <button onClick={() => type === 'product' ? (navigate('/user/productPage', { state: { id: data._id } })) : navigate(`/user/collection/${data.name}/products`, { state: { products: data?.products, action: 'collection', title: data?.name, img: data?.pic } })} className='flex justify-start items-center font-bold rounded-full text-white absolute top-0 -right-3 bg-[linear-gradient(45deg,#789985,#b4c2ba)] overflow-hidden w-[70px] h-[70px] group-hover:scale-125 duration-500'>
          <i className="ri-shopping-bag-line font-thin rounded-full min-w-[70px] text-[25px]  group-hover:-translate-x-full duration-500"></i>
          <i className="ri-arrow-up-line font-thin rounded-full min-w-[70px] text-[25px] group-hover:-translate-x-full duration-500"></i>
        </button>

      </span>
      <motion.img layoutId='oo' className=' h-[120px] w-[120px] object-cover max-h-[120px] -translate-y-[30%] mix-blend-darken drop-shadow-2xl z-20' src={data?.pic || data?.pics?.one} alt="" />
      {/* <MotionConfig></MotionConfig> */}
    </div>
  )
}