import { Alert, Button, Spinner } from "flowbite-react";
import React, { useState } from "react";
import axios from "axios";
import { uploadImage } from "../cloudinary/uploader";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import FileUpload from "../components/FileUpload";
import { useNavigate } from "react-router-dom";

type Product = {
  title: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  options: string[];
};

export default function NewProduct() {
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();
  const detailedOptions = [
    "Black Satin Ribbons(2pcs) +$1",
    "Pink Satin Ribbons(2pcs) +$1",
    "Transparent Ribbons(2pcs) +$1",
    "Pearl beads Ribbons(2pcs)(random color) +$0.5",
    "Key charm for the necklace(1pc) +$1",
  ];
  const user = useSelector<IRootState, any>((state) => state.user?.currentUser);
  const [product, setProduct] = useState<Product>({
    title: "",
    price: 0,
    category: "",
    stock: 0,
    images: [],
    options: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImages = (newImages) => {
    setProduct((prevState) => ({ ...prevState, images: newImages }));
  };

  const handleOptionChange = (e) => {
    const { value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      options: prevState.options.includes(value)
        ? prevState.options.filter((option) => option !== value)
        : [...prevState.options, value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 이미지 업로드가 완료되었는지 확인
    if (product.images.length === 0) {
      console.error("이미지를 업로드하세요.");
      return;
    }

    const imageUrls = await Promise.all(product.images.map(uploadImage));

    // 이미지 URL을 상태에 설정
    setProduct((prevState) => ({ ...prevState, images: imageUrls }));

    const body = {
      writer: user._id,
      ...product,
    };
    try {
      setLoading(true);
      const response = await axios.post("/api/products/upload", body);
      // 성공적으로 POST 통신이 완료된 후에 제품 상세 정보 초기화
      if (response.status === 201) {
        setLoading(false);
        setShowMessage(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section>
      <div className="text-center m-7">
        <h1 className="text-xl">Uploaded Product</h1>
      </div>
      <div className="w-full text-center">
        <form onSubmit={handleSubmit}>
          <FileUpload
            images={product.images}
            onImageChange={handleImages}
            multiple
          />

          <div className="mt-4 flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              className="flex self-center w-1/2 md:w-1/4 px-4 py-2 bg-stone-100 rounded-full"
              name="title"
              type="text"
              value={product.title}
              required
              onChange={handleChange}
            />
          </div>

          <div className="mt-4 flex flex-col">
            <label htmlFor="title">Price</label>
            <input
              className="flex self-center  w-1/2 md:w-1/4 px-4 py-2 bg-stone-100 rounded-full"
              name="price"
              type="number"
              value={product.price}
              required
              onChange={handleChange}
            />
          </div>

          <div className="mt-4 flex flex-col">
            <label htmlFor="title">Category</label>
            <input
              className="flex self-center w-1/2 md:w-1/4 px-4 py-2 bg-stone-100 rounded-full"
              name="category"
              type="text"
              value={product.category}
              required
              onChange={handleChange}
            />
          </div>

          <div className="mt-4 flex flex-col">
            <label htmlFor="title">Stock</label>
            <input
              className="flex self-center  w-1/2 md:w-1/4 px-4 py-2 bg-stone-100 rounded-full"
              name="stock"
              type="number"
              value={product.stock}
              required
              onChange={handleChange}
            />
          </div>

          <div className="mt-4 flex flex-col ">
            <div>Options</div>
            {detailedOptions.map((item, idx) => (
              <div
                key={idx}
                className="self-center px-4 bg-stone-100 rounded-full my-1"
              >
                <input
                  type="checkbox"
                  id={item}
                  name="options"
                  value={item}
                  onChange={handleOptionChange}
                  checked={product.options.includes(item)}
                />
                <label htmlFor={item}>{item}</label>
              </div>
            ))}
            {/* <input
              className="flex self-center w-1/2 md:w-1/4 px-4 py-2 bg-stone-100 rounded-full"
              name="options"
              type="checkbox"
              value={product.options}
              placeholder="User comma for delimiter"
              onChange={handleChange}
            ></input> */}
          </div>
          <Button
            gradientDuoTone="redToYellow"
            type="submit"
            disabled={loading}
            className="w-1/2 md:w-1/4 mx-auto my-4 rounded-full"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-2">Loading...</span>
              </>
            ) : (
              "Submit"
            )}
          </Button>
          {showMessage && (
            <Alert className="w-1/2 mx-auto bg-bgPink text-choco text-lg font-extrabold items-center p-4 mb-4">
              ✅The Product is uploaded successfully
            </Alert>
          )}
        </form>
      </div>
    </section>
  );
}
