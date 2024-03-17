import { Button } from "flowbite-react";
import React, { useState } from "react";
import { uploadImage } from "../cloudinary/uploader";

export default function NewProduct() {
  const [product, setProduct] = useState({
    title: "",
    price: 0,
    category: "",
    images: [],
    options: [],
  });
  const [file, setFile] = useState();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: [value] }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    uploadImage(file).then((url) => {
      console.log(url);
    });
  };

  return (
    <section>
      <div className="text-center m-7">
        <h1 className="text-xl">Uploaded Product</h1>
      </div>
      <div className="w-full text-center">
        {file && (
          <img
            className="w-[500px] mx-auto"
            src={URL.createObjectURL(file)}
            alt="file"
          />
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <input
              type="file"
              accept="image/*"
              name="file"
              required
              onChange={handleChange}
            />
          </div>

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
            <label htmlFor="title">Options</label>
            <input
              className="flex self-center w-1/2 md:w-1/4 px-4 py-2 bg-stone-100 rounded-full"
              name="options"
              type="text"
              value={product.options}
              placeholder="User comma for delimiter"
              onChange={handleChange}
            />
          </div>
          <Button
            gradientDuoTone="redToYellow"
            type="submit"
            className="mx-auto my-4 rounded-full"
          >
            {" "}
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
}
