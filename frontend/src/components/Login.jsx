import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Wire up to backend auth endpoint
    console.log({ email, password, remember });
  };

  return (
    <div className="login-pageWrapper">
      <div className="login-card">
        <div className="login-leftPane">
          <div className="login-illustrationWrapper">
            <div className="login-rocket">🚀</div>
            <div className="login-avatar">👨‍💻</div>
            <div className="login-stars">⭐ ⭐ ⭐</div>
          </div>
        </div>

        <div className="login-rightPane">
          <div className="login-brandRow">
            <div className="login-logoMark">S</div>
            <div className="login-brandName">Sprintboard</div>
          </div>

          <h2 className="login-title">Welcome to Sprintboard! 👋🏻</h2>
          <p className="login-subtitle">Please sign-in to your account and start the adventure</p>

          <form onSubmit={handleSubmit} className="login-form">
            <label className="login-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />

            <label className="login-label mt-12" htmlFor="password">Password</label>
            <div className="login-passwordField">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input pr-40"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="login-eyeButton"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <div className="login-rowBetween">
              <label className="login-checkboxLabel">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="login-checkbox"
                />
                Remember Me
              </label>
              <a href="#" className="login-forgot">Forgot Password?</a>
            </div>

            <button type="submit" className="login-submitButton">SIGN IN</button>

            <div className="login-signupRow">
              <span>New on our platform?</span>
              <Link to="/signup" className="login-signupLink">Create an account</Link>
            </div>

          
            
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;


