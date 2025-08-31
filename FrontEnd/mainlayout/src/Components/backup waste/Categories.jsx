import React, { useState, useEffect } from 'react';
import ProductDetailsAlert from './ProductDetailsAlert';
import products from './Products';
import { useNavigate } from 'react-router-dom';
import './Body.css';

const Categories = ({ addToCart}) => {
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [priceFilter, setPriceFilter] = useState('All');
    const [ratingFilter, setRatingFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
    const navigate = useNavigate();

    const filteredProducts = products.filter(product => {
        if (categoryFilter !== 'All' && product.category !== categoryFilter) return false;
        if (ratingFilter === 'Top rated' && product.rating < 4) return false;
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    }).sort((a, b) => {
        if (priceFilter === 'Low to High') {
            return a.price - b.price;
        } else if (priceFilter === 'High to Low') {
            return b.price - a.price;
        } else {
            return 0; // No sorting needed
        }
    });

    const addToCartAndShowAlert = (product) => {
        addToCart(product);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 1000); // Show alert for 1 second
    };

    const viewProductDetails = (product) => {
        setSelectedProduct(product);
        navigate(`/product/${product.id}`);
    };

    const openProductDetails = (product) => {
      setSelectedProduct(product);
      setIsProductDetailsOpen(true);
    };
   
    const closeProductDetails = () => {
      setSelectedProduct(null);
      setIsProductDetailsOpen(false);
    };

    useEffect(() => {
      let timeout;
      if (showAlert) {
        timeout = setTimeout(() => {
          setShowAlert(false);
        }, 1000);  //timer set closing the alerts
      }
      return () => clearTimeout(timeout);
    }, [showAlert]);
  
    return (
        <div id="categories">
            <hr className='rule1' />
            <div className="container">
            {isProductDetailsOpen && selectedProduct && (
  <ProductDetailsAlert
    product={selectedProduct}
    onClose={closeProductDetails}
    onAddToCart={addToCart}
  />
)}

                <div className="filters">
                    <div>
                        <h2 className='cateh2'>Choose and Buy Your Prodcuts</h2>
                    </div>
                    <div className='search11'>
                        <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                    </div>
                    <div className="AppOrg">
                        <div className="App1">
                            <div className="App11">
                                <h3 className='cathead'>Filters</h3>
                                <label>
                                    <input type="radio" value="All" checked={categoryFilter === 'All'} onChange={() => setCategoryFilter('All')} />
                                    All
                                </label>
                                {['Fruit', 'Vegetable', 'Nuts', 'Drinks'].map(category => (
                                    <label key={category}>
                                        <input type="radio" value={category} checked={categoryFilter === category} onChange={() => setCategoryFilter(category)} />
                                        {category}
                                    </label>
                                ))}
                            </div>
                            <br />
                            <h3 className='cathead'>Price Filter</h3>
                            <div className="App11">
                                <label>
                                    <input type="radio" value="All" checked={priceFilter === 'All'} onChange={() => setPriceFilter('All')} />
                                    All
                                </label>
                                <label>
                                    <input type="radio" value="Low to High" checked={priceFilter === 'Low to High'} onChange={() => setPriceFilter('Low to High')} />
                                    Low to High
                                </label>
                                <label>
                                    <input type="radio" value="High to Low" checked={priceFilter === 'High to Low'} onChange={() => setPriceFilter('High to Low')} />
                                    High to Low
                                </label>
                            </div>
                            <br />
                            <h3 className='cathead'>Rating Filter</h3>
                            <div className='App11'>
                                <label>
                                    <input type="radio" value="All" checked={ratingFilter === 'All'} onChange={() => setRatingFilter('All')} />
                                    All
                                </label>
                                <label>
                                    <input type="radio" value="Top rated" checked={ratingFilter === 'Top rated'} onChange={() => setRatingFilter('Top rated')} />
                                    Top rated
                                </label>
                            </div>
                        </div>
                        <div className="App2">
                            <div className="products">
                                {filteredProducts.map(product => (
                                    <div key={product.id} className="product-item">
                                      <img src={product.image} alt={product.name} className='imgmain' onClick={() => openProductDetails(product)}/>
                                        <h4 className='catpro1' onClick={() => viewProductDetails(product)}>{product.name}</h4>
                                        <p>Price: ${product.price}</p>
                                        <button onClick={() => addToCartAndShowAlert(product)} className='button1'>Add to Cart</button>
                                        <div>{getStarRating(product.rating)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Alert */}
                {showAlert && <div className="alertadd">Product added to cart!</div>}
            </div>
        </div>
    );
};

const getStarRating = (rating) => {
    let stars = '';
    for (let i = 0; i < rating; i++) {
        stars += '⭐'; // Unicode character for star
    }
    return stars;
};

export default Categories;
