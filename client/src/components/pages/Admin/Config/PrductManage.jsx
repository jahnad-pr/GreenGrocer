import React, { useEffect, useState } from "react";
import pic from "../../../../assets/images/plp.png";
import place_three from "../../../../assets/images/three_place.png";
import Recents from "../../../parts/Main/Recents";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useGetCategoriesMutation,
  useGetCollectionsMutation,
  useUploadImagesMutation,
  useUpsertProductsMutation,
} from "../../../../services/Admin/adminApi";
import ImagePicker from "../../../parts/popups/ImgaePicker";
import { useLocation, useNavigate } from "react-router-dom";

const ProductManage = () => {
  const navigator = useNavigate();

  const [getCategories, { data: catData }] = useGetCategoriesMutation();
  const [getCollections, { data: collData }] = useGetCollectionsMutation();
  const [upsertProducts, { isLoading, error,data }] = useUpsertProductsMutation();

  const [action, setAction] = useState("add");
  const [popup, showPopup] = useState(false);
  const [images, setImageUrls] = useState(false);
  const [urls, setUrl] = useState({});
  const [isChanged, setChaged] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    productCollection: "",
    description: "",
    regularPrice: null,
    salePrice: null,
    stock: "",
    freshness: "fresh",
    harvestedTime:new Date().toISOString().slice(0, 16),
    from: "",
  });

  const location = useLocation();

  // Set formData if updating an existing product
  useEffect(() => {
    if (location.state.product&&location.state.product.name) {
      setFormData( location.state.product );
      setImageUrls([[location.state.product.pics.one],[location.state.product.pics.two],[location.state.product.pics.three] ])
      setAction("update");
    }
  }, [location]);

  // Fetch categories and collections on component mount
  useEffect(() => {
    getCategories();
    getCollections();
  }, []);

  // Update formData when an input changes
  const handleChange = (e,pos=0) => {
    const { name, value } = e.target;
    if(name==='regularPrice'||name==='salePrice'){
      setFormData((prevData) => ({ ...prevData, [name]: Number(value) }));
    }else{
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  useEffect(()=>{
    // console.log(data?.category);
    
    setFormData((prevData)=>({ ...prevData, productCollection:collData?.data?.filter((data)=> formData.category._id === data.category_id )  }))
  },[formData.category])


  const isValidCategoryName = (name) => {
    // Ensure only letters and spaces, and a minimum of 4 characters
    const minCharacters = name?.trim().length >= 4;
    const noNumbersOrSymbols = /^[A-Za-z\s]+$/.test(name);
    return noNumbersOrSymbols && minCharacters;
  };

  const isInvalidDescription = (name) => {
    // Ensure only letters and spaces, and a minimum of 4 characters
    const minCharacters = name?.trim().length >= 4;
    // const noNumbersOrSymbols = /^[A-Za-z\s]+$/.test(name);
    return minCharacters;
  };

  const isInvalidOrganization = (name) => {
    // Ensure only letters and spaces, and a minimum of 4 characters
    const minCharacters = name?.trim().length >= 4;
    // const noNumbersOrSymbols = /^[A-Za-z\s]+$/.test(name);
    return minCharacters;
  };

  // Validation function for product data
  const validateFormData = (data) => {

    if(!isValidCategoryName(data.name.trim())){
      return "Product name must contain at least 4 letters and no numbers or symbols."
    } else  if (!data.name.trim()){
      return "Product name is required."
    }
      
    if (!data.category) return "Category is required.";
    // if (!data.productCollection) return "Collection is required.";

    if(!isInvalidDescription(data.description.trim())){
      return "Description must contain atleast three words."
    } else  if (!data.description.trim()) return "Description is required.";

    if (!data.regularPrice || data.regularPrice <= 0)
      return "Enter a valid regular price.";

    if (!data.salePrice || data.salePrice <= 0)
      return "Enter a valid sale price.";

    if (data.salePrice > data.regularPrice){
      // console.log(data.salePrice,'>',data.regularPrice);
      return "Sale price should be less than regular price.";
    }      

    // if (!data.stock || data.stock <= 0) return "Enter a valid stock quantity.";

    if(!isInvalidOrganization(data.from.trim())){
      return "Organization must contain atleast 4 letters and no numbers or symbols."
    } else  if (!data.from.trim()) return "Source location is required.";
    
    if (!images || images.length < 3) return "Please select 3 images.";
    return "";
  };

  // Show toast notification
  const showToast = (message, type = "success") => {
    if (type === "success") {
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // useEffect(() => {
  //   if (error?.data?.message) {
  //     showToast(error.data.message, "error");
  //   }
  // }, [error]);

  useEffect(()=>{  

    if(collData?.data[0]&&!formData.productCollection){
      setFormData((prevData)=>({ ...prevData, productCollection:collData?.data[0]._id }))
    }
    if(catData?.data[0]&&!formData.category){
      setFormData((prevData)=>({ ...prevData, category:catData?.data[0]._id }))
    }
    },[catData,collData])


  useEffect(() => {
    if (error?.data?.message) {
      showToast(error.data.message, "error");
    }
  }, [error]);
  
  useEffect(() => {
    if (data?.message) {
      navigator('/admin/Products',{ state:{ message:data.message,status:'success' } })
      // navigator('/admin/Products',{ state:{message:'Collection created successfully',status:'success'} });
    }
  }, [data]);

  // Convert base64 to file for uploading
  const base64ToFile = (dataUrl, filename) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  // Upload image files
  async function uploadImages(base64Images, index) {
    const key = index === 0 ? "one" : index === 1 ? "two" : "three";
    if (base64Images) {
      const file = base64ToFile(base64Images, "profile.png");
      const formData = new FormData();
      formData.append("file", file);
      try {
        const { data } = await axios.post(
          import.meta.env.VITE_IMAGE_UPLOAD_URL,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setUrl((prevData)=>({ ...prevData,[key]:data?.url  }));
        
      } catch (error) {
        console.error("Upload error:", error);
        showToast("Image upload failed", "error");
      }
    }
  }

  useEffect(()=>{ Object.values(urls).length>=3?actuallUpload():'' },[urls])

  function areObjectsEqual(obj1, obj2) {
    // Check if both objects have the same number of keys
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false;
    }
    
  
    // Check if values for the same keys are equal
    for (let key in obj1) {
      if (obj1.hasOwnProperty(key)) {
        // If the key doesn't exist in obj2, return false
        if (!obj2.hasOwnProperty(key)) {
          return false;
        }
  
        // If values are not the same, return false
        if (obj1[key] !== obj2[key]) {
          return false;
        }
      }
    }
  
    // If all checks pass, the objects are equal
    return true;
  }

  function checkObjectValues(obj) {
    const isEmpty = Object.values(obj).every(
      (value) =>
        value === null ||
        value === undefined ||
        value === "" ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "object" &&
          !Array.isArray(value) &&
          Object.keys(value).length === 0)
    );

    return isEmpty ? false : true;
  }

  const actuallUpload = async()=>{

    let upsertData = {}

    if(!formData?.pics || setImageUrls[0]){

    upsertData = { ...formData, pics:urls };

    }else{

    upsertData = { ...formData };
    }

    if(action==='update'&&areObjectsEqual(upsertData,location.state.product)&&!isChanged){
      return showToast('Nothing Changed','error')
    }

    

    try {

      await upsertProducts({ formData: upsertData, action });


    } catch (error) {
      console.error("Product update error:", error);

    }
  }

  const handleFormSubmit = async () => {

    if (checkObjectValues(formData)) {
      
      const errors = validateFormData(formData);
      
      if (errors) {
        return showToast(errors, "error");
      }

        if(!formData?.pics || setImageUrls[0]){
          await Promise.all( Object.values(images).map((img, idx) => uploadImages(img, idx)) );
        }else{
          actuallUpload()
        }
      

    } else {
      showToast("please fill the fields", "error");
    }
  };

  return (
    <>
      <ToastContainer position="bottom-left" />
      {popup && (
        <ImagePicker
        setChaged={setChaged}
          maxImages={3}
          imageses={images}
          setImageUrls={setImageUrls}
          showPopup={showPopup}
        />
      )}
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
                    <img
                      onClick={() => showPopup(true)}
                      className="w-40 h-40 mb-10 rounded-2xl"
                      src={images[0]}
                      alt=""
                    />
                    <img
                      onClick={() => showPopup(true)}
                      className="w-40 h-40 mb-10 rounded-2xl"
                      src={images[1]}
                      alt=""
                    />
                    <img
                      onClick={() => showPopup(true)}
                      className="w-40 h-40 mb-10 rounded-2xl"
                      src={images[2]}
                      alt=""
                    />
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
                        value={formData.productCollection}
                        onChange={handleChange}
                      >
                        {collData?.data?.map(
                          (option) =>
                            option.category === formData.category &&
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
                        type="number"
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
                        type="number"
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
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Enter stock quantity"
                  />
                  { formData?.stock&&
                    <p>{formData?.stock/(formData?.stock>=1000?1000:1)}{formData?.stock>=1000?'KG':'gram'}</p>
                    
                  }
                </span>

                {/* Freshness */}
                <span className="flex flex-col gap-1">
                  <label className="font-bold opacity-55 w-full max-w-[420px] ml-2">
                    Freshness
                  </label>
                  <select
                    className="w-[250px] py-3 px-5 rounded-full text-[18px] custom-selecter bg-[#BFD3E0]"
                    name="freshness"
                    value={FormData.freshness}
                    onChange={handleChange}
                  >
                    <option value="Fresh">Fresh</option>
                    <option value="Harvested">Harvested</option>
                  </select>
                </span>

                {/* Harvested Time */}
                {   formData.freshness === 'Harvested' &&

                <span className="flex flex-col gap-1">
                  <label className="font-bold opacity-55 w-full max-w-[420px] ml-2">
                    Harvested Time
                  </label>
                  <input
                    className="w-[250px] py-3 px-5 rounded-full text-[18px] custom-selecter bg-[#BFD3E0]"
                    type="datetime-local"
                    name="harvestedTime"
                    value={new Date(formData.harvestedTime).toISOString().slice(0, 16)}
                    onChange={handleChange}
                  />
                </span>
                }

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
                  onClick={handleFormSubmit}
                  className="px-0 py-[15px] bg-[linear-gradient(to_left,#8CC850,#1F9C64)] text-[18px] rounded-full text-white font-medium mt-5 w-full max-w-[300px]"
                >
                  {isLoading
                    ? "Saving..."
                    : action === "update"
                    ? "Update Product"
                    : "Add Product"}
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
