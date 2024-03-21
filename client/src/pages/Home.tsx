import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import CardItems from "../components/CardItems";
import axios from "axios";

export default function Home() {
  const [product, setProduct] = useState([]);
  const fetchProduct = async () => {
    try {
      const response = await axios.get("/api/products/all");
      const data = response.data;
      if (response.status === 200) {
        setProduct(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <Carousel />
      <CardItems product={product} />
      <h3>Home page cards {product[0].title}</h3>
      <h3>Home page cards</h3>
    </div>
  );
}
