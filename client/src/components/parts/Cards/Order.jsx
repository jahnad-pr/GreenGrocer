import React from "react";



export function Order({ navigate, index, getStatusColor, order, getStatusTextColor }) {

  return <div onClick={() => navigate('/user/OrderDetails', {
    state: order
  })} key={index} className={`duration-500 relative group  cursor-pointer hover:scale-[0.98] max-w-[280px]`}>
    {/* {order.items.length > 1 && <div className={`absolute w-full h-1/2 -left-2 shadow rounded-tl-[109px] rounded-[30px] group-hover:scale-[1.05] duration-500 -z-10 -top-2  ${getStatusColor(order.order_status)}`}></div>}
    {order.items.length > 2 && <div className={`absolute w-full h-1/2 -left-4 shadow rounded-tl-[109px] rounded-[30px] group-hover:scale-[1.10] duration-500 -z-20 -top-4 ${getStatusColor(order.order_status)}`}></div>} */}

    <div className={`flex items-center gap-4`}>

      <div className="flex-grow items-center justify-center flex flex-col">
        {order.items.length > 1 && <div className="w-16 items-center justify-center h-16 px-2 scale-50 opacity-0 group-hover:opacity-100 group-hover:scale-100 duration-500 text-center leading-none font-medium bg-[linear-gradient(45deg,#929291,#00000080)] text-white absolute flex flex-wrap left-0 top-0 rounded-full">
          <p>{order.items.length - 1} More</p>
        </div>}
        <img src={order.items[0].product?.pics?.one} alt="Order Item" className="w-[30%] min-w-[30%] max-h-[30%] min-h-[30%] object-cover rounded-[60px] translate-y-[30%] drop-shadow-2xl" />
        <div className="flex justify-between items-start ">

          <div className={`w-full flex flex-col gap-1 text-center ${getStatusColor(order.order_status)} p-6 rounded-[30px] rounded-tl-[120px] px-12 pt-12`}>
            <h1 className="font-bold text-[25px] text-center leading-none mb-2">{order.items[0].product?.name} <br /> <span className="font-thin opacity-65 text-[18px]">{order.items[0].quantity / 1000}Kilo gram</span></h1>
            <p className="text-sm text-gray-600">Total Price: ₹{order.price.grandPrice.toFixed(2)}</p>
            <div className={`font-bold ${getStatusTextColor(order.order_status)}`}>
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
