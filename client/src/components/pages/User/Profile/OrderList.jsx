import { Order } from './../../../parts/Cards/Order';
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

  // initiate and sort the orders
  useEffect(()=>{ 
    if(data){ 
    setOrders( datas =>
      [...data].sort((a, b) => {
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);
        return dateB - dateA;
      })
    )  
    }
   },[data])


  const getStatusColor = (status) => {
    switch (status.toUpperCase()) {
      case "PROCESSED":
        return "bg-[linear-gradient(45deg,#c7ccd660_30%,#d3d3d190_70%)]";
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
    <div className="h-full w-full max-w-[96%] flex">
      {/* <div className=" mix-blend-screen absolute w-full h-full"></div> */}
      <div className="w-full h-full px-40 backdrop-blur-3xl overflow-hidden">
        {/* Main Content */}
        { orders.length>0 ?
        <main className="pt-8 h-full overflow-y-auto pb-20">
          <h1 className="text-[30px] font-bold mb-8 top-0 backdrop-blur-md p-4 z-10">Manage your orders</h1>
          <div className="flex flex-wrap gap-4">
            {orders?.map((order, index) => (

              <Order order={order}  navigate={navigate} index={index} getStatusColor={getStatusColor} name={name} getStatusTextColor={getStatusTextColor}  />

            ))}
          </div>
        </main>:<EmptyState />

        }
      </div>
    </div>
  );
};

export default OrderList;
