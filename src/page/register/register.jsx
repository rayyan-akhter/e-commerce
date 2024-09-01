import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import googleIcon from "./google.png";
import image from "./loginImage.png";
import "./register.css";

const Register = ({ user, setUser }) => {
  const navigation = useNavigate();

  const [login, setLogin] = useState({
    name: "",
    email: "",
  });

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);

      setLogin({
        name: userInfo.name,
        email: userInfo.email,
      });
    },
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
      })
      .catch((error) => console.log(error));
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
            <input placeholder="Name" className="input" />
            <input placeholder="Email or phone number" className="input" />
            <input placeholder="Password" className="input" type="password"/>
            <input placeholder="Re-enter your password" className="input" type="password"/>
          </div>
          <div className="registerRightBottomConntainer ">
            <button className="signiUpBtn">Create an account</button>
            <div onClick={googleLogin} className="googleBtn">
              <img src={googleIcon} alt="googleIcon" />
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
