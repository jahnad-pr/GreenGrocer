import React from "react";
import {
  ArrowLeft,
  Home,
  Video,
  ShoppingBag,
  Bookmark,
  ShoppingCart,
  User,
} from "lucide-react";

const OrderList = () => {
  const orders = [
    {
      item: {
        name: "Gala Apple",
        weight: "1KG",
        category: "Fruit",
        price: "291",
        image: "/api/placeholder/64/64",
      },
      date: "24 - 10 - 2024",
      orderNumber: "#1MS-SSIE-4D",
      shipTo: "Shalu",
      status: "PROCESSING",
      total: "291",
      timeInfo: "Order Complete Within 2 hour",
      actionButton: (
        <button className="px-4 py-1 border border-gray-300 rounded-full hover:bg-gray-100">
          Cancel
        </button>
      ),
    },

    {
      item: {
        name: "Njalipovan banana",
        weight: "1.5KG",
        category: "Fruit",
        price: "64",
        image: "/api/placeholder/64/64",
      },
      date: "22 - 10 - 2024",
      orderNumber: "#9HS-YYIE-4O",
      shipTo: "Shalu",
      status: "DELIVERED",
      total: "64",
      timeInfo: "2 days ago",
      actionButton: (
        <button className="px-4 py-1 border border-gray-300 rounded-full hover:bg-gray-100">
          Return
        </button>
      ),
    },
    {
      item: {
        name: "Cabbage",
        weight: "2KG",
        category: "Vegetable",
        price: "66",
        image: "/api/placeholder/64/64",
      },
      date: "05 - 10 - 2024",
      orderNumber: "#7HS-MMIE-7D",
      shipTo: "Shalu",
      status: "CANCELED",
      total: "66",
      timeInfo: "2 weeks ago",
      actionButton: (
        <button className="px-4 py-1 bg-teal-600 text-white rounded-full hover:bg-teal-700">
          Buy Again
        </button>
      ),
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "PROCESSING":
        return "bg-yellow-50";
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
    switch (status) {
      case "PROCESSING":
        return "text-yellow-700";
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

  return (
    <div className="w-full max-w-[96%] mx-auto p-4">
      <div className="w-full h-full px-40">
        {/* Main Content */}
        <main className="mt-8">

          <h1 className="text-2xl font-medium mb-6">Manage your orders</h1>

          <div className="space-y-4">
            {orders.map((order, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg mb-4 ${getStatusColor(
                  order.status
                )}`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={order.item.image}
                    alt={order.item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                  <div className="flex-grow flex">
                    <div className="flex justify-between items-start min-w-[30%]">
                      <div className="">
                        <h3 className="font-medium text-lg">
                          {order.item.name}{" "}
                          <span className="text-gray-600">
                            {order.item.weight}
                          </span>
                        </h3>
                        <p className="text-sm text-gray-600">
                          Category: {order.item.category}
                        </p>
                        <p className="text-sm text-gray-600">
                          Price: ₹{order.item.price} inc GST
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center text-sm">
                      <div className="grid grid-cols-3 gap-8">
                        <div>
                          <p className="text-gray-600">Order Date</p>
                          <p className="font-medium">{order.date}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Order Number</p>
                          <p className="font-medium">{order.orderNumber}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Ship to</p>
                          <p className="font-medium">{order.shipTo}</p>
                        </div>
                      </div>
                    </div>
                    <span className="flex-1"></span>
                    <div className="text-right mx-10">
                      <div
                        className={`font-medium ${getStatusTextColor(
                          order.status
                        )}`}
                      >
                        {order.status === "PROCESSING" && "PROCESSING..."}
                        {order.status === "ON THE WAY" && "ON THE WAY..."}
                        {order.status === "DELIVERED" && "DELIVERED"}
                        {order.status === "CANCELED" && "CANCELED"}
                      </div>
                      <p className="text-xs text-gray-500">{order.timeInfo}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      {order.total && (
                        <div className="text-right">
                          <p className="text-gray-600">Total</p>
                          <p className="font-medium">₹{order.total}</p>
                        </div>
                      )}
                    </div>
                      <div className="min-w-[15%] flex justify-end items-center">
                      {order.actionButton}

                      </div>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderList;
