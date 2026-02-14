import React, { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    inputRef.current.value = "";
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-4">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div
          className="relative w-16 h-16 flex items-center justify-center bg-purple-100 rounded-full cursor-pointer"
          onClick={onChooseFile}
        >
          <LuUser className="text-xl text-primary" />

          <button
            type="button"
            className="absolute w-6 h-6 flex items-center justify-center bg-primary text-white rounded-full bottom-0 right-0"
          >
            <LuUpload size={12} />
          </button>
        </div>
      ) : (
        <div className="relative w-16 h-16">
          <img
            src={previewUrl}
            alt="profile"
            className="w-full h-full rounded-full object-cover"
          />

          <button
            type="button"
            className="absolute w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full bottom-0 right-0"
            onClick={handleRemoveImage}
          >
            <LuTrash size={12} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
