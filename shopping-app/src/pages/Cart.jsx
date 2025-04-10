import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/cart.css';

function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    clearCart();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  };

  return (
    <section className="cart-container">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
                            <div className="empty-cart">
                            <div className="icon">🛒</div>
                            <p className="empty-msg">Your cart is empty.</p>
                           </div>
                        ): (  <> <div className="cart-items-wrapper">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="item-info">
                  <h3>{item.title}</h3>
                  <p>Price: ₹{item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="remove" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ₹{total}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
          </div>
        </>
      )}

      {showPopup && (
        <div className="popup">✅ Order placed successfully!</div>
      )}
    </section>
  );
}

export default Cart;
