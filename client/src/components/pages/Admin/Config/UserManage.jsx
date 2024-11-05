import React, { useEffect, useState } from "react";
import pic from "../../../../assets/images/plp.png";
import place_three from "../../../../assets/images/three_place.png";
import Recents from "../../../parts/Main/Recents";
import axios from 'axios';

// import ImageCrop from "../../../parts/Main/imageCrop"
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetCategoriesMutation,
  useGetCollectionsMutation,
  useUploadImagesMutation,
  useUpsertProductsMutation,
} from "../../../../services/adminApi";
import ImagePicker from "../../../parts/popups/ImgaePicker";
import { motion, AnimatePresence } from "framer-motion";

const ProductManage = () => {
  const navigator = useNavigate();

  // Hook to get categories
  const [ getCategories, { isLoading: catLoading, error: catError, data: catData }, ] = useGetCategoriesMutation();
  const [ getCollections, { isLoading: collLoading, error: collError, data: collData }, ] = useGetCollectionsMutation();
  const [ uploadImages, { isLoading: imgLoading, error: imgError, data: imgData }, ] = useUploadImagesMutation();
  const [upsertProducts, { isLoading, error, data }] = useUpsertProductsMutation();

  const [action, setAction] = useState("add");
  const [popup, showPopup] = useState(false);
  const [images, setImageUrls] = useState(false);
  const [Urls, SetUrls] = useState({});
  const [upsert, setUpsert] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    productCollection: "",
    description: "",
    regularPrice: "",
    salePrice: "",
    stock: "",
    freshness: "Fresh",
    harvestedTime: new Date().toISOString().slice(0, 16), // Set current date and time
    from: "",
  });

  // to get the date and time
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const location = useLocation();

  useEffect(() => {
    setFormData({ ...location.state.product });
    if (location.state.product) {
      setAction("update");
    }
  }, [location]);

  useEffect(() => {
  }, [catData]);

  // Fetch categories and collections on component mount
  useEffect(() => {
    (async () => {
      await getCategories().unwrap();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await getCollections().unwrap();
    })();
  }, []);

  // Update formData when an input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
          
          
          // setFormData((prevData)=>({ ...formData,pics:{
          //   ...prevData?.pics,
          //   [key]:data?.value
          // } }))

          SetUrls((prevData)=>({ ...prevData,[key]:data?.url }))


          if(index===2){
            setUpsert(true)
          }

      } catch (error) {
          console.error('Upload error:', error);
      }
  }
}

useEffect(()=>{
  console.log(Urls);
  
  if(upsert){
    // const id = location?.state?.product?._id || ''
    // const pics = { one:images[0], two:images[1], three:images[2] }
    // const upsertData = { ...formData,pics }
    (async()=>{
      await upsertProducts({ formData , id:'' , action:'add',Urls }).unwrap();
    })()
  }
},[upsert])


  const upsertproduct = async (id, action) => {
    await uploadImagess(images[0],0)
    await uploadImagess(images[1],1)
    await uploadImagess(images[2],2)
    // pics:{ one:images[0],two:images[1],three:images[2] }
    // const upsertData = { ...formData }
    
  };

  return (
    <>
          {
            popup &&
            <ImagePicker imageses={images}  setImageUrls={setImageUrls} showPopup={showPopup} />

          }
      <div className="container w-[100%] h-full pt-[56px] my-8 relative">
        <div className="w-full h-full bg-[radial-gradient(circle_at_10%_10%,_rgb(237,248,255)_0%,rgba(255,0,0,0)_100%);] rounded-tl-[65px] flex justify-center relative">
          <div className="">
            {/* Head */}
            <span className="flex justify-center items-center flex-col my-8">
              <h1 className="text-[30px] font-bold">Update Product Details</h1>
              <p className="text-center opacity-45 px-80">
                This message prompts the admin to carefully review and confirm
                any updates to a product's details. It serves as a final check
                to ensure accuracy in pricing, descriptions, and inventory
                before the changes are saved and displayed to users.
              </p>
            </span>

            <span className="inline-flex h-full w-full gap-10 justify-center items-center mt-16">
              {/* Image picker */}
              <span className="flex max-w-[40%] flex-col items-center self-start">
                {images && (
                  <>
                    <img onClick={() => showPopup(true)} className="w-40 h-40 mb-10 rounded-2xl" src={images[0]} alt="" />
                    <img onClick={() => showPopup(true)} className="w-40 h-40 mb-10 rounded-2xl" src={images[1]} alt="" />
                    <img onClick={() => showPopup(true)} className="w-40 h-40 mb-10 rounded-2xl" src={images[2]} alt="" />
                  </>
                )}
                {!images && (
                  <img
                    onClick={() => showPopup(true)}
                    className="w-[60%] border-2 border-gray-300 border-dashed rounded-3xl m-5"
                    src={place_three}
                    alt=""
                  />
                )}
              </span>

              <span className="h-full">
                {/* Editor */}
                <div className="flex-1 h-10 w-full flex flex-col items-center gap-5">
                  {/* Product Name */}
                  <div className="flex-col flex gap-1">
                    <label
                      className="font-bold opacity-55 w-full max-w-[410px] ml-2"
                      htmlFor="productName"
                    >
                      Product Name
                    </label>
                    <input
                      className="w-full outline-none min-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#BFD3E0,#f5efef)] rounded-full text-[18px]"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter product name"
                    />
                  </div>

                  {/* Category and Collection */}
                  <div className="flex gap-8">
                    <span className="flex flex-col flex-1 gap-1">
                      <label className="font-bold opacity-55 w-full max-w-[420px] ml-2">
                        Category
                      </label>
                      <select
                        className="w-52 py-3 px-5 rounded-full text-[18px] custom-selecter bg-[#BFD3E0]"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
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

                    <span className="flex flex-col flex-1 gap-1">
                      <label className="font-bold opacity-55 w-full max-w-[420px] ml-2">
                        Collection
                      </label>
                      <select
                        className="w-52 py-3 px-5 rounded-full text-[18px] custom-selecter bg-[#BFD3E0]"
                        name="productCollection"
                        value={formData.collection}
                        onChange={handleChange}
                      >
                        {collData?.data?.map(
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

                  {/* Description */}
                  <div className="flex-col flex gap-1">
                    <label className="font-bold opacity-55 w-full min-w-[450px] ml-2">
                      Description
                    </label>
                    <input
                      className="w-full outline-none max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#BFD3E0,#f5efef)] rounded-[20px] text-[18px] pb-20"
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter description"
                    />
                  </div>

                  {/* Regular Price and Sale Price */}
                  <div className="flex gap-8">
                    <span className="flex flex-col gap-1">
                      <label className="font-bold opacity-55 w-full max-w-[200px] ml-2">
                        Regular Price
                      </label>
                      <input
                        className="w-full outline-none max-w-[200px] py-3 px-5 bg-[linear-gradient(45deg,#BFD3E0,#f5efef)] rounded-full text-[18px]"
                        type="text"
                        name="regularPrice"
                        value={formData.regularPrice}
                        onChange={handleChange}
                        placeholder="Enter regular price"
                      />
                    </span>

                    <span className="flex flex-col gap-1">
                      <label className="font-bold opacity-55 w-full max-w-[200px] ml-2">
                        Sale Price
                      </label>
                      <input
                        className="w-full outline-none max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#BFD3E0,#f5efef)] rounded-full text-[18px]"
                        type="text"
                        name="salePrice"
                        value={formData.salePrice}
                        onChange={handleChange}
                        placeholder="Enter sale price"
                      />
                    </span>
                  </div>
                </div>
              </span>

              {/* Stock, Freshness, Harvested Time, and From */}
              <span className="flex flex-col gap-5 items-center self-start">
                {/* Stock */}
                <span className="flex flex-col gap-1">
                  <label className="font-bold opacity-55 w-full max-w-[200px] ml-2">
                    Stock in gram
                  </label>
                  <input
                    className="w-full outline-none max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#BFD3E0,#f5efef)] rounded-full text-[18px]"
                    type="text"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Enter stock quantity"
                  />
                </span>

                {/* Freshness */}
                <span className="flex flex-col gap-1">
                  <label className="font-bold opacity-55 w-full max-w-[420px] ml-2">
                    Freshness
                  </label>
                  <select
                    className="w-[250px] py-3 px-5 rounded-full text-[18px] custom-selecter bg-[#BFD3E0]"
                    name="freshness"
                    value={formData.freshness}
                    onChange={handleChange}
                  >
                    <option value="Fresh">Fresh</option>
                    <option value="Harvested">Harvested</option>
                  </select>
                </span>

                {/* Harvested Time */}
                <span className="flex flex-col gap-1">
                  <label className="font-bold opacity-55 w-full max-w-[420px] ml-2">
                    Harvested Time
                  </label>
                  <input
                    className="w-[250px] py-3 px-5 rounded-full text-[18px] custom-selecter bg-[#BFD3E0]"
                    type="datetime-local"
                    name="harvestedTime"
                    value={formatDate(formData.harvestedTime)}
                    onChange={handleChange}
                  />
                </span>

                {/* From */}
                <span className="flex flex-col gap-1">
                  <label className="font-bold opacity-55 w-full max-w-[420px] ml-2">
                    From
                  </label>
                  <input
                    className="w-full outline-none max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#BFD3E0,#f5efef)] rounded-full text-[18px]"
                    type="text"
                    name="from"
                    value={formData.from}
                    onChange={handleChange}
                    placeholder="Enter source location"
                  />
                </span>

                <button
                  onClick={() =>
                    upsertproduct(
                      action === "update" ? formData._id : "",
                      action
                    )
                  }
                  className="px-0 py-[15px] bg-[linear-gradient(to_left,#8CC850,#1F9C64)] text-[18px] rounded-full text-white font-medium mt-5 w-full max-w-[300px]"
                >
                  Update
                </button>

                <div
                  onClick={() => navigator(-1)}
                  className="flex absolute top-8 left-10 items-center justify-center bg-red opacity-55 hover:text-[59A5D4] hover:opacity-100 cursor-pointer"
                >
                  <i className="ri-arrow-left-s-fill text-[35px]"></i>
                  <p className="text-[18px] translate-y-[-2px] font-medium">
                    Products
                  </p>
                </div>
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductManage;
