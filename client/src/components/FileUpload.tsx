import React from "react";
import Dropzone from "react-dropzone";
import { uploadImage } from "../cloudinary/uploader"; // Cloudinary 이미지 업로드 함수 추가

const FileUpload = ({ onImageChange, images }) => {
  const handleDrop = async (files) => {
    const file = files[0]; // 현재는 하나의 파일만 업로드하도록 설정
    try {
      // Cloudinary에 이미지 업로드
      const imageUrl = await uploadImage(file);
      // 새 이미지 URL을 이미지 배열에 추가하여 상태 업데이트
      onImageChange([...images, imageUrl]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (image) => {
    // 이미지 삭제 기능은 유지됩니다.
    const currentIndex = images.indexOf(image);
    const newImages = [...images];
    newImages.splice(currentIndex, 1);
    onImageChange(newImages);
  };

  return (
    <div className="flex gap-4  mx-6">
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <section className="min-w-[300px] h-[300px] border flex items-center justify-center">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p className="text-3xl">+</p>
            </div>
          </section>
        )}
      </Dropzone>
      <div className="flex-grow h-[300px] border flex items-center justify-center overflow-x-scroll overflow-y-hidden">
        {images.map((image) => (
          <div key={image} onClick={() => handleDelete(image)}>
            <img
              className="min-w-[300px] h-[300px]"
              src={image} // Cloudinary로부터 받아온 이미지 URL 사용
              alt={image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
