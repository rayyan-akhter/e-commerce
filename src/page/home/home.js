import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router";
import Categories from "../../components/categories/categories";
import Frame from "../../components/frame/frame";
import Sale from "../../components/sale/sale";
import SecondFrame from "../../components/secondFrame/secondFrame";

export const Home = ({ user, setUser }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {

    window.addEventListener("resize",(e)=>{

      if (window.innerWidth < 700) setIsMobile(true);
      else setIsMobile(false);
      console.log(e);
    })
    if (window.innerWidth < 700) setIsMobile(true);
      else setIsMobile(false);
    
  }, []);

  console.log(isMobile)

  return (
    <>
      {!isMobile && <Frame />}
      <Sale />
      <Categories />

      <SecondFrame />
    </>
  );
};
