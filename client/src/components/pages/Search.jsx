import React, { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Slider } from '@mui/material';
import { useGetAllProductMutation } from '../../services/User/userApi';

const Search = () => {

    
  const [ getAllProduct, { isLoading, error, data }, ] = useGetAllProductMutation();


  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(true);
  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showProducts, setShowProducts] = useState(true);
  const [showCollections, setShowCollections] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [activeCategory, setActiveCategory] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(productData);

  // Categories limited to fruits and vegetables
  const categories = [
    'All Categories',
    'Vegetables',
    'Fruits'
  ];

  const collections = [
    'All Collections',
    'Summer Specials',
    'Fresh Arrivals',
    'Seasonal Picks',
    'Local Farmers'
  ];

  let demoProducts = []

  useEffect(()=>{ getAllProduct() },[])

  useEffect(()=>{
    if(data){
        setProductData(data)
        setFilteredProducts(data)
    }
  },[data])

   demoProducts = [
    {
      id: 1,
      name: 'Fresh Organic Tomatoes',
      category: 'Vegetables',
      collection: 'Summer Specials',
      regularPrice: 3.99,
      salePrice: 2.99,
      pic: 'https://images.unsplash.com/photo-1546470427-e26264be0b18?w=500',
      date: '2024-01-15',
      description: 'Fresh and juicy organic tomatoes'
    },
    {
      id: 2,
      name: 'Golden Apples',
      category: 'Fruits',
      collection: 'Fresh Arrivals',
      regularPrice: 2.99,
      salePrice: 1.99,
      pic: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500',
      date: '2024-01-14',
      description: 'Sweet and crispy golden apples'
    },
    {
      id: 5,
      name: 'Organic Carrots',
      category: 'Vegetables',
      collection: 'Organic Selection',
      regularPrice: 2.79,
      salePrice: 1.79,
      pic: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500',
      date: '2024-01-13',
      description: 'Fresh organic carrots'
    }
  ];


  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = productData?.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.name.toLowerCase().includes(query.toLowerCase()) 
    //   product.collection.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSort = (sortType) => {
    let sorted = [...filteredProducts];
    switch (sortType) {
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        sorted.sort((a, b) => a.salePrice - b.salePrice);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.salePrice - a.salePrice);
        break;
      case 'date-asc':
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'date-desc':
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default:
        break;
    }
    setFilteredProducts(sorted);
    setSortBy(sortType);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    const filtered = productData.filter(product => 
      product.salePrice >= newValue[0] && product.salePrice <= newValue[1]
    );
    setFilteredProducts(filtered);
  };

  return (
    <div onClick={()=>console.log(selectedCategory)} className="w-[96%] h-full bg-product">
      <div className="bg-[#494d4ad5] mix-blend-screen absolute w-full h-full"></div>
      <div className="w-full h-full backdrop-blur-3xl pl-40">
        <div className="w-full h-full pt-16 overflow-y-scroll flex">
          {/* Filter Sidebar */}
          <div className="w-72 h-full pr-6">
            <div className="bg-[#ffffff20] backdrop-blur-md rounded-[20px] p-6">
              <h2 className="text-[20px] font-bold mb-6">Filters</h2>
              
              {/* View Options */}
              <div className="mb-6">
                <h3 className="text-[16px] font-medium mb-3">View Options</h3>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={showProducts}
                      onChange={(e) => setShowProducts(e.target.checked)}
                      className="w-4 h-4 rounded-full"
                    />
                    Show Products
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={showCollections}
                      onChange={(e) => setShowCollections(e.target.checked)}
                      className="w-4 h-4 rounded-full"
                    />
                    Show Collections
                  </label>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-[16px] font-medium mb-3">Categories</h3>
                <div className="flex flex-col gap-2">
                  {categories.map((category, index) => (
                    <label key={category} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="category"
                        checked={activeCategory === index}
                        onChange={() => {
                          setActiveCategory(index);
                          setSelectedCategory(category);
                        }}
                        className="w-4 h-4"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-[16px] font-medium mb-3">Price Range</h3>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                  sx={{
                    color: '#14532d',
                    '& .MuiSlider-thumb': {
                      backgroundColor: '#14532d',
                    },
                    '& .MuiSlider-track': {
                      backgroundColor: '#14532d',
                    },
                    '& .MuiSlider-rail': {
                      backgroundColor: '#14532d40',
                    }
                  }}
                />
                <div className="flex justify-between mt-2">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>

              {/* Sort Options */}
              <div className="mb-6">
                <h3 className="text-[16px] font-medium mb-3">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="w-full px-4 py-2 bg-[linear-gradient(to_left,#52aa5799,#14532d)] text-white rounded-[10px] focus:outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                  <option value="date-asc">Date (Oldest First)</option>
                  <option value="date-desc">Date (Newest First)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search input */}
            <div className="relative w-3/4 mb-10">
              <input
                type="text"
                placeholder="Search products and collections..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-6 py-4 rounded-[20px] bg-[#ffffff90] backdrop-blur-md border-none focus:outline-none focus:ring-2 focus:ring-[#14532d] text-gray-800 placeholder-gray-500"
              />
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-600">
                <i className="ri-search-line text-2xl"></i>
              </div>
            </div>

            {/* Products Grid */}
            {showProducts && (
              <div className="w-full h-auto flex my-5 gap-5 relative flex-wrap">
                {filteredProducts.map((product) => (    (product?.category?.name === selectedCategory || selectedCategory === 'All Categories' || selectedCategory === 'all' ) &&
                  <div
                    key={product.id}
                    className="h-80 min-w-56 max-w-56 flex flex-col justify-center items-center rounded-[40px] relative group"
                  >
                    <img
                      className="max-w-[120px] h-[120px] w-[120px] object-cover max-h-[120px] oscillater mix-blend-darken drop-shadow-2xl z-20"
                      src={product.pics.one}
                      alt={product.name}
                    />
                    <img
                      className="px-0 max-w-[80px] shadowed opacity-20 absolute"
                      src={product.pic}
                      alt=""
                    />
                    <span className="w-full h-auto bg-[linear-gradient(#ffffff40,#ffffff70)] flex flex-col px-10 rounded-t-[30px] rounded-bl-[30px] rounded-br-[120px] pt-10 flex-1 justify- gap-2 pb-0">
                      <span className="mt-2">
                        <h1 className="text-[28px] font-medium">{product.name}</h1>
                        <span className="flex flex-col">
                          <s>
                            <p className="opacity-30">₹ {product.regularPrice}</p>
                          </s>
                          <p className="opacity-60 text-[25px] font-bold text-[#14532d]">
                            ₹ {product.salePrice}
                          </p>
                        </span>
                      </span>
                      <button
                        onClick={() =>
                          navigate('/user/productPage', { state: { id: product.id } })
                        }
                        className="flex justify-start items-center font-bold rounded-full text-white absolute bottom-0 right-3 bg-[linear-gradient(#b4c2ba,#789985)] overflow-hidden w-[70px] h-[70px] group-hover:scale-125 duration-500"
                      >
                        <i className="ri-shopping-bag-line font-thin rounded-full min-w-[70px] text-[25px] group-hover:-translate-x-full duration-500"></i>
                        <i className="ri-arrow-right-line rounded-full min-w-[70px] text-[25px] group-hover:-translate-x-full duration-500"></i>
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Collections Grid */}
            {showCollections && (
              <div className="w-full h-auto flex my-5 gap-5 relative flex-wrap">
                {collections.map((collection, index) => (
                  <div
                    key={index}
                    className="h-80 min-w-56 max-w-56 flex flex-col justify-center items-center rounded-[40px] relative group"
                  >
                    <div className="w-full h-auto bg-[linear-gradient(#ffffff40,#ffffff70)] flex flex-col px-10 rounded-[30px] pt-10 flex-1 justify-center items-center gap-2">
                      <h1 className="text-[28px] font-medium text-center">{collection}</h1>
                      <button
                        onClick={() => navigate('/user/collection', { state: { name: collection } })}
                        className="flex justify-start items-center font-bold rounded-full text-white mt-4 bg-[linear-gradient(#b4c2ba,#789985)] overflow-hidden w-[70px] h-[70px] group-hover:scale-125 duration-500"
                      >
                        <i className="ri-arrow-right-line rounded-full min-w-[70px] text-[25px] group-hover:-translate-x-full duration-500"></i>
                        <i className="ri-arrow-right-line rounded-full min-w-[70px] text-[25px] group-hover:-translate-x-full duration-500"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results Message */}
            {showProducts && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[20px] text-gray-600">
                  No products found matching your criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;