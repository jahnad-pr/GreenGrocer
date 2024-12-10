import React from "react";



export function Order({ navigate, index, getStatusColor, order, getStatusTextColor }) {

  return <div onClick={() => navigate('/user/OrderDetails', {
    state: order
  })} key={index} className={`duration-500 relative group cursor-pointer hover:scale-[0.98] max-w-[280px] overflow-hidden`}>
    {/* {order.items.length > 1 && <div className={`absolute w-full h-1/2 -left-2 shadow rounded-tl-[109px] rounded-[30px] group-hover:scale-[1.05] duration-500 -z-10 -top-2  ${getStatusColor(order.order_status)}`}></div>}
    {order.items.length > 2 && <div className={`absolute w-full h-1/2 -left-4 shadow rounded-tl-[109px] rounded-[30px] group-hover:scale-[1.10] duration-500 -z-20 -top-4 ${getStatusColor(order.order_status)}`}></div>} */}

    <div className={`flex items-center gap-4`}>

      <div className="flex-grow items-center justify-center flex flex-col overflow-hidden"> 
      <button className={`flex justify-start items-center font-bold rounded-full text-white absolute top-12 left-3 ${getStatusColor(order.order_status)} overflow-hidden w-[70px] h-[70px] hover:scale-125 duration-500 group`}>
        {
          order.items.length > 1 ?
        <p className=" font-thin rounded-full min-w-[70px] font-mono text-[16px] leading-none group-hover:-translate-x-full duration-500"> {order.items.length}<br />more</p>:
        <i className="ri-shopping-bag-line font-thin rounded-full min-w-[70px] text-[25px] group-hover:-translate-x-full duration-500"></i>
        }
        <i className="ri-arrow-right-line rounded-full min-w-[70px] text-[25px] group-hover:-translate-x-full duration-500"></i>
      </button>

      
        <img src={order.items[0].product?.pics?.one} alt="Order Item" className="w-[30%] min-w-[30%] max-h-[30%] min-h-[30%] object-cover rounded-[60px] translate-y-[30%] drop-shadow-2xl" />
        <div className="flex justify-between items-start f">

          <div className={`w-full flex flex-col gap-1 text-center bg-white p-6 rounded-[30px] rounded-tl-[120px] px-12 pt-12 overflow-hidden`}>
            <h1 className="font-bold text-[25px] text-center leading-none font-[lufga]">{order.items[0].product?.name} <br /> <span className="font-medium opacity-65 text-[18px]">{order.items[0].quantity / 1000}Kilo gram</span></h1>
            <p className="text-gray-600 text-[22px] font-mono">₹{order.price.grandPrice.toFixed(2)}</p>
            <div className={` ${getStatusTextColor(order.order_status)} text-[40px] leading-none font-bold absolute rotate-90 top-[70%] opacity-25 -right-20`}>
            {order.order_status.toUpperCase()}
          </div>
          <p className="text-[15px] text-gray-500 w-full text-center">
            Orderd on : {new Date(order.time).toLocaleDateString()}
          </p>
          </div>
        </div>


      </div>
    </div>
  </div>;
}
