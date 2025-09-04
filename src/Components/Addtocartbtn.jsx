import { useState } from "react";
import { useCart } from "./CartContext";
import sneakers from "./data";
import minus from "./assets/images/icon-minus.svg";
import add from "./assets/images/icon-plus.svg";

const Addtocart = ({ productId, size = "default" }) => {
  const products = sneakers;

  const { addItem } = useCart();
  const [value, setValue] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  // Get the product details directly from data.js
  const product = products.find((p) => p.id === productId);

  const addition = () => setValue(value + 1);
  const subtract = () => value > 0 && setValue(value - 1);

  const handleAddtoCart = () => {
    if (value === 0 || !product) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: value,
    });
    setValue(0);

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 1000);
  };

  const isSmall = size === "small";

  return (
    <div>
      <div
        className={`
    flex justify-between gap-x-5 max-sm:gap-x-2 lg:gap-x-8
     w-full
    ${isSmall ? "scale-75" : ""}
     max-[480px]:gap-y-3
  `}
      >
        <div
          className={`
      flex bg-[#f7f8fd] items-center
      rounded-lg
      ${isSmall ? "gap-x-4 px-2 py-1" : "gap-x-4 px-4 py-3"}
      sm:gap-x-5
      max-[480px]:w-auto lg:px-4
    `}
        >
          <button onClick={subtract}>
            <img src={minus} alt="Decrease" className="w-3 h-1" />
          </button>
          <h1>{value}</h1>
          <button onClick={addition}>
            <img src={add} alt="Increase" className="w-3 h-3" />
          </button>
        </div>

        <button
          onClick={handleAddtoCart}
          className="
      flex justify-center items-center bg-[#f67d1c] text-white gap-x-2 rounded-lg px-2 py-2 text-sm lg:px-4 lg:py-2 lg:text-sm  max-sm:text-base w-1/3 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width="22"
            height="20"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6 max-sm:size-4 "
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </button>
      </div>
      {showMessage && (
        <p className="text-green-600 text-center text-sm font-medium">
          ✅ Added to cart
        </p>
      )}
    </div>
  );
};

export default Addtocart;
