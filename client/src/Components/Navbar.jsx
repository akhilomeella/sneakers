import React, { useState } from "react";
import { Link } from "react-router-dom";
import cart from "./assets/images/icon-cart.svg";
import dp from "./assets/images/image-avatar.png";
import "./assets/navbar.css";
import { HiMenu, HiX } from "react-icons/hi";
import { useCart } from "./Contexts/CartContext.jsx";

const Navbar = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { cartItems, removeItem } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div>
      <div className="w-full bg-white border-b border-gray-200 ">
        <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 py-4">
          {/* Logo */}
          <Link to="/" className="text-left font-extrabold text-2xl text-black">
            Sneakers
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-x-8 text-[#666970] items-center">
            <Link to="/collections" className="nav-item hover:text-black">
              Collections
            </Link>
            <Link to="/men" className="nav-item hover:text-black">
              Men
            </Link>
            <Link to="/women" className="nav-item hover:text-black">
              Women
            </Link>
            <Link to="/about" className="nav-item hover:text-black">
              About
            </Link>
            <Link to="/contact" className="nav-item hover:text-black">
              Contact
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-x-6">
            {/* Hamburger Icon for Mobile */}
            <div className="md:hidden">
              {isMenuOpen ? (
                <HiX
                  className="w-7 h-7 cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                />
              ) : (
                <HiMenu
                  className="w-7 h-7 cursor-pointer"
                  onClick={() => setIsMenuOpen(true)}
                />
              )}
            </div>
            <Link to="/cart">
              <div className="relative hidden sm:block">
                <img
                  src={cart}
                  alt=""
                  onMouseEnter={togglePopup}
                  onMouseLeave={togglePopup}
                  className="cursor-pointer w-6 h-6"
                />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1 rounded-full">
                    {cartItems.length}
                  </span>
                )}
                {isPopupVisible && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 w-64 z-50">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-bold">Cart</p>
                      <button onClick={togglePopup}>✕</button>
                    </div>
                    <hr className="my-2" />
                    {cartItems.length === 0 ? (
                      <p className="text-gray-500">Cart is empty</p>
                    ) : (
                      <ul className="space-y-2">
                        {cartItems.map((item, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-center"
                          >
                            <span>{item.name}</span>
                            <div className="flex items-center gap-2">
                              <span>x{item.quantity}</span>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 text-sm"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="size-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                  />
                                </svg>
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </Link>

            <Link to="/login" className="hidden sm:block">
              <img src={dp} alt="" className="size-10 rounded-full" />
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3">
            <Link
              to="/collections"
              className="block hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
            <Link
              to="/men"
              className="block hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Men
            </Link>
            <Link
              to="/women"
              className="block hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Women
            </Link>
            <Link
              to="/cart"
              className="block hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Cart
            </Link>
            <Link
              to="/about"
              className="block hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="block hover:text-black flex self-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Account
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
