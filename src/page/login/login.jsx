import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import googleIcon from "../register/google.png";
import image from "../register/loginImage.png";
import "./login.css";

const Login = ({ setUser }) => {
  const navigation = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (login.email && login.password) {
      // Check against registeredUser in localStorage
      const regUser = JSON.parse(localStorage.getItem("registeredUser"));
      if (regUser && regUser.email === login.email && regUser.password === login.password) {
        setUser({ name: regUser.name, email: regUser.email });
        localStorage.setItem("user", JSON.stringify({ name: regUser.name, email: regUser.email }));
        localStorage.setItem("login", true);
        navigation("/");
      } else {
        setError("Invalid email or password.");
      }
    } else {
      setError("Please enter both email and password.");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);
      setUser({ name: userInfo.name, email: userInfo.email });
      localStorage.setItem("user", JSON.stringify({ name: userInfo.name, email: userInfo.email }));
      localStorage.setItem("login", true);
      navigation("/");
    },
  });

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-image">
          <img src={image} alt="login visual" />
        </div>
        <form className="auth-form" onSubmit={handleLogin}>
          <h1 className="auth-title">Sign in to your account</h1>
          <p className="auth-subtitle">Enter your details below</p>
          <input
            name="email"
            placeholder="Email"
            className="auth-input"
            value={login.email}
            onChange={handleChange}
            type="email"
            autoComplete="username"
          />
          <input
            name="password"
            placeholder="Password"
            className="auth-input"
            value={login.password}
            onChange={handleChange}
            type="password"
            autoComplete="current-password"
          />
          {error && <div className="auth-error">{error}</div>}
          <button className="auth-btn" type="submit">Sign In</button>
          <div className="auth-divider"><span>or</span></div>
          <div onClick={googleLogin} className="auth-google-btn">
            <img src={googleIcon} alt="googleIcon" style={{ width: 22, height: 22 }} />
            Sign in with Google
          </div>
          <div className="auth-footer">
            Don't have an account?
            <span className="auth-link" onClick={() => navigation("/register")}>Sign up</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 