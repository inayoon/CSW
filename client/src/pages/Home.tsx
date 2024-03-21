import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import CardItems from "../components/CardItems";
import axios from "axios";

export default function Home() {
  const [product, setProduct] = useState([]);
  const fetchProduct = async () => {
    try {
      const response = await axios.get("/api/products/all");
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
      <div className="">
        <h2 className="p-3 md:text-lg text-lightBrown font-semibold text-center">
          The Big Spring Sale
          <br />
          ------------------------------
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 md:mx-1 gap-4 mx-4">
          {product.map((item) => (
            <CardItems product={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
