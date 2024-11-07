import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Component imports
import ImagePicker from "../../../parts/popups/ImgaePicker";

// API hooks
import {
  useGetCategoriesMutation,
  useGetProductsMutation,
  useUpsertCollectionMutation,
} from "../../../../services/adminApi";

// Assets
import placeholderImage from "../../../../assets/images/three_place.png";

// Constants
const UPLOAD_ENDPOINT = 'http://localhost:3333/admin/uploadImages';
const INITIAL_FORM_STATE = {
  name: "",
  category: "Fruit",
  description: "",
  colorPrimary: "",
  colorSecondary: "",
};

const CollectionManage = () => {
  // API Mutations
  const [upsertCollection] = useUpsertCollectionMutation();
  const [getCategories, { data: categoriesData }] = useGetCategoriesMutation();
  const [getProducts, { data: productsData }] = useGetProductsMutation();

  // Local State
  const [isProductSelectorOpen, setProductSelectorOpen] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [collectionImage, setCollectionImage] = useState(null);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);

  // Router hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize form data from location state
  useEffect(() => {
    if (location.state?.item) {
      setFormState(location.state.item);
    }
  }, [location]);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await Promise.all([
          getCategories().unwrap(),
          getProducts().unwrap()
        ]);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      }
    };
    
    fetchInitialData();
  }, []);

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const toggleProductSelection = (productId) => {
    setSelectedProductIds(prev => {
      const isSelected = prev.includes(productId);
      return isSelected 
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
    });
  };

  const convertBase64ToFile = (base64Data, filename) => {
    const [header, content] = base64Data.split(',');
    const mimeType = header.match(/:(.*?);/)[1];
    const binaryContent = atob(content);
    const byteArray = new Uint8Array(binaryContent.length);

    for (let i = 0; i < binaryContent.length; i++) {
      byteArray[i] = binaryContent.charCodeAt(i);
    }

    return new File([byteArray], filename, { type: mimeType });
  };

  const uploadImage = async (base64Image) => {
    if (!base64Image) return null;

    const formData = new FormData();
    formData.append('file', convertBase64ToFile(base64Image, 'collection.png'));

    try {
      const { data } = await axios.post(UPLOAD_ENDPOINT, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return data?.url;
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    }
  };

  const handleCollectionUpdate = async () => {
    try {
      const imageUrl = await uploadImage(collectionImage?.[0]);
      
      const collectionData = {
        ...formState,
        pic: imageUrl,
        products: [...new Set(selectedProductIds)],
      };

      await upsertCollection(collectionData).unwrap();
      navigate('/admin/Collection');
    } catch (error) {
      console.error('Failed to update collection:', error);
    }
  };

  return (
    <>
      {showImagePicker && (
        <ImagePicker
          imageses={collectionImage}
          maxImages={1}
          setImageUrls={setCollectionImage}
          showPopup={setShowImagePicker}
        />
      )}

      <div className="container w-[105%] h-full pt-[56px] my-8 relative">
        <div className="w-full h-full bg-[radial-gradient(circle_at_10%_10%,_rgb(222,255,247)_0%,rgba(255,0,0,0)_100%);] rounded-tl-[65px] flex justify-center relative">
          {/* Back Navigation */}
          <div 
            onClick={() => navigate("/admin/Collection")}
            className="absolute top-8 left-10 flex items-center cursor-pointer opacity-55 hover:text-[#59A5D4] hover:opacity-100 transition-all duration-300"
          >
            <i className="ri-arrow-left-s-fill text-[35px]" />
            <p className="text-[18px] -translate-y-[2px] font-medium">
              Collections
            </p>
          </div>

          <div className="w-full h-full">
            {/* Header Section */}
            <div className="flex justify-center items-center flex-col my-8">
              <h1 className="text-[30px] font-bold">Manage Collection</h1>
              <p className="text-center opacity-45 px-80">
                Admins can edit collection details, including changing the
                collection name, updating descriptions, and adjusting associated
                products. Ensure all information is accurate to maintain a clear
                and organized structure.
              </p>
            </div>

            {/* Main Content */}
            <div className="flex max-w-[55%] mx-auto">
              {/* Image Section */}
              <div className="mt-20">
                <img
                  onClick={() => setShowImagePicker(true)}
                  className="w-[80%] border-2 border-gray-300 border-dashed rounded-3xl m-5 mr-10 cursor-pointer transition-transform hover:scale-105"
                  src={collectionImage?.[0] || placeholderImage}
                  alt="Collection"
                />
              </div>

              {/* Form Section */}
              <div className="flex-1">
                <div className="flex flex-col gap-5">
                  {/* Collection Name Input */}
                  <div className="flex flex-col gap-1">
                    <label className="font-bold opacity-55 ml-2">
                      Collection Name
                    </label>
                    <input
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      className="outline-none min-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#AAEACD,#f5efef)] rounded-full text-[18px] transition-all focus:shadow-lg"
                      placeholder="Enter collection name"
                    />
                  </div>

                  {/* Category Select */}
                  <div className="flex gap-8">
                    <div className="flex flex-col gap-1 flex-1">
                      <label className="font-bold opacity-55 ml-2">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formState.category}
                        onChange={handleInputChange}
                        className="w-[450px] py-3 px-5 rounded-full text-[18px] custom-selecter bg-[#AAEACD] transition-all focus:shadow-lg"
                      >
                        {categoriesData?.data
                          ?.filter(cat => cat.isListed)
                          .map(category => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))
                        }
                      </select>
                    </div>
                  </div>

                  {/* Description and Product Selection */}
                  <div className="flex gap-4">
                    <div className="flex flex-col flex-1">
                      <label className="font-bold opacity-55 ml-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formState.description}
                        onChange={handleInputChange}
                        className="outline-none w-[225px] py-3 px-5 bg-[linear-gradient(45deg,#AAEACD,#f5efef)] rounded-[20px] text-[18px] min-h-[120px] transition-all focus:shadow-lg"
                        placeholder="Enter description"
                      />
                    </div>

                    {/* Product Selector */}
                    <div className="relative">
                      <div
                        onClick={() => setProductSelectorOpen(!isProductSelectorOpen)}
                        className="w-48 h-32 bg-[#b9ebd4] p-3 flex flex-col gap-3 rounded-[30px] cursor-pointer mt-5 transition-transform hover:scale-105"
                      >
                        <div className="w-full h-24 bg-gray-100 rounded-[25px] overflow-hidden">
                          <img 
                            src="https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-3foodgroups_fruits_detailfeature.jpg?sfvrsn=64942d53_4" 
                            alt="Products" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="font-medium text-[14px] text-center">Add Product</p>
                      </div>

                      {/* Product Dropdown */}
                      {isProductSelectorOpen && (
                        <div className="absolute top-full mt-2 w-64 bg-white rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                          {productsData?.data?.map(product => (
                            <div
                              key={product._id}
                              onClick={() => toggleProductSelection(product._id)}
                              className={`
                                flex items-center gap-3 p-3 cursor-pointer
                                transition-colors duration-200
                                ${selectedProductIds.includes(product._id) 
                                  ? 'bg-green-50' 
                                  : 'hover:bg-gray-100'
                                }
                              `}
                            >
                              <img
                                src={product.pics.one}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <span className="flex-1 font-medium">
                                {product.name}
                              </span>
                              {selectedProductIds.includes(product._id) && (
                                <div className="w-4 h-4 rounded-full bg-green-500" />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Color Inputs */}
                  <div className="flex gap-8">
                    {['Primary', 'Secondary'].map(colorType => (
                      <div key={colorType} className="flex flex-col gap-1">
                        <label className="font-bold opacity-55 ml-2">
                          Color {colorType}
                        </label>
                        <input
                          name={`color${colorType}`}
                          value={formState[`color${colorType}`]}
                          onChange={handleInputChange}
                          className="outline-none w-[200px] py-3 px-5 bg-[linear-gradient(45deg,#AAEACD,#f5efef)] rounded-full text-[18px] transition-all focus:shadow-lg"
                          placeholder={`Enter ${colorType.toLowerCase()} color`}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Update Button */}
                  <button
                    onClick={handleCollectionUpdate}
                    className="px-0 py-[15px] bg-[linear-gradient(to_left,#8CC850,#1F9C64)] text-[18px] rounded-full text-white font-medium mt-5 w-full max-w-[300px] transition-transform hover:scale-105"
                  >
                    Update Collection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionManage;