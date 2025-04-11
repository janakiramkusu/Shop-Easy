import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/productDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="loading">Loading product...</p>;

  return (
    <div className="detail-container">
      

      <div className="product-info">
        <p className="breadcrumb">
          <span>🏠 Home</span> &nbsp;/&nbsp;
          <span>{product.category}</span> &nbsp;/&nbsp;
          <span>{product.title.slice(0, 25)}...</span>
        </p>
        <div className="product-img-wrapper">
        <img src={product.image} alt={product.title} className="product-img" />
      </div>
        <h2>{product.title}</h2>

        <p className="rating">⭐ {product.rating?.rate} ({product.rating?.count} ratings)</p>
       
        <div className="promo-box">🎉 Lowest Price since Launch</div>

        <div className="price-section">
          <span className="original-price">₹{(product.price + 500).toFixed(0)}</span>
          <span className="price">₹{product.price}</span>
          <span className="discount">35% off</span>
        </div>

        <p className="delivery">🚚 Free Delivery by <strong>Tomorrow</strong></p>

        <p className="description">{product.description}</p>

        <div className="button-group sticky-buttons ">
          <button className="add-btn" onClick={handleAddToCart}>Add to Cart</button>
          {showToast && <div className="toast">🛒 Added to cart!</div>}
          <button className="buy-btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
