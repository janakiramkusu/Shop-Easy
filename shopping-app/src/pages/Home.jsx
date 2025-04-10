import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (category = 'all') => {
    setLoading(true);
    let url = 'https://fakestoreapi.com/products';
    if (category !== 'all') url = `https://fakestoreapi.com/products/category/${category}`;

    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleCategoryChange = (cat) => {
    setSelectedCat(cat);
    fetchProducts(cat);
  };

  return (
    <div className="home-container">
      <h2>All Products</h2>

      <div className="filter-bar">
        <button
          onClick={() => handleCategoryChange('all')}
          className={selectedCat === 'all' ? 'active' : ''}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={selectedCat === cat ? 'active' : ''}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} />
                <h3>{product.title.slice(0, 40)}...</h3>
                <p>₹{product.price}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
