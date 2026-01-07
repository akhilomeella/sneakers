import React, { useState } from "react";
import Addtocart from "./Addtocartbtn";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./assets/customStyles.css";

const Item = (props) => {
  const [showModal, setShowModal] = useState(false);

  // --- TRANSFORM DATA FOR GALLERY ---
  // MongoDB gives: ["url1", "url2"]
  // Gallery needs: [{ original: "url1", thumbnail: "url1" }, ...]
  const galleryImages = props.images
    ? props.images.map((url) => ({
        original: url,
        thumbnail: url.replace("/upload/", "/upload/w_200/"), // Cloudinary thumbnail trick
      }))
    : [];

  return (
    <div className="flex flex-col justify-between h-full bg-white rounded-lg shadow-sm p-3">
      <img
        src={props.image}
        alt=""
        className="w-full h-40 sm:h-48 md:h-56 lg:h-60 object-contain bg-white p-2 rounded-lg cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg"
        onClick={() => setShowModal(true)}
      />
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 text-center sm:text-left">
        <p className="text-sm sm:text-base">{props.name}</p>
        <div className="font-bold text-base sm:text-lg">
          &#8358;{props.price.toLocaleString()}
        </div>
      </div>

      <div className="mt-auto w-full">
        <Addtocart productId={props.id} size="small" />
      </div>
      {showModal && (
        <div
          className="w-full fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={() => setShowModal(false)} // Close on outside click
        >
          <div
            className="bg-white p-6 rounded-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <ImageGallery items={galleryImages} showPlayButton={false} />
            <h2 className="text-xl font-bold mt-4">{props.name}</h2>
            <p className="mt-2 text-gray-500">&#8358;{props.price}</p>
            <p className="mt-4 text-sm">{props.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
