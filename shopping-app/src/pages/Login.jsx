import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error('Login failed');

      const data = await res.json();
      login(data.token);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <img src="https://raw.githubusercontent.com/janakiramkusu/Shop-Easy/main/shopping-app/src/assets/shopping.png" alt="Shopping" className='login-image'/>
        <h2>Welcome Back 👋</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">Login</button>

          {error && <p className="error-msg">{error}</p>}

          <div className="login-hint">
            <span>Don’t have an account? <a href="#">Sign up</a></span>  <br />
            <p>Test Login → <strong>Username:</strong> mor_2314 | <strong>Password:</strong> 83r5^_</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
