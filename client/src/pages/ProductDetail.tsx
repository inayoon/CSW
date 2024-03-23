import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { useLocation } from "react-router-dom";

export default function ProductDetail() {
  const [gallery, setGallery] = useState([]);

  const {
    state: {
      product: { _id, images, title, stock, sold, category, price, options },
    },
  } = useLocation();
  useEffect(() => {
    if (images?.length > 0) {
      const bears: string[] = [];
      images.map((imageName: string) => {
        return bears.push({
          original: imageName,
          thumbnail: imageName,
        });
      });
      setGallery(bears);
    }
  }, [images]);
  return (
    <section>
      <div className="text-center">
        <h1 className="p-4 text-2xl">{title}</h1>
      </div>

      <div className="flex gap-4">
        <div className="w-1/2">{/* product Images */}</div>
        <ImageGallery items={gallery} showPlayButton={false} className="" />
        <div className="w-1/2">{/* prodcut Info */}</div>
      </div>
    </section>
  );
}
