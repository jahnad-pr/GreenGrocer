import React from "react";
import MianList from "../../parts/Main/MianList";

export default function Bookmark() {
  return (
    <div className="w-[96%] h-full bg-gray-100">
      <div className="w-full h-full bg-gray-200 px-40">
        <div className="w-full h-full bg-gray-300 pt-16 overflow-y-scroll">
          {/* Main head */}
          <h1 className="text-[30px] font-bold">Bookmarks</h1>
          <p className="opacity-45 translate-y-[-9px]">2 totel bookmarks</p>

          {/* menu navigator */}
          <div className="flex gap-8 text-[20px] my-10 mb-5 font-[500] relative py-3">
            <p className="">All</p>
            <p className="opacity-45">Fruits</p>
            <p className="opacity-45">Vegetables</p>
            <p className="opacity-45">Collections</p>
            <div className="w-8 h-1 bg-black absolute bottom-0"></div>
          </div>

            {/* the list of bookmarks */}
            <div className="w-full h-full bg-gray-400">
                <MianList type={"mark"} />
            </div>

        </div>
      </div>
    </div>
  );
}
