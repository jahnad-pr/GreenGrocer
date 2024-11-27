import React, { useEffect, useState } from "react";
import { useDeleteAddressMutation, useGetOdersMutation } from "../../../../services/User/userApi";
import emptyStateImage from "../../../../assets/images/noCAtegory.png";
import { useNavigate } from "react-router-dom";


const OrderList = ({userData}) => {

  const [ getOders, { isLoading, error, data }, ] = useGetOdersMutation();

  const [orders,setOrders] = useState([])

  const navigate = useNavigate()

  // useEffect(()=>getOders(),[])

  useEffect(()=>{ if(userData){ getOders(userData._id) } },[userData])

  useEffect(()=>{ if(data){ setOrders(data) } },[data])


  const getStatusColor = (status) => {
    switch (status.toUpperCase()) {
      case "PROCESSED":
        return "bg-[linear-gradient(45deg,#c7ccd6_30%,#d3d3d1_70%)]";
        case "SHIPPED":
        return "bg-[linear-gradient(45deg,#ebaf8a35_30%,#ffffff20_70%)]";
      case "PENDING":
        return "bg-[linear-gradient(45deg,#ebe88a35_30%,#ffffff20_70%)]";
      case "DELIVERED":
        return "bg-[linear-gradient(45deg,#99eb8a35_30%,#ffffff20_70%)]";
      case "CANCELLED":
        return "bg-[linear-gradient(45deg,#eb8ab935_30%,#ffffff20_70%)]";
      default:
        return "bg-gray-50";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status.toUpperCase()) {
      case "PROCESSED":
        return "text-blue-900";
      case "SHIPPED":
        return "text-orange-700";
      case "DELIVERED":
        return "text-green-700";
      case "CANCELLED":
        return "text-red-700";
      default:
        return "text-yellow-900";
    }
  };

  const EmptyState = () => (
    <div className="w-full h-[90vh] flex items-center justify-center flex-col text-center gap-5">
      <img className="h-[70%]" src={emptyStateImage} alt="No categories" />
      <div className="flex flex-col gap-2">
        <h1 className="text-[30px] font-bold">No Orders</h1>
        <p className="opacity-45">
          Now your order list empty, to make the order buy products
        </p>
        <p
          onClick={() =>
            navigate("/user/products", { state: { name: "" } })
          }
          className="font-bold opacity-100 text-blue-500 cursor-pointer"
        >
          Let's Buy
        </p>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full max-w-[96%] flex bg-product">
      <div className="bg-[#5a52319c] mix-blend-screen absolute w-full h-full"></div>
      <div className="w-full h-full px-40 backdrop-blur-3xl">
        {/* Main Content */}
        { orders.length>0 ?
        <main className="mt-8">
          <h1 className="text-[30px] font-bold mb-16 mt-16">Manage your orders</h1>
          <div className="flex items-center gap-4 flex-wrap">
            {orders?.map((order, index) => (

              <div onClick={()=>navigate('/user/OrderDetails',{ state:order })}
                key={index}
                className={`p-4 py-8 w-[22%] duration-500 relative group shadow-2xl rounded-[20px] rounded-tl-[109px] border-2 border-[#eeeeee4d] px-10 mb-4 ${getStatusColor(order.order_status)}`}
              >
                { order.items.length > 1 && <div className={`absolute w-full h-full -left-2 shadow rounded-tl-[109px] rounded-[30px] group-hover:scale-[1.05] duration-500 -z-10 -top-2 border-2 border-[#eeeeee4d] ${getStatusColor(order.order_status)}`}></div>}
                { order.items.length > 2 && <div className={`absolute w-full h-full -left-4 shadow rounded-tl-[109px] rounded-[30px] group-hover:scale-[1.10] duration-500 -z-20 -top-4 border-2 border-[#eeeeee4d] ${getStatusColor(order.order_status)}`}></div>}

                <div className="flex items-center gap-4">

                  <div className="flex-grow items-center justify-center flex flex-col">
                    { order.items.length > 1 &&
                    <div className="w-16 items-center justify-center h-16 px-2 scale-50 opacity-0 group-hover:opacity-100 group-hover:scale-100 duration-500 text-center leading-none font-medium bg-[linear-gradient(45deg,#929291,#00000080)] text-white absolute flex flex-wrap left-0 top-0 rounded-full">
                      <p>{order.items.length-1} More</p>
                    </div>
                    }
                  <img src={order.items[0].product?.pics?.one} alt="Order Item" className="w-[60%] min-w-[60%] max-h-[60%] min-h-[60%] object-cover rounded-[60px]" />
                    <div className="flex justify-between items-start ">
                      <div className="w-full flex flex-col gap-1">
                        <h1 className="font-bold text-[25px] text-center">{order.items[0].product?.name}</h1>
                        <h3 className="font-medium text-[18px] opacity-60">
                          Item Quantity:{" "}
                          <span className="text-gray-600">{order.items[0].quantity/1000}Kg</span>
                        </h3>
                        <p className="text-sm text-gray-600">Total Price: ₹{order.price.grandPrice}</p>
                      </div>
                    </div>

                    

                    <span className="flex-1"></span>
                    <div className="text-right mx-10 flex items-center justify-center flex-col gap-1 mt-2">
                      <div
                        className={`font-medium ${getStatusTextColor(order.order_status)}`}
                      >
                        {order.order_status.toUpperCase()}
                      </div>
                      <p className="text-[15px] text-gray-500 w-full text-center">
                        Orderd on : {new Date(order.time).toLocaleDateString()}
                      </p>
                    </div>

                    
                  
                  </div>
                </div>
              </div>

            ))}
          </div>
        </main>:<EmptyState />

        }
      </div>
    </div>
  );
};

export default OrderList;
