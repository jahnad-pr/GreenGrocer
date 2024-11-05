import React, { useEffect, useState } from "react";
import pic from "../../../../assets/images/banana.png";
import Recents from "../../../parts/Main/Recents";
import { Edit2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useGetCategoriesMutation,
  useUpdateCategoryMutation,
} from "../../../../services/adminApi";
import empty from "../../../../assets/images/noCAtegory.png";

const Categories = () => {
  const [togglor, setToggler] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
  });

  const navigate = useNavigate();

  const [getCategories, { isLoading, error, data }] =
    useGetCategoriesMutation();
  const [ updateCollection, { isLoading: accessLoading, error: accessError, data: accessData }, ] = useUpdateCategoryMutation();

  // get categories
  useEffect(() => {
    (async () => {
      await getCategories().unwrap();
    })();
  }, []);

  // if that error
  useEffect(() => {
    console.log(error?.data.data);
  }, [error]);

  // update category
  const updater = async (uniqeID, updateBool, action) => {
    await updateCollection({ uniqeID, updateBool, action }).unwrap();
  };

  // to prevent reload
  useEffect(() => {
    if (data?.data) {
      data?.data?.map((cat) => {
        setToggler((prevData)=>({ ...prevData, [cat._id]: cat.isListed }));
      });
    }
  }, [data]);

  // if access updated
  useEffect(() => {
    if (accessData?.mission && accessData?.action === "access") {
      setToggler({...togglor, [accessData?.uniqeID]: !togglor[accessData?.uniqeID] });
    } else if (accessData?.action === "delete") {
      (async () => {
        await getCategories().unwrap();
      })()
    }
  }, [accessData]);

  return (
    <>
      <div className="container w-[75%] h-full pt-[56px] my-8 relative ">
        <div className=" w-full h-full bg-[radial-gradient(circle_at_0%_1%,_rgb(182_233_175)_0%,_rgb(173,216,230,50%)_30%,_rgba(255,0,0,0)_100%)] rounded-tl-[65px] flex justify-center">
          <div className="">
            {/* filter container-------------------------------- */}
            <div className="w-full h-20 flex items-center gap-8">
              {/* saerch field */}
              <div className=" bg-[#ffffff70] py-1 px-5 inline-flex gap-8 rounded-full">
                <input
                  className="bg-transparent outline-none"
                  type="text"
                  placeholder="search here"
                />
                <i className="ri-search-2-line text-[25px] text-[#1B453A]"></i>
              </div>

              {/* sort selector */}
              <div className=" bg-[#ffffff70] py-1 px-5 inline-flex gap-8 rounded-full items-center">
                <i className="ri-align-left text-[25px] text-[#1B453A]"></i>
                <p className="font-medium opacity-45">Sort by</p>
                <select
                  className="bg-transparent outline-none custom-selecter"
                  name=""
                  id=""
                >
                  <option value="">Name</option>
                  <option value="">Amount</option>
                  <option value="">Latest</option>
                  <option value="">Oldest</option>
                </select>
              </div>

              {/* order selctor */}
              <div className=" bg-[#ffffff70] py-1 px px-5 inline-flex gap-8 rounded-full items-center">
                <i className="ri-align-justify text-[25px] text-[#1B453A]"></i>
                <p className="font-medium opacity-45">Order</p>
                <select
                  className="bg-[transparent] outline-none custom-selecter"
                  name=""
                  id=""
                >
                  <option value="">Ascending</option>
                  <option value="">Descending</option>
                </select>
              </div>
            </div>

            {/* table------------------------------ */}
            <table className="w-full border-collapse rounded-full mt-5">
              <thead className="py-10">
                <tr className="bg-[linear-gradient(to_right,#60C3A850,#C5D4ED40)] rounded-full text-[#00000070] w-full">
                  <th className="px-4 py-3 text-left text-sm text-gray-600 rounded-l-full">
                    S. Number
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-gray-600">
                    Name
                  </th>
                 
                  <th className="px-4 py-3 text-left text-sm text-gray-600">
                    Action
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-gray-600 rounded-r-full">
                    Update
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>&nbsp;</p>
                  </td>
                </tr>

                {/* table contant mape---------------------------------------------------r */}

                {data?.data?.map((item, index) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-3 text-gray-900 text-[20px] font-bold">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-gray-900 text-[18px] font-medium">
                      {item.name}
                    </td>
                    {/* <td className="px-4 py-3 text-gray-600 text-[15px] font-medium">
                      {item.category} | {item.category}
                    </td>
                    <td className="px-4 py-3"> */}
                      {/* <img src={pic} alt={item.name} className="w-10 h-10 rounded-full object-cover" /> */}
                    {/* </td> */}

                    <td className="py-2 px-4 text-center inline">
                      {/* <div className="relative w-20 h-10 bg-gray-800 rounded-full shadow-lg">
                        <div className="absolute top-1/2 left-2 w-5 h-5  rounded-full transform -translate-y-1/2 transition-all duration-300"></div>
                        <div className="absolute top-1/2 right-2 w-7 h-7 bg-gray-700 rounded-full transform -translate-y-1/2"></div>
                        </div> */}
                      {
                        <div
                          onClick={() =>
                            updater(
                              item._id,
                              !togglor[item._id],
                              "access"
                            )
                          }
                          className="relative w-20 h-10 bg-gray-800 rounded-full shadow-lg"
                        >
                          <div
                            className={`absolute top-1/2 w-5 h-5 ${
                              togglor[item._id]
                                ? "left-[calc(100%_-_28px)]"
                                : "left-2"
                            } bg-gray-700  rounded-full transform -translate-y-1/2 transition-all duration-300`}
                          ></div>
                          <div
                            className={`absolute top-1/2 w-7 ${
                              togglor[item._id]
                                ? "bg-teal-400 h-5 right-[calc(100%_-_36px)]"
                                : "bg-red-700 h-2 right-2"
                            }  rounded-full transform -translate-y-1/2 duration-500`}
                          ></div>
                        </div>
                      }
                    </td>

                    <td className="4text-center">
                      <i
                        onClick={() =>
                          navigate("/admin/Category/manage", {
                            state: { item },
                          })
                        }
                        className="ri-pencil-line text-[30px] opacity-45"
                      ></i>
                      &nbsp;&nbsp;&nbsp;
                      <i
                        onClick={() =>
                          updater(item._id, !togglor[item._id], "delete")
                        }
                        className="ri-delete-bin-line text-[30px] text-[#F0491B]"
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {error?.data?.data && (
              <div className="w-full h-[60vh]  flex items-center justify-center flex-col text-center gap-5">
                <img className="h-[70%]" src={empty} alt="" />
                <span className="flex flex-col gap-2">
                  <h1 className="text-[30px] font-bold">No Greens Category</h1>
                  <span>
                    <p className="opacity-45">
                      You have the power to add the greens for poeple good
                      health. add some category of green{" "}
                    </p>
                    <p onClick={()=>navigate('/admin/Category/manage',{ state:{ name:'' } })} className="font-bold opacity-100 text-blue-500">
                      Lets go
                    </p>
                  </span>
                </span>
              </div>
            )}

            {/* pagination nav */}
            <div className="flex justify-end mt-4 absolute bottom-20 left-1/2 translate-x-[-50%]">
              <button className="bg-gray-200 hover:bg-gray-400 text-gray-500 font-bold py-2 px-6 rounded-full">
                Page 01
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full ml-2">
                <i className="ri-skip-right-line text-[22px]"></i>
              </button>
            </div>
            
          </div>
        </div>
      </div>
      <Recents />
    </>
  );
};

export default Categories;
