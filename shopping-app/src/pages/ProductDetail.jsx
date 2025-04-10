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
      <div className="product-img-wrapper">
        <img src={product.image} alt={product.title} className="product-img" />
      </div>

      <div className="product-info">
        <p className="breadcrumb">Home / {product.category} / {product.title.slice(0, 20)}...</p>

        <h2>{product.title}</h2>

        <p className="rating">
          ⭐ {product.rating?.rate} ({product.rating?.count} ratings)
        </p>

        <p className="price">₹{product.price}</p>

        <p className="delivery">Free Delivery by <strong>Tomorrow</strong></p>

        <p className="description">{product.description}</p>

        <div className="button-group">
        <button className="add-btn" onClick={() => handleAddToCart()}> Add to Cart</button>
        {showToast && (
                       <div className="toast">🛒 Added to cart!</div>
                      )}
          <button className="buy-btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;