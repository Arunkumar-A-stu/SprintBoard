import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log({ name, email, password, agree });
  };

  return (
    <div className="signup-pageWrapper">
      <div className="signup-card">
        <div className="signup-leftPane">
          <div className="signup-illustrationWrapper">
            <div className="signup-rocket">🚀</div>
            <div className="signup-avatar">👩‍💻</div>
            <div className="signup-stars">⭐ ⭐ ⭐</div>
          </div>
        </div>
        <div className="signup-rightPane">
          <div className="signup-brandRow">
            <div className="signup-logoMark">S</div>
            <div className="signup-brandName">Sprintboard</div>
          </div>
          <h2 className="signup-title">Adventure starts here 🚀</h2>
          <p className="signup-subtitle">Make your app management easy and fun!</p>
          <form onSubmit={handleSubmit} className="signup-form">
            <label className="signup-label" htmlFor="name">Name</label>
            <input id="name" type="text" placeholder="Full name" className="signup-input" value={name} onChange={(e) => setName(e.target.value)} required />

            <label className="signup-label mt-12" htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="Email" className="signup-input" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label className="signup-label mt-12" htmlFor="password">Password</label>
            <div className="signup-passwordField">
              <input id="password" type={showPassword ? 'text' : 'password'} placeholder="Password" className="signup-input pr-40" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="button" className="signup-eyeButton" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((v) => !v)}>{showPassword ? '🙈' : '👁️'}</button>
            </div>

            <label className="signup-label mt-12" htmlFor="confirm">Confirm Password</label>
            <input id="confirm" type={showPassword ? 'text' : 'password'} placeholder="Confirm password" className="signup-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

            <div className="signup-rowBetween">
              <label className="signup-checkboxLabel">
                <input type="checkbox" className="signup-checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                I agree to privacy policy & terms
              </label>
              <span />
            </div>

            <button type="submit" className="signup-submitButton">SIGN UP</button>

            <div className="signup-signupRow">
              <span>Already have an account?</span>
              <Link to="/login" className="signup-signupLink">Sign in instead</Link>
            </div>

          
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;


