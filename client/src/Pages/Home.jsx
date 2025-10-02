import { Link } from "react-router-dom";
import thumb1 from "../Components/assets/images/image-product-1-thumbnail.jpg";
import thumb2 from "../Components/assets/images/image-product-2-thumbnail.jpg";
import thumb3 from "../Components/assets/images/image-product-3-thumbnail.jpg";
import thumb4 from "../Components/assets/images/image-product-4-thumbnail.jpg";
import img1 from "../Components/assets/images/image-product-1.jpg";
import img2 from "../Components/assets/images/image-product-2.jpg";
import img3 from "../Components/assets/images/image-product-3.jpg";
import img4 from "../Components/assets/images/image-product-4.jpg";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../Components/assets/customStyles.css";

const Home = () => {
  const images = [
    {
      original: img1,
      thumbnail: thumb1,
    },
    {
      original: img2,
      thumbnail: thumb2,
    },
    {
      original: img3,
      thumbnail: thumb3,
    },
    {
      original: img4,
      thumbnail: thumb4,
    },
  ];

  return (
    <div className="text-black py-12 px-4 sm:px-6 lg:px-52 ">
      <div className="flex flex-col lg:flex-row lg:pt-18 lg:gap-x-24 gap-y-10 lg:gap-y-0">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 rounded-2xl">
          <ImageGallery items={images} />
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-start tracking-wider lg:pt-16 gap-y-6 sm:gap-y-8">
          <h1 className="uppercase text-[#f67d1c] text-xs sm:text-sm">
            Sneaker Company
          </h1>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Fall Limited Edition <br /> Sneakers
          </p>
          <p className="text-[#666970] text-sm sm:text-base">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they'll withstand everything
            the weather can offer.
          </p>

          <div className="flex flex-col gap-y-1">
            <div className="flex gap-x-2 items-center">
              <p className="text-xl sm:text-2xl font-bold">&#8358;23,000</p>
              <div className="flex items-center bg-[#f8e3d2] text-[#f67d1c] rounded ">
                <p className="px-2 font-bold text-sm sm:text-base">50%</p>
              </div>
            </div>
            <p className="line-through text-[#666970] font-bold text-sm sm:text-base">
              &#8358;46,000
            </p>
          </div>

          <div className="flex justify-center lg:justify-start ">
            <Link to="/collections" className="">
              <button className="cursor-pointer inline-block bg-orange-500 hover:bg-white hover:text-orange-500 hover:border-2 hover:border-solid hover:border-orange-500 text-white px-8 py-3 text-lg rounded-full transition">
                Shop Now!
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
