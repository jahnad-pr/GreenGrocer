import React, { useEffect, useState } from "react";
import { useUpsertCategoryMutation } from "../../../../services/adminApi";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, X } from "lucide-react";

const CategoryManage = () => {
  const [formData, setForm] = useState({});
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showCollectionDropdown, setShowCollectionDropdown] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);

  const Navigator = useNavigate();
  const [upsertCategory] = useUpsertCategoryMutation();
  const location = useLocation();

  const products = [
    { id: 1, name: "Apple", image: "/api/placeholder/50/50" },
    { id: 2, name: "Banana", image: "/api/placeholder/50/50" },
    { id: 3, name: "Orange", image: "/api/placeholder/50/50" },
  ];

  const collections = [
    { id: "01", name: "Summer Fruit", image: "/api/placeholder/50/50" },
    { id: "02", name: "Spicy Veg", image: "/api/placeholder/50/50" },
  ];

  useEffect(() => {
    setForm({ ...location.state.item });
  }, [location]);

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setForm({ ...formData, [name]: value });
  };

  const upsertCategorys = async () => {
    await upsertCategory(formData).unwrap();
  };

  const handleProductSelect = (product) => {
    setSelectedProducts((prev) => [...prev, product]);
    setShowProductDropdown(false);
  };

  const handleCollectionSelect = (collection) => {
    setSelectedCollections((prev) => [...prev, collection]);
    setShowCollectionDropdown(false);
  };

  const removeProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId));
  };

  const removeCollection = (collectionId) => {
    setSelectedCollections(selectedCollections.filter((c) => c.id !== collectionId));
  };

  const ProductDropdown = ({ show, onClose }) => {
    if (!show) return null;

    return (
      <div className="absolute z-10 left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Select Product</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
              <X size={16} />
            </button>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductSelect(product)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <span>{product.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const CollectionDropdown = ({ show, onClose }) => {
    if (!show) return null;

    return (
      <div className="absolute z-10 left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Select Collection</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
              <X size={16} />
            </button>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {collections.map((collection) => (
              <div
                key={collection.id}
                onClick={() => handleCollectionSelect(collection )}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <span>{collection.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container w-[75%] h-full pt-[56px] my-8 relative">
      <div className="w-full h-full bg-[radial-gradient(circle_at_0%_1%,_rgb(182_233_175)_0%,_rgb(173,216,230,50%)_30%,_rgba(255,0,0,0)_100%)] rounded-tl-[65px] flex justify-center relative">
        <div className="">
          {/* Head */}
          <span className="flex justify-center items-center flex-col my-8">
            <h1 className="text-[30px] font-bold">Manage Category</h1>
            <p className="text-center opacity-45 px-80">
              Admins can edit Category details, including changing the Category
              name, updating descriptions, and adjusting associated products.
            </p>
          </span>

          <span className="flex h-full w-full gap-20 justify-center items-center mt-16">
            <span className="h-full flex flex-col items-center justify-center">
              <div className="flex-1 h-10 w-full flex flex-col items-center gap-5">
                {/* Name Input */}
                <div className="flex-col flex gap-1">
                  <label className="font-bold opacity-55 w-full max-w-[410px] ml-2">
                    Product Name
                  </label>
                  <input
                    name="name"
                    value={formData?.name}
                    onChange={inputHandler}
                    className="w-full outline-none min-w-[500px] py-3 px-5 bg-[linear-gradient(45deg,#BFD3E0,#f5efef)] rounded-full text-[18px]"
                    type="text"
                    placeholder="Category name"
                  />
                </div>

                <div className="flex gap-8">
                  {/* Products Section */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative">
                      <div
                        onClick={() => setShowProductDropdown(!showProductDropdown)}
                        className="w-28 h-32 bg-red-500 p-3 items-center justify-center flex flex-col gap-3 rounded-[30px] cursor-pointer hover:opacity-90"
                      >
                        <div className="w-full h-24 bg-gray-100 rounded-[25px] flex items-center justify-center">
                          <ChevronDown size={24} />
                        </div>
                        <p className="font-medium text-[14px]">Add Product</p>
                      </div>
                      <ProductDropdown
                        show={showProductDropdown}
                        onClose={() => setShowProductDropdown(false)}
                      />
                    </div>
                    {/* Selected Products Box */}
                    <div className="w-64 h-32 border-[2px] border-red-400 rounded-[30px] p-3 overflow-y-auto">
                      <p className="text-sm font-semibold mb-2">Selected Products</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedProducts.map((product) => (
                          <div key={product.id} className="flex items-center bg-red-100 rounded-full px-2 py-1">
                            <img src={product.image} alt={product.name} className="w-4 h-4 rounded-full mr-1" />
                            <span className="text-xs text-red-800">{product.name}</span>
                            <button
                              onClick={() => removeProduct(product.id)}
                              className="ml-1 hover:bg-red-200 rounded-full p-1"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Collections Section */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative">
                      <div
                        onClick={() => setShowCollectionDropdown(!showCollectionDropdown)}
                        className="w-28 h-32 bg-green-500 p-3 items-center justify-center flex flex-col gap-3 rounded-[30px] cursor-pointer hover:opacity-90"
                      >
                        <div className="w-full h-24 bg-gray-100 rounded-[25px] flex items-center justify-center">
                          <ChevronDown size={24} />
                        </div>
                        <p className="font-medium text-[14px]">Add Collection</p>
                      </div>
                      <CollectionDropdown
                        show={showCollectionDropdown}
                        onClose={() => setShowCollectionDropdown(false)}
                      />
                    </div>
                    {/* Selected Collections Box */}
                    <div className="w-64 h-32 border-[2px] border-green-400 rounded-[30px] p-3 overflow-y-auto">
                      <p className="text-sm font-semibold mb-2">Selected Collections</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedCollections.map((collection) => (
                          <div key={collection.id} className="flex items-center bg-green-100 rounded-full px-2 py-1">
                            <img src={collection.image} alt={collection.name} className="w-4 h-4 rounded-full mr-1" />
                            <span className="text-xs text-green-800">{collection.name}</span>
                            <button
                              onClick={() => removeCollection(collection.id)}
                              className="ml-1 hover:bg-green-200 rounded-full p-1"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="mt-6">
                  <button
                    onClick={upsertCategorys}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryManage;
