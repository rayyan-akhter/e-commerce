import React, { useEffect, useState } from "react";
import Category from "../../components/categories/Category";
import Sale from "../../components/sale/sale";
import FeaturedProducts from "../../components/featuredProducts/featuredProducts";

export const Home = ({ user, setUser }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      if (window.innerWidth < 700) setIsMobile(true);
      else setIsMobile(false);
      console.log(e);
    });
    if (window.innerWidth < 700) setIsMobile(true);
    else setIsMobile(false);
  }, []);

  return (
    <>
      <Category isMobile={isMobile} />
      <Sale />
      <FeaturedProducts />
    </>
  );
};
