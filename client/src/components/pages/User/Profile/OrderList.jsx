import { Order } from './../../../parts/Cards/Order';
import React, { useEffect, useState } from "react";
import { useDeleteAddressMutation, useGetOdersMutation } from "../../../../services/User/userApi";
import emptyStateImage from "../../../../assets/images/noCAtegory.png";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';

const OrderList = ({userData}) => {
  const [ getOders, { isLoading, error, data }, ] = useGetOdersMutation();
  const [orders,setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{ if(userData){ getOders(userData._id) } },[userData]);

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
  },[data]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status.toUpperCase()) {
      case "PROCESSED":
        return "bg-[linear-gradient(45deg,#7082b4_30%,#738c7c)]";
        case "SHIPPED":
        return "bg-[linear-gradient(45deg,#ebaf8a,#738c7c)]";
      case "PENDING":
        return "bg-[linear-gradient(45deg,#ebe88a,#738c7c)]";
      case "DELIVERED":
        return "bg-[linear-gradient(45deg,#99eb8a,#738c7c)]";
      case "CANCELLED":
        return "bg-[linear-gradient(45deg,#eb8ab9,#738c7c)]";
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
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[90vh] flex items-center justify-center flex-col text-center gap-5"
    >
      <motion.img 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 10
        }}
        className="h-[70%]" 
        src={emptyStateImage} 
        alt="No categories" 
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-2"
      >
        <motion.h1 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-[30px] font-bold"
        >
          No Orders
        </motion.h1>
        <motion.p 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1 }}
          className="opacity-45"
        >
          Now your order list empty, to make the order buy products
        </motion.p>
        <motion.p
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/user/products", { state: { name: "" } })}
          className="font-bold opacity-100 text-blue-500 cursor-pointer"
        >
          Let's Buy
        </motion.p>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full w-full max-w-[96%] flex bg-[#f2f2f2]"
    >
      <motion.div 
        initial={{ backdropFilter: "blur(0px)" }}
        animate={{ backdropFilter: "blur(8px)" }}
        transition={{ duration: 0.5 }}
        className="w-full h-full px-40 backdrop-blur-3xl overflow-hidden"
      >
        {orders.length > 0 ? (
          <motion.main 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="pt-8 h-full overflow-y-auto pb-20"
          >
            <motion.h1 
              variants={headerVariants}
              className="text-[30px] font-bold mb-8 top-0 backdrop-blur-md p-4 z-10 font-[lufga]"
            >
              Manage your orders
            </motion.h1>
            <motion.div 
              variants={containerVariants}
              className="flex flex-wrap gap-4"
            >
              <AnimatePresence>
                {orders?.map((order, index) => (
                  <motion.div
                    key={order.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Order 
                      order={order}
                      navigate={navigate}
                      index={index}
                      getStatusColor={getStatusColor}
                      getStatusTextColor={getStatusTextColor}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.main>
        ) : (
          <EmptyState />
        )}
      </motion.div>
    </motion.div>
  );
};

export default OrderList;
