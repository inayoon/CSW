import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel() {
  const moru = [
    "https://res.cloudinary.com/dg3nqwte9/image/upload/v1710906185/brown_cy6die.jpg",
    "https://res.cloudinary.com/dg3nqwte9/image/upload/v1710903189/lots_nk9ipk.jpg",
    "https://res.cloudinary.com/dg3nqwte9/image/upload/v1710903239/lots2_yknfgg.jpg",
    "https://res.cloudinary.com/dg3nqwte9/image/upload/v1710903283/packaging_hvwphu.jpg",
    "https://res.cloudinary.com/dg3nqwte9/image/upload/v1710903277/four_bovkpc.jpg",
  ];
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
    pauseOnHover: true,
  };
  return (
    <div>
      <Slider className="ml-0" {...settings}>
        {moru.map((item, index) => (
          <div key={index}>
            <img src={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
