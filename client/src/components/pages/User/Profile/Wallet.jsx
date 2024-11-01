import React from "react";
import coin from "../../../../assets/images/coin.png";

export default function Wallet() {
  const transactions = [
    {
      description: "For The Nikkah",
      date: "22 - 10 - 2024",
      amount: "₹ 10,000",
      transactionId: "SSDJKFIOWETJNDSF4",
    },
    {
      description: "Week 02 Oct 2024",
      date: "10 - 10 - 2024",
      amount: "₹ 1500",
      transactionId: "HJDJKLIOWETJNDS87",
    },
  ];

  return (
    <div className="w-[96%] h-full">
      <div className="w-full h-full px-80 flex flex-col items-center gap-5">
        {/* Head */}
        <h1 className="text-[30px] font-bold my-10 mt-16">Wallet and Coin </h1>

        {/* coin config */}
        <div className="w-full h-56 flex py-10 gap-10 items-center justify-center duration-500">

          {/* statics */}
          <div className="h-full w-[50%] bg-[linear-gradient(45deg,#ffde97,#eae4e3)] rounded-[40px] duration-500 hover:mx-20 scale-125 hover:scale-125 flex gap-10 items-center py-5 px-10 relative">
            {/* coin count */}
            <img className="h-full" src={coin} alt="" />
            <div className="">
              <p className="text-[35px] font-bold">550</p>
              <p className="translate-y-[-10px] opacity-45">Coins</p>
            </div>
            {/* indian conversion */}
            <div className="flex gap-5 items-center">
              <p className="text-[35px] text-gray-500">
                ₹<span className="font-bold text-black">55</span>
              </p>
              <p className="leading-none font-medium opacity-45">
                Indian
                <br />
                rupees
              </p>
              <p className="absolute text-[130px] right-10 opacity-15">₹</p>
            </div>
          </div>

          {/* add coin */}
          <div className="h-full w-[30%] bg-[linear-gradient(45deg,#eeffe8,#eae4e3)] hover:mx-20 duration-500 ml-16 hover:scale-125 relative overflow-hidden py-3 flex items-center rounded-[40px]">
            <img className="h-full rotate-6 grayscale-[30%]" src={coin} alt="" />
            <p className="absolute text-[230px] top-[-95px] left-10 opacity-15">
              ₹
            </p>
            <div className="">
              <p className="text-[35px] font-bold">Add Coin</p>
              <p className="translate-y-[-10px] opacity-45">
                buy coins by purchase
              </p>
            </div>
          </div>
        </div>

        {/* History of transaction */}
        <h1 className="text-[30px] font-bold my-10 mt-16 w-full">
          Transaction History
        </h1>

        {/* table */}
        <div className=" w-full mx-auto">
          <div className="bg-white rounded-lg">

            {/* Head row */}
            <div className="grid grid-cols-4 gap-4 p-4 text-sm text-gray-900 mb-6">
              <div className="text-[20px] font-bold">Description</div>
              <div className="text-[20px] font-bold">Date</div>
              <div className="text-[20px] font-bold">Amount</div>
              <div className="text-[20px] font-bold">Transaction ID</div>
            </div>

            {/* Itmes / rows */}
            <div className="divide-y">
              {transactions.map((transaction, index) => (
                <div
                  key={transaction.transactionId}
                  className="grid grid-cols-4 gap-4 p-4 text-sm hover:bg-gray-50"
                >
                  <div className="text-gray-900 text-[20px] font-medium opacity-70">{transaction.description}</div>
                  <div className="text-gray-500 text-[20px]">{transaction.date}</div>
                  <div className="text-gray-600 text-[20px] font-bold">{transaction.amount}</div>
                  <div className="text-gray-500 text-[20px] font-mono">
                    {transaction.transactionId}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
