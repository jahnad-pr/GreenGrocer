import React, { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { RangeSlider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import './Search.css';
import { useAddtoCartMutation, useCheckPorductInCartMutation, useGetAllCollectionMutation, useGetAllProductMutation } from '../../../../services/User/userApi';
import CollectionCard from '../../../parts/Cards/Collection';

const Search = ({userData}) => {


  const [getAllProduct, { isLoading, error, data },] = useGetAllProductMutation();
  const [getAllCollection, { data:collData },] = useGetAllCollectionMutation();
  const [addtoCart, { error: addError, data: addData }] = useAddtoCartMutation();


  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [showFilters, setShowFilters] = useState(true);
  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([10, 2500]);
  const [showProducts, setShowProducts] = useState(true);
  const [showCollections, setShowCollections] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [activeCategory, setActiveCategory] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [collections,setCollections] = useState([])

  // Categories limited to fruits and vegetables
  const categories = [
    'All Categories',
    'Vegetables',
    'Fruits'
  ];

  // const collections = [
  //   'All Collections',
  //   'Summer Specials',
  //   'Fresh Arrivals',
  //   'Seasonal Picks',
  //   'Local Farmers'
  // ];


  useEffect(() => { getAllProduct() }, [])
  useEffect(() => { getAllCollection() }, [])

  useEffect(() => {
    if (data) {
      setProductData(data)
      setFilteredProducts(data)
    }
  }, [data])

  useEffect(() => {
    if (collData) {
      console.log(collData);
      
      setCollections(collData)
    }
  }, [collData])


  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = productData?.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.name.toLowerCase().includes(query.toLowerCase())
        // product.collection.toLowerCase().includes(query.toLowerCase())
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
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'date-desc':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
    <div className="w-[96%] h-full bg-product">
      <div className=" mix-blend-screen bg-[#ffffff50] absolute w-full h-full"></div>
      <div className="w-full h-full backdrop-blur-3xl pr-40">
        <div className="w-full h-full  overflow-y-scroll flex">
          {/* Filter Sidebar */}

          <div className="w-[400px] h-full pr-6">
            <div className="h-full bg-[#ffffff20] backdrop-blur-md  p-6 px-20">
              <h2 onClick={() => getAllCollection()} className="text-[30px] font-medium mb-6">Filters</h2>

              {/* View Options */}
              <div className="mb-6">
                <h3 className="text-[20px] opacity-45 font-medium mb-4">View Options</h3>
                <div className="flex flex-col gap-3">
                  <label className="category-label">
                    <input
                      type="radio"
                      name="viewOption"
                      checked={showProducts}
                      onChange={() => {
                        setShowProducts(true);
                        setShowCollections(false);
                      }}
                      className="category-radio"
                    />
                    Show Products
                  </label>
                  <label className="category-label">
                    <input
                      type="radio"
                      name="viewOption"
                      checked={showCollections}
                      onChange={() => {
                        setShowProducts(false);
                        setShowCollections(true);
                      }}
                      className="category-radio"
                    />
                    Show Collections
                  </label>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-[20px] opacity-45 font-medium mb-4">Categories</h3>
                <div className="flex flex-wrap gap-4">{categories.map((category, index) => (
                    <label key={index} className="category-label">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="category-radio"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-[20px] opacity-45 font-medium mb-8 mt-8">Price Range</h3>
                <div className="px-2">
                  <RangeSlider
                    value={priceRange}
                    onChange={value => handlePriceChange(null, value)}
                    min={10}
                    max={2500}
                    step={250}
                    progress
                    className="custom-slider"
                    graduated
                    renderMark={mark => {
                      if ([10, 500, 1000, 1500, 2000, 2500].includes(mark)) {
                        return `₹${mark}`;
                      }
                      return null;
                    }}
                    tooltip={false}
                  />
                </div>
                <div className="flex justify-between mt-6">
                  <input 
                    type="number" 
                    value={priceRange[0]} 
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '') {
                        setPriceRange([0, priceRange[1]]);
                        return;
                      }
                      const newValue = parseInt(value);
                      if (newValue <= priceRange[1]) {
                        setPriceRange([newValue, priceRange[1]]);
                        handlePriceChange(null, [newValue, priceRange[1]]);
                      }
                    }}
                    className="w-24 px-4 py-2 rounded-[10px] bg-[#3f6b5130] text-black outline-none text-center"
                    min={10}
                    max={priceRange[1]}
                  />
                  <input 
                    type="number" 
                    value={priceRange[1]} 
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '') {
                        setPriceRange([priceRange[0], 0]);
                        return;
                      }
                      const newValue = parseInt(value);
                      if (newValue >= priceRange[0] && newValue <= 2500) {
                        setPriceRange([priceRange[0], newValue]);
                        handlePriceChange(null, [priceRange[0], newValue]);
                      }
                    }}
                    className="w-24 px-4 py-2 rounded-[10px] bg-[#3f6b5130] text-black outline-none text-center"
                    min={priceRange[0]}
                    max={2500}
                  />
                </div>
              </div>

              {/* Sort Options */}
              <div className="mb-6">
                <h3 className="text-[20px] opacity-45 font-medium mb-8 mt-8">Sort by</h3>
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="w-full px-4 py-2 bg-[#3f6b51] custom-selectero text-white rounded-[10px] focus:outline-none"
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
          <div className="flex-1 pt-16">
            {/* Search input */}
            <div className="relative w-3/4 mb-10">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    const filtered = productData.filter(product =>
                      product.name.toLowerCase().includes(e.target.value.toLowerCase())
                    );
                    setFilteredProducts(filtered);
                  }}
                  className="search-input"
                />
                <FiSearch className="search-icon text-xl" />
              </div>
            </div>

            {/* Products Grid */}
            {showProducts && (
              <div className="w-full h-auto flex my-5 gap-5 relative flex-wrap">
                {filteredProducts.map((product) => ((product?.category?.name.toLowerCase() === selectedCategory.toLowerCase() || selectedCategory === 'All Categories' || selectedCategory === 'all') &&
                  <ProductCard key={product._id} product={product} navigate={navigate} userData={userData} />
                ))}
              </div>
            )}

            {/* Collections Grid */}
            {showCollections && (
              <div className="w-full h-auto flex my-5 gap-8 relative flex-wrap">
                {collections.map((collection, index) => ( (collection?.category?.name.toLowerCase() === selectedCategory.toLowerCase() || selectedCategory === 'All Categories' || selectedCategory === 'all') &&
                   <CollectionCard key={index} type={'collection'} data={collection} pos={index} />
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


function ProductCard({ navigate, product, userData }) {

  const [addtoCart, { error: addError, data: addData }] = useAddtoCartMutation()
  const [checkPorductInCart, { data: checkData }] = useCheckPorductInCartMutation();
  const [gotoCart, setGoToCart] = useState(false);

  useEffect(() => {
    if (addData) {
        setGoToCart(true)
        // showToast(addData, 'success')
    }
}, [addData])


  useEffect(() => {
    if (product&&userData>0) {
        checkPorductInCart(product?._id)
    };
}, [product]);

  const addToCartItem = (id) => {

    const userId = userData._id
    const cartData = {
        quantity: product?.quantity>1000?1000:500,
        product: id,
    }
    addtoCart({ cartData, userId })
  }

  return (<div onClick={() => console.log()} key={product.id} className="h-80 min-w-56 max-w-56 flex flex-col justify-center items-center rounded-[40px] relative group">
    <img className="max-w-[120px] h-[120px] w-[120px] object-cover max-h-[120px] oscillater mix-blend-darken drop-shadow-2xl z-20" src={product.pics.one} alt={product.name} />
    <img className="px-0 max-w-[80px] shadowed opacity-20 absolute" src={product.pic} alt="" />
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
      <button onClick={() => checkData||gotoCart ? navigate('/user/Cart') : addToCartItem(product._id) } className="flex justify-start items-center font-bold rounded-full text-white absolute bottom-0 right-3 bg-[linear-gradient(#b4c2ba,#789985)] overflow-hidden w-[70px] h-[70px] group-hover:scale-125 duration-500">
        <i className="ri-shopping-bag-line font-thin rounded-full min-w-[70px] text-[25px] group-hover:-translate-x-full duration-500"></i>
        <i className="ri-arrow-right-line rounded-full min-w-[70px] text-[25px] group-hover:-translate-x-full duration-500"></i>
      </button>
    </span>
  </div>);
}
export default Search;