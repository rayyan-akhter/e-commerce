import React, { useEffect, useState } from "react";
import "./register.css";
import image from "./loginImage.png";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import TopHeader from "../../components/topHeader/topHeader";
import googleIcon from "./google.png";
import { useNavigate } from "react-router";

const Register = ({ user, setUser }) => {
  const navigation = useNavigate();

  const [login, setLogin] = useState({
    name: "",
    email: "",
  });

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      // fetching userinfo can be done on the client or the server
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);

      // console.log(userInfo);
      setLogin({
        name: userInfo.name,
        email: userInfo.email,
      });
    },
    // flow: 'implicit', // implicit is the default
  });

  

  useEffect(() => {
    if (!login.name) return;

    fetch("https://fakestoreapi.com/users/1")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        
        const userWithNewProps = { ...data, ...login };
        console.log(userWithNewProps, "this is new props");
        setUser(userWithNewProps);
        localStorage.setItem("user", JSON.stringify(userWithNewProps));
      });
    localStorage.setItem("login", true);
    navigation("/");
    console.log(login);
  }, [login, navigation, setUser]);

  console.log(user);

  return (
    <div className="register">
      <div className="registerContainer">
        <div className="registerLeftConntainer">
          <img src={image} className="registerImage" />
        </div>
        <div className="registerRightConntainer">
          <div className="registerRightTopConntainer ">
            <h1>Create an account</h1>
            <p>Enter your detail below</p>
          </div>
          <div className="registerRightCenterConntainer ">
            <input placeholder="name" className="input" />
            <input placeholder="email or phone number" className="input" />
            <input placeholder="password" className="input" />
          </div>
          <div className="registerRightBottomConntainer ">
            <button className="signiUpBtn">Create an account</button>
            <div onClick={googleLogin} className="googleBtn">
              <img src={googleIcon} />
              Sign up with google
            </div>
          </div>
          <div className="registerRightLoginConntainer">
            <p>Already have account?</p>
            <p className="loginBtn">Log in</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
