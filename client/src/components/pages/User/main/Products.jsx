import React, { useEffect, useState } from "react";
import List from "../../../parts/Main/List";
import {
  useGetCategoriesMutation,
  useGetCAtegoryCollctiionsMutation,
  useGetCAtegoryProductsMutation,
  useGetCollectionsMutation,
} from "../../../../services/User/userApi";
import Product from "../../../parts/Cards/Product";
import { useNavigate } from "react-router-dom";
import CollectionCard from "../../../parts/Cards/Collection";

export default function Products({ userData }) {
  const [cPosition, setPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const navigator = useNavigate();

  const [getCategories, { isLoading: catLoading, data: catData }] = useGetCategoriesMutation();
  const [getCAtegoryCollctiions, { data: CollData }] = useGetCAtegoryCollctiionsMutation();
  const [getCAtegoryProducts, { data: proData }] = useGetCAtegoryProductsMutation();

  const [productsData, setProductData] = useState([]);

  useEffect(() => {
    (async () => {
      await getCategories().unwrap();
    })();
  }, []);

  useEffect(() => {
    if (proData) {
      setFadeOut(false);
      setProductData(proData);
      setIsLoading(false);
    }
  }, [proData]);

  const handleCategoryChange = async (index) => {
    if (index === cPosition || isLoading) return;
    setFadeOut(true);
    setIsLoading(true);
    setTimeout(() => {
      setPosition(index);
    }, 300);
  };

  useEffect(() => {
    if (catData?.data) {
      (async () => {
        await getCAtegoryProducts(catData?.data[cPosition]._id).unwrap();
        await getCAtegoryCollctiions(catData?.data[cPosition]._id).unwrap();
      })();
    }
  }, [catData, cPosition]);

  return (
    <div className="w-[96%] h-full bg-[#f2f2f2]">
      <div className="w-full h-full backdrop-blur-3xl pl-40">
        <div className="w-full h-full pt-16 overflow-y-scroll">
          <h1 className="text-[30px] font-bold">Shop</h1>

          {/* menu navigator */}
          <div className="flex text-[20px] my-10 font-[500] relative py-3">
            {catData?.data?.map((data, index) => {
              return data.isListed && (
                <p
                  key={index}
                  style={{
                    opacity: cPosition === index ? "100%" : "40%",
                    cursor: isLoading ? "wait" : "pointer",
                  }}
                  onClick={() => handleCategoryChange(index)}
                  className={`w-28 transition-opacity duration-300 ${
                    isLoading ? "pointer-events-none" : ""
                  }`}
                >
                  {data.name}
                </p>
              );
            })}
            <div
              style={{ left: `${112 * cPosition}px` }}
              className={`w-16 h-1 duration-500 bg-[#00000050] absolute bottom-0`}
            />
          </div>

          {/* Collections Section */}
          <div
            className={`transition-all duration-300 ${
              fadeOut ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
            }`}
          >
            {CollData?.data?.length > 0 && (
              <>
                <h1 className={`text-[30px] font-semibold mt-20`}>
                  Collections
                </h1>
                <div className="w-full h-auto flex my-5 mt-12 gap-5 relative">
                  {productsData?.data?.length > 14 && (
                    <div
                      onClick={() =>
                        navigator(`/user/collection/${catData?.data[cPosition].name}/products`, {
                          state: {
                            products: CollData?.data,
                            action: "collections",
                            title: `Collections of ${catData?.data[cPosition].name}`,
                          },
                        })
                      }
                      className="px-8 items-center justify-center group flex duration-500 absolute font-medium right-0 top-[-65px] py-2 bg-[linear-gradient(to_left,#52aa5799,#14532d)] hover:scale-125 text-white tex-[20px] gap-2 rounded-l-[10px] rounded-bl-[20px]"
                    >
                      <p className="duration-500">VIEW ALL</p>
                      <i className="ri-arrow-right-line rounded-full overflow-hidden -translate-x-5 opacity-0 text-[25px] group-hover:translate-x-0 group-hover:opacity-100 duration-500"></i>
                    </div>
                  )}
                  {CollData?.data?.map((data, index) => {
                    if (data.isListed) {
                      return <CollectionCard key={index} type={"collection"} data={data} pos={index} />;
                    }
                  })}
                </div>
              </>
            )}

            {/* Products Section */}
            {productsData?.data?.length > 0 && (
              <>
                <h1 className={`text-[30px] font-semibold mt-20`}>
                  Products
                </h1>
                <div className="w-full h-auto flex my-5 mt-8 gap-5 mb-80 relative flex-wrap">
                  {productsData?.data?.length > 14 && (
                    <div
                      onClick={() =>
                        navigator(`/user/collection/${catData?.data[cPosition].name}/products`, {
                          state: {
                            products: CollData?.data,
                            action: "collections",
                            title: `Collections of ${catData?.data[cPosition].name}`,
                          },
                        })
                      }
                      className="px-8 items-center justify-center group flex duration-500 absolute font-medium right-0 top-[-65px] py-2 bg-[linear-gradient(to_left,#52aa5799,#14532d)] hover:scale-125 text-white tex-[20px] gap-2 rounded-l-[10px] rounded-bl-[20px]"
                    >
                      <p className="duration-500">VIEW ALL</p>
                      <i className="ri-arrow-right-line rounded-full overflow-hidden -translate-x-5 opacity-0 text-[25px] group-hover:translate-x-0 group-hover:opacity-100 duration-500"></i>
                    </div>
                  )}
                  {productsData?.data?.map((data, index) => {
                    return <Product userData={userData} key={index} type={"product"} data={data} pos={index} />;
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
