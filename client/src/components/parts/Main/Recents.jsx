import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Recents() {
  const navigate = useNavigate();
  const location = useLocation();

  const data = [
    {
      profile:
        "data:image/jpeg;base64,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",
      name: "jahanad",
      time: "1 min ago",
      price: "₹3,035",
    },
    {
      profile:
        "data:image/jpeg;base64,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",
      name: "jahanad",
      time: "1 min ago",
      price: "₹3,035",
    },
  ];

  return (
    <div className="w-[25%] h-full px-10 py-[86px]">
      {location.pathname.startsWith("/admin/Category") && (
        <div
          onClick={() => navigate("/admin/Category/manage", { state: { name: "" } }) }
          className=" bg-[linear-gradient(to_left,#b9e9b5,#d1ebe8)] my-6 flex  gap-5 items-center justify-center rounded-full" >
          <i className="ri-align-item-vertical-center-line text-[35px]"></i>
          <p className="text-[20px] font-medium">Add Category</p>
        </div>
      )}

      {location.pathname.startsWith("/admin/Collection") && (
        <div
          onClick={() => navigate("/admin/Collection/manage", { state: { name: "" } }) }
          className=" bg-[linear-gradient(to_left,#e2fff8,#e7f4f7)] my-6 flex  gap-5 items-center justify-center rounded-full" >
          <i className="ri-layout-2-line text-[35px]"></i>
          <p className="text-[20px] font-medium">Add Collection</p>
        </div>
      )}

      {location.pathname.startsWith("/admin/Products") && (
        <div
          onClick={() => navigate("/admin/Products/manage", { state: { name: false } }) }
          className=" bg-[linear-gradient(to_left,#e2fff8,#e7f4f7)] my-6 flex  gap-5 items-center justify-center rounded-full" >
          <i className="ri-layout-2-line text-[35px]"></i>
          <p className="text-[20px] font-medium">Add Products</p>
        </div>
      )}


      <h1 className="text-[30px] font-bold my-5 mb-5">Recent Orders</h1>

      <span className="flex flex-col gap-5">
        {data.map((data, index) => {
          return (
            <div
              key={index}
              className="w-full flex items-center gap-2 bg-green-200 pl-2 py-3 pr-10 rounded-[41px]"
            >
              <img
                className="w-16 h-16 rounded-full object-cover"
                src={data.profile}
                alt=""
              />
              <span className="flex flex-col flex-1">
                <p className="font-bold text-[18px]">{data.name}</p>
                <p className="opacity-45">{data.time}</p>
              </span>
              <p className="text-[20px] font-bold">{data.price}</p>
            </div>
          );
        })}
      </span>
    </div>
  );
}
