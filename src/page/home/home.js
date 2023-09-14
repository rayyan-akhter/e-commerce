import React, { useEffect } from "react";
import { json, useNavigate } from "react-router";
import Categories from "../../components/categories/categories";
import Frame from "../../components/frame/frame";
import Sale from "../../components/sale/sale";
import SecondFrame from "../../components/secondFrame/secondFrame";

export const Home = ({user,setUser}) => {
  
  const navigation = useNavigate();
  useEffect(() => {

    if(!localStorage.getItem("login")){
      return (navigation("/register"),
      alert("login first")
      )
    }
    const getUser = () => {
      fetch("https://fakestoreapi.com/users/1")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (localStorage.getItem("user"))
            return setUser(JSON.parse(localStorage.getItem("user")));
          const localData = localStorage.getItem("temp");
          console.log(localData);
          const userWithNewProps = { ...data, ...JSON.parse(localData) };
          console.log(userWithNewProps);
          localStorage.setItem("user", JSON.stringify(userWithNewProps));
          
          setUser(userWithNewProps);
          localStorage.removeItem("temp");
      
        });
    };
  
    
    if (localStorage.getItem("user"))
      return setUser(JSON.parse(localStorage.getItem("user")));
    getUser();
  }, []);
  console.log(user);
  return (
    <>
      <Frame />
      <Sale />
      <Categories />
      
      <SecondFrame />
    </>
  );
};
