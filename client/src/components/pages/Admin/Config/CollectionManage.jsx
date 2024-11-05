import React, { useEffect, useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import place_three from "../../../../assets/images/three_place.png";
import {
  useGetCategoriesMutation,
  useGetProductsMutation,
  useUpsertCollectionMutation,
} from "../../../../services/adminApi";
import ImagePicker from "../../../parts/popups/ImgaePicker";
import axios from "axios";

const CollectionManage = () => {
  const [upsertCollection, { isLoading, error, data }] =
    useUpsertCollectionMutation();
  const [
    getCategories,
    { isLoading: catLoading, error: catError, data: catData },
  ] = useGetCategoriesMutation();
  const [
    getProducts,
    { isLoading: proLoading, error: proError, data: proData },
  ] = useGetProductsMutation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [image, setImage] = useState();
  const [popup, showPopup] = useState(false);
  const [Url, SetUrl] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    category: "Fruit",
    description: "",
    colorPrimary: "",
    colorSecondary: "",
  });

  // Sample product data
  const [products] = useState([
    { id: 1, name: "Apple", image: "/api/placeholder/50/50" },
    { id: 2, name: "Orange", image: "/api/placeholder/50/50" },
    { id: 3, name: "Banana", image: "/api/placeholder/50/50" },
    { id: 4, name: "Mango", image: "/api/placeholder/50/50" },
  ]);

  const Navigator = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setFormData({ ...location.state.item });
  }, [location]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    getCategories().unwrap();
    getProducts().unwrap();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleProductSelection = (product) => {
    setSelectedProducts((prev) => {
      const isSelected = prev.find((p) => p._id === product._id);
      if (isSelected) {
        return prev.filter((p) => p._id !== product._id);
      } else {
        return [...prev, product._id];
      }
    });
  };

  // Convert base64 to file for uploading
const base64ToFile = (dataUrl, filename) => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

  async function uploadImagess(base64Images,index) {

    const key = index===0?'one':index===1?'two':index===2?'three':""

    if (base64Images) {

      const file = base64ToFile(base64Images, 'profile.png');
      // setFile(file);
      
      const formData = new FormData();
      formData.append('file', file);

      try {
          const { data } = await axios.post('http://localhost:3333/admin/uploadImages', formData, { headers: { 'Content-Type': 'multipart/form-data', }, });
          
         return data?.url

      } catch (error) {
          console.error('Upload error:', error);
      }
  }
}

  // add or update collection
  const upsertCollections = async () => {
    const url = await uploadImagess(image[0])
    const upsertData = {
      ...formData,
      pic:url,
      products: [...new Set(selectedProducts)],
    };
    await upsertCollection(upsertData).unwrap();
  };


  useEffect(()=>{
    console.log(image);
    
  },[image])

  return (
    <>
      {popup && (
        <ImagePicker
          imageses={image}
          maxImages={1}
          setImageUrls={setImage}
          showPopup={showPopup}
        />
      )}
      <div className="container w-[105%] h-full pt-[56px] my-8 relative">
        <div className="w-full h-full bg-[radial-gradient(circle_at_10%_10%,_rgb(222,255,247)_0%,rgba(255,0,0,0)_100%);] rounded-tl-[65px] flex justify-center relative">
          <div className="w-full h-full">
            <span className="flex justify-center items-center flex-col my-8">
              <h1 className="text-[30px] font-bold">Manage Collection</h1>
              <p className="text-center opacity-45 px-80">
                Admins can edit collection details, including changing the
                collection name, updating descriptions, and adjusting associated
                products. Ensure all information is accurate to maintain a clear
                and organized structure. Save changes to implement the updates
                across the platform immediately.
              </p>
            </span>

            <div className=" flex max-w-[55%] mx-auto">
              <div className="mt-20">
                {!image && (
                  <img
                    onClick={() => showPopup(true)}
                    className="w-[80%] border-2 border-gray-300 border-dashed rounded-3xl m-5 mr-10"
                    src={place_three}
                    alt=""
                  />
                )}
                {
                  image && 
                  <img
                    onClick={() => showPopup(true)}
                    className="w-[80%] border-2 border-gray-300 border-dashed rounded-3xl m-5 mr-10"
                    src={image[0]}
                    alt=""
                  />
                }
              </div>

              <div className="">
                <div className="flex-1 h-10 w-full flex flex-col items-center gap-5">
                  <div className="flex-col flex gap-1">
                    <label className="font-bold opacity-55 w-full max-w-[410px] ml-2">
                      Collection Name
                    </label>
                    <input
                      name="name"
                      value={formData.collectionName}
                      onChange={handleChange}
                      className="w-full outline-none min-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#AAEACD,#f5efef)] rounded-full text-[18px]"
                      type="text"
                      placeholder="Enter collection name"
                    />
                  </div>

                  <div className="flex gap-8">
                    <span className="flex flex-col flex-1 gap-1">
                      <label className="font-bold opacity-55 w-full max-w-[420px] ml-2">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-[450px] py-3 px-5 rounded-full text-[18px] custom-selecter bg-[#AAEACD]"
                      >
                        {catData?.data?.map(
                          (option) =>
                            option.isListed && (
                              <option key={option._id} value={option._id}>
                                {option.name}
                              </option>
                            )
                        )}
                      </select>
                    </span>
                  </div>

                  <div className="flex">
                    <div className="w-full min-w-[225px] flex flex-col">
                      <label className="font-bold opacity-55 w-full min-w-[225px] ml-2">
                        Description
                      </label>
                      <input
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full outline-none max-w-[225px] py-3 px-5 bg-[linear-gradient(45deg,#AAEACD,#f5efef)] rounded-[20px] text-[18px] pb-20"
                        type="text"
                        placeholder="Enter description"
                      />
                    </div>

                    <div className="relative">
                      <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-48 h-32 bg-[#b9ebd4] p-3 items-center justify-center flex flex-col gap-3 rounded-[30px] cursor-pointer mt-5"
                      >
                        <div className="w-full h-24 bg-gray-100 rounded-[25px] overflow-hidden">{
                          }
                          <img src="https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-3foodgroups_fruits_detailfeature.jpg?sfvrsn=64942d53_4" alt="" />
                        </div>
                        <p className="font-medium text-[14px]">Add Product</p>
                      </div>

                      {/* Dropdown Menu */}
                      {isDropdownOpen && (
                        <div className="absolute top-full mt-2 w-64 bg-white rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                          {proData?.data?.map((product, index) => (
                            <div
                              key={index}
                              onClick={() => toggleProductSelection(product)}
                              className={`flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer ${
                                selectedProducts.find(
                                  (p) => p._id === product._id
                                )
                                  ? "bg-green-50"
                                  : ""
                              }`}
                            >
                              <img
                                src={product.pics.one}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <span className="flex-1 font-medium">
                                {product.name}
                              </span>
                              {selectedProducts.find(
                                (p) => p._id === product._id
                              ) && (
                                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-8">
                    <span className="flex flex-col gap-1">
                      <label className="font-bold opacity-55 w-full max-w-[200px] ml-2">
                        Color Primary
                      </label>
                      <input
                        name="colorPrimary"
                        value={formData.colorPrimary}
                        onChange={handleChange}
                        className="w-full outline-none max-w-[200px] py-3 px-5 bg-[linear-gradient(45deg,#AAEACD,#f5efef)] rounded-full text-[18px]"
                        type="text"
                        placeholder="Enter primary color"
                      />
                    </span>

                    <span className="flex flex-col gap-1">
                      <label className="font-bold opacity-55 w-full max-w-[200px] ml-2">
                        Color Secondary
                      </label>
                      <input
                        name="colorSecondary"
                        value={formData.colorSecondary}
                        onChange={handleChange}
                        className="w-full outline-none max-w-[200px] py-3 px-5 bg-[linear-gradient(45deg,#AAEACD,#f5efef)] rounded-full text-[18px]"
                        type="text"
                        placeholder="Enter secondary color"
                      />
                    </span>
                  </div>

                  <button
                    onClick={upsertCollections}
                    className="px-0 py-[15px] bg-[linear-gradient(to_left,#8CC850,#1F9C64)] text-[18px] rounded-full text-white font-medium mt-5 w-full max-w-[300px]"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>

            <div
              onClick={() => Navigator("/admin/Collection")}
              className="flex absolute top-8 left-10 items-center justify-center bg-red opacity-55 hover:text-[59A5D4] hover:opacity-100 cursor-pointer"
            >
              <i className="ri-arrow-left-s-fill text-[35px]"></i>
              <p className="text-[18px] translate-y-[-2px] font-medium">
                Collections
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionManage;
