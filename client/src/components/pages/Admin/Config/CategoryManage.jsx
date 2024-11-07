import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, X } from "lucide-react";
import { 
  useGetCollectionsMutation, 
  useGetProductsMutation, 
  useUpsertCategoryMutation 
} from "../../../../services/adminApi";


const CategoryManager = () => {
  // State management
  const [categoryData, setCategoryData] = useState({});
  const [dropdownStates, setDropdownStates] = useState({
    products: false,
    collections: false
  });
  const [selectedItems, setSelectedItems] = useState({
    products: [],
    collections: []
  });
  const [validationError, setValidationError] = useState("");

  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const [upsertCategory] = useUpsertCategoryMutation();


  // Update form data when location state changes
  useEffect(() => {
    if (location?.state?.item) {
      setCategoryData(location.state.item);
    }
  }, [location]);

  // Event Handlers
  const handleInputChange = ({ target: { name, value } }) => {
    setCategoryData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemSelection = (type, item) => {
    if (!selectedItems[type].some(selected => selected._id === item._id)) {
      setSelectedItems(prev => ({
        ...prev,
        [type]: [...prev[type], item]
      }));
      setDropdownStates(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleItemRemoval = (type, itemId) => {
    setSelectedItems(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item._id !== itemId)
    }));
  };

  const handleCategoryUpdate = async () => {
    if (!categoryData.name?.trim()) {
      setValidationError("Category name is required");
      return;
    }

    try {
      const payload = {
        ...categoryData,
        items: {
          products: selectedItems.products.map(p => p._id),
          collections: selectedItems.collections.map(c => c._id)
        }
      };
      await upsertCategory(payload).unwrap();
      navigate('/admin/category');
    } catch (error) {
      setValidationError("Failed to update category");
    }
  };

  return (
    <div className="container w-[75%] h-full pt-[56px] my-8 relative">
      <div className="w-full h-full bg-[radial-gradient(circle_at_0%_1%,_rgb(182_233_175)_0%,_rgb(173,216,230,50%)_30%,_rgba(255,0,0,0)_100%)] rounded-tl-[65px] flex justify-center relative transition-all duration-300">
        {/* Back Navigation */}
        <button
          onClick={() => navigate('/admin/category')}
          className="absolute top-8 left-10 flex items-center opacity-55 hover:text-[#59A5D4] hover:opacity-100 transition-all duration-200"
        >
          <span className="text-[35px]">←</span>
          <span className="text-[18px] -translate-y-[2px] font-medium">Categories</span>
        </button>

        <div className="max-w-2xl w-full px-4">
          <header className="text-center my-8">
            <h1 className="text-3xl font-bold mb-2">Manage Category</h1>
            <p className="text-gray-600">
              Manage category details, products, and collections
            </p>
          </header>

          <div className="space-y-6">
            {/* Category Name Input */}
            <div>
              <label className="font-bold text-gray-600 block mb-2">
                Category Name
              </label>
              <input
                name="name"
                value={categoryData?.name || ""}
                onChange={handleInputChange}
                className="w-full outline-none py-3 px-5 bg-gradient-to-r from-[#BFD3E0] to-[#f5efef] rounded-full text-lg transition-all duration-200"
                placeholder="Enter category name"
              />
              {validationError && (
                <p className="text-red-600 mt-2">{validationError}</p>
              )}
            </div>


            {/* Update Button */}
            <button
              onClick={handleCategoryUpdate}
              className="w-full max-w-[300px] py-[15px] bg-gradient-to-l from-[#8CC850] to-[#1F9C64] text-white font-medium rounded-full transition-all duration-300 hover:opacity-90 mx-auto block"
            >
              Update Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;