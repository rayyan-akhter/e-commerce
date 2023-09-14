import React, { useEffect } from "react";
import { json, useNavigate } from "react-router";
import Categories from "../../components/categories/categories";
import Frame from "../../components/frame/frame";
import Sale from "../../components/sale/sale";
import SecondFrame from "../../components/secondFrame/secondFrame";

export const Home = ({user,setUser}) => {
  

  return (
    <>
      <Frame />
      <Sale />
      <Categories />
      
      <SecondFrame />
    </>
  );
};