import React, { useEffect, useState } from "react";
import { useGetCollectionsMutation, useGetProductsMutation, useUpsertCategoryMutation } from "../../../../services/adminApi";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, X } from "lucide-react";

const CategoryManage = () => {
  const [formData, setForm] = useState();
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showCollectionDropdown, setShowCollectionDropdown] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  
  const Navigator = useNavigate();
  const [upsertCategory] = useUpsertCategoryMutation();
  const [getCollections,{ isLoading:colllLooading,error:collEroor,data:CollData }] = useGetCollectionsMutation();
  const [getProducts, { isLoading: proLoading, error: proError, data: proData }, ] = useGetProductsMutation();
  const location = useLocation();

  // Sample products data (replace with your actual data)
  const products = [
    { id: 1, name: "Apple", image: "/api/placeholder/50/50" },
    { id: 2, name: "Banana", image: "/api/placeholder/50/50" },
    { id: 3, name: "Orange", image: "/api/placeholder/50/50" },
  ];


  useEffect(() => {
    setForm({ ...location.state.item });
    console.log(location.state.item.items.collections);
    setSelectedCollections(location.state.item.items.collections)
    setSelectedProducts(location.state.item.items.products)
  }, [location]);

  useEffect(()=>{
    (async()=>{
      getCollections().unwrap()
      getProducts().unwrap()
    })()
  },[])

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setForm({ ...formData, [name]: value });
  };

  const upsertCategorys = async () => {
    const products = selectedProducts.map((data)=> data._id )
    const collections = selectedCollections.map((data)=> data._id )
    const upsertData = { ...formData,items:{ products,collections} }
    await upsertCategory(upsertData).unwrap();
  };

  const handleProductSelect = (product) => {
    if(!selectedProducts.includes(product)){
      setSelectedProducts([...new Set(selectedProducts), product]);
      setShowProductDropdown(false);

    }
  };

  const handleCollectionSelect = (collection) => {
    if(!selectedCollections.includes(collection)){
    setSelectedCollections([...new Set(selectedCollections), collection]);
    setShowCollectionDropdown(false);
    }
  };

  const removeProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p._id !== productId));
  };

  const removeCollection = (collectionId) => {
    setSelectedCollections(selectedCollections.filter(c => c._id !== collectionId));
  };

  const Dropdown = ({ items, onSelect, show, onClose, title }) => {
    if (!show) return null;

    return (
      <div className="absolute z-10 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Select {title}</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
              <X size={16} />
            </button>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelect(item)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                <img
                  src={item.pic || item.pics.one}
                  alt={item.name}
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container w-[75%] h-full pt-[56px] my-8 relative">
        <div className="w-full h-full bg-[radial-gradient(circle_at_0%_1%,_rgb(182_233_175)_0%,_rgb(173,216,230,50%)_30%,_rgba(255,0,0,0)_100%)] rounded-tl-[65px] flex justify-center relative">
          <div className="">
            {/* Head */}
            <span className="flex justify-center items-center flex-col my-8">
              <h1 onClick={()=>{ console.log(selectedCollections,selectedProducts);
               }} className="text-[30px] font-bold">Manage Category</h1>
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

                  {/* <span className="flex gap-5 relative">

                    <span className="flex flex-col gap-8">

                    {/* Add Product Button */}
                    {/* <div className="relative">
                      <div
                        onClick={() => setShowProductDropdown(!showProductDropdown)}
                        className="w-28 h-32 bg-[#bdeabd] p-3 items-center justify-center flex flex-col gap-3 rounded-[30px] cursor-pointer hover:opacity-90"
                      >
                        <div className="w-full h-24 bg-gray-100 rounded-[25px] flex items-center justify-center overflow-hidden">
                        <img className="h-full" src="https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-3foodgroups_fruits_detailfeature.jpg?sfvrsn=64942d53_4" alt="" />
                          <ChevronDown size={24} />
                        </div>
                        <p className="font-medium text-[14px]">Add Product</p>
                      </div>
                      <Dropdown
                        items={proData?.data}
                        onSelect={handleProductSelect}
                        show={showProductDropdown}
                        onClose={() => setShowProductDropdown(false)}
                        title="Product"
                      />
                    </div>

                    {/* Collection Button */}
                    {/* <div className="relative">
                      <div
                        onClick={() => setShowCollectionDropdown(!showCollectionDropdown)}
                        className="w-28 h-32 bg-[#a2d3d3] p-3 items-center justify-center flex flex-col gap-3 rounded-[30px] cursor-pointer hover:opacity-90"
                      >
                        <div className="w-full h-24 bg-gray-100 rounded-[25px] flex items-center justify-center overflow-hidden">
                        <img className="h-[100%]" src="https://as2.ftcdn.net/v2/jpg/01/91/27/77/1000_F_191277716_tRLBK7L3YqmILp2MOxYjbrrkGw1v50Ho.jpg" alt="" />
                          <ChevronDown size={24} />
                        </div>
                        <p className="font-medium text-[14px]">Collection</p>
                      </div>
                      <Dropdown
                        items={CollData?.data}
                        onSelect={handleCollectionSelect}
                        show={showCollectionDropdown}
                        onClose={() => setShowCollectionDropdown(false)}
                        title="Collection"
                      />
                    </div> 
                    </span> */}

                    {/* <span className="flex flex-col gap-8">

                    {/* Selected Items Display */}
                    {/* <div className="h-48 w-80 border-[2px] border-green-400 rounded-3xl p-2 pt-3 overflow-y-auto">
                      {selectedProducts.map(product => (
                        <div key={product.id} className="flex items-center gap-2 mb-2 border-dashed border-2 boder black">
                          <img src={product.pic || product.pics.one} alt={product.name} className="w-10 h-10 rounded-lg" />
                          <span className=" tetx-[22px] font-medium">{product.name}</span>
                          <button
                            onClick={() => removeProduct(product._id)}
                            className="ml-auto p-1 hover:bg-gray-100 rounded-full"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="h-48 w-80 border-[2px] border-blue-400 rounded-3xl p-2 pt-3 overflow-y-auto">
                      {selectedCollections.map(collection => (
                        <div key={collection.id} className="flex items-center gap-2 mb-2">
                          <img src={collection.pic || collection?.pics?.one} alt={collection.name} className="w-10 h-10  rounded-lg" />
                          <span className="tetx-[22px] font-medium">{collection.name}</span>
                          <button
                            onClick={() => removeCollection(collection._id)}
                            className="ml-auto p-1 hover:bg-gray-100 rounded-full"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div> */}
                    {/* </span>

                  </span> */}
                    
                  <button
                    onClick={upsertCategorys}
                    className="px-0 py-[15px] bg-[linear-gradient(to_left,#8CC850,#1F9C64)] text-[18px] rounded-full text-white font-medium mt-5 w-full max-w-[300px]"
                  >
                    Update
                  </button>
                </div>
              </span>
            </span>

            {/* Back Navigation */}
            <div
              onClick={() => Navigator('/admin/category')}
              className="flex absolute top-8 left-10 items-center justify-center bg-red opacity-55 hover:text-[59A5D4] hover:opacity-100 cursor-pointer"
            >
              <i className="ri-arrow-left-s-fill text-[35px]"></i>
              <p className="text-[18px] translate-y-[-2px] font-medium">
                Categories
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryManage;