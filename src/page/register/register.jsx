import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AiOutlineCheckCircle } from "react-icons/ai";
import googleIcon from "./google.png";
import image from "./loginImage.png";
import "./register.css";

const Register = ({ user, setUser }) => {
  const navigation = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("login") === "true";
    if (isLoggedIn && user?.name) {
      setIsLoggedIn(true);
      setRedirecting(true);
      setTimeout(() => {
        navigation("/");
      }, 2000);
    }
  }, [user, navigation]);

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!register.name || !register.email || !register.password || !register.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (register.password !== register.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Save registration info to localStorage (manual registration)
    localStorage.setItem("registeredUser", JSON.stringify({
      name: register.name,
      email: register.email,
      password: register.password
    }));
    setSuccess(true);
    setTimeout(() => {
      navigation("/login");
    }, 2000);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);
      // Log in immediately for Google login
      setUser({ name: userInfo.name, email: userInfo.email });
      localStorage.setItem("user", JSON.stringify({ name: userInfo.name, email: userInfo.email }));
      localStorage.setItem("login", true);
      // Optionally, save Google user as registeredUser for login
      localStorage.setItem("registeredUser", JSON.stringify({ name: userInfo.name, email: userInfo.email, password: null }));
      navigation("/");
    },
  });

  // Show success message after manual registration
  if (success) {
    return (
      <div className="auth-bg">
        <div className="auth-card">
          <div className="auth-form" style={{ width: '100%' }}>
            <div className="auth-success-message" style={{ textAlign: 'center', width: '100%' }}>
              <AiOutlineCheckCircle size={64} className="success-icon" />
              <h2 className="auth-title">Account created successfully</h2>
              <p className="auth-subtitle">Redirecting you to the login page...</p>
              <button className="auth-btn" onClick={() => navigation("/login")}>Go to Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show logged in message if user is already authenticated
  if (isLoggedIn && redirecting) {
    return (
      <div className="auth-bg">
        <div className="auth-card">
          <div className="auth-form" style={{ width: '100%' }}>
            <div className="auth-success-message" style={{ textAlign: 'center', width: '100%' }}>
              <AiOutlineCheckCircle size={64} className="success-icon" />
              <h2 className="auth-title">Already Logged In</h2>
              <p className="auth-subtitle">Welcome back, {user?.name}!</p>
              <p className="auth-subtitle">Redirecting you to the home page...</p>
              <button 
                className="auth-btn" 
                onClick={() => navigation("/")}
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  console.log(user);

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-image">
          <img src={image} alt="register visual" />
        </div>
        <form className="auth-form" onSubmit={handleRegister}>
          <h1 className="auth-title">Create an account</h1>
          <p className="auth-subtitle">Enter your details below</p>
          <input name="name" placeholder="Name" className="auth-input" value={register.name} onChange={handleChange} />
          <input name="email" placeholder="Email or phone number" className="auth-input" value={register.email} onChange={handleChange} />
          <input name="password" placeholder="Password" className="auth-input" type="password" value={register.password} onChange={handleChange} />
          <input name="confirmPassword" placeholder="Re-enter your password" className="auth-input" type="password" value={register.confirmPassword} onChange={handleChange} />
          {error && <div className="auth-error">{error}</div>}
          <button className="auth-btn" type="submit">Create an account</button>
          <div className="auth-divider"><span>or</span></div>
          <div onClick={googleLogin} className="auth-google-btn">
            <img src={googleIcon} alt="googleIcon" style={{ width: 22, height: 22 }} />
            Sign up with Google
          </div>
          <div className="auth-footer">
            Already have an account?
            <span className="auth-link" onClick={() => navigation("/login")}>Log in</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
