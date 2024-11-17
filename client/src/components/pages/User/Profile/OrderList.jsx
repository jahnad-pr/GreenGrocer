import React, { useEffect, useState } from "react";
import { useGetOdersMutation } from "../../../../services/User/userApi";
import emptyStateImage from "../../../../assets/images/noCAtegory.png";
import { useNavigate } from "react-router-dom";


const OrderList = ({userData}) => {

  const [ getOders, { isLoading, error, data }, ] = useGetOdersMutation();

  const [orders,setOrders] = useState([])

  const navigate = useNavigate()

  // useEffect(()=>getOders(),[])

  useEffect(()=>{ if(userData){ getOders(userData._id) } },[userData])

  useEffect(()=>{ if(data){ setOrders(data) } },[data])


  // const orders = [
  //   {
  //     _id: "6738e0cf21628226c9c2197a",
  //     user: "6735f552de1d4e4d47b291da",
  //     delivery_address: "67379181a3d54649ac86edf2",
  //     payment_method: "UPI",
  //     coupon: "",
  //     items: {
  //       _id: "673846705ad661e210aacef6",
  //       quantity: 1000,
  //       totalPrice: 12000,
  //       discount: 0,
  //     },
  //     price: {
  //       grandPrice: 153.3,
  //       discountPrice: 0,
  //     },
  //     order_id: "1731780815152-6PIG9U",
  //     time: "2024-11-16T18:13:35.152Z",
  //     total_quantity: 1000,
  //     order_status: "processing",
  //     payment_status: "pending",
  //   },
  // ];

  const getStatusColor = (status) => {
    switch (status.toUpperCase()) {
      case "PROCESSING":
        return "bg-[linear-gradient(45deg,#cecf9f70_30%,#ffffff20_70%)]";
      case "ON THE WAY":
        return "bg-yellow-50";
      case "DELIVERED":
        return "bg-green-50";
      case "CANCELED":
        return "bg-red-50";
      default:
        return "bg-gray-50";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status.toUpperCase()) {
      case "PROCESSING":
        return "text-yellow-900";
      case "ON THE WAY":
        return "text-yellow-700";
      case "DELIVERED":
        return "text-green-700";
      case "CANCELED":
        return "text-red-700";
      default:
        return "text-gray-700";
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

              <div
                key={index}
                className={`p-4 py-8 w-[22%] hover:scale-[0.9] duration-500 hover:shadow-2xl shadow rounded-[45px] border-2 border-[#eeeeee4d] px-10 mb-4 ${getStatusColor(order.order_status)}`}
              >
                <div className="flex items-center gap-4">

                  <div className="flex-grow items-center justify-center flex flex-col">
                  <img src={order.items.pic} alt="Order Item" className="w-[60%] object-cover rounded-[60px]" />
                    <div className="flex justify-between items-start ">
                      <div className="w-full flex flex-col gap-1">
                        <h1 className="font-bold text-[25px] text-center">{order.items.product.name}</h1>
                        <h3 className="font-medium opacity-60">
                          Item Quantity:{" "}
                          <span className="text-gray-600">{order.items.quantity/1000}Kg</span>
                        </h3>
                        <p className="text-sm text-gray-600">Total Price: ₹{order.items.totalPrice}</p>
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
