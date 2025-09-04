import React from "react";
import { Link } from "react-router-dom";
import { FaShippingFast, FaShieldAlt, FaStar, FaUsers } from "react-icons/fa";
import mission from "../Components/assets/images/mission-image.png";
import story from "../Components/assets/images/story-img.jpg";
import logo from "../Components/assets/images/sneakers-logo.avif";

const About = () => {
  return (
    <div className="bg-gradient-to-b from-orange-50 to-white py-16 px-6 md:px-20 text-gray-800">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Sneakers
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Your go-to destination for premium, stylish, and limited-edition
            sneakers.
          </p>
        </section>

        {/* Hero Image */}
        <section className="flex justify-center w-full">
          <img
            src={logo}
            alt="Sneakers"
            className="rounded-2xl shadow-lg w-full max-w-[600px] max-h-[600px] object-contain"
          />
        </section>

        {/* Mission Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 px-4 md:px-0">
            <p>
              At <span className="text-orange-500 font-semibold">Sneakers</span>
              , we aim to connect sneaker enthusiasts with iconic and authentic
              footwear. Whether you're a casual shopper or a hardcore collector,
              we’re here to elevate your sneaker journey.
            </p>
          </div>
          <img
            src={mission}
            alt="Mission"
            className="rounded-xl w-full h-auto max-h-80 object-cover shadow-md"
          />
        </section>

        {/* Why Choose Us */}
        <section>
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <FaStar />, label: "Premium Quality" },
              { icon: <FaShieldAlt />, label: "100% Authentic" },
              { icon: <FaShippingFast />, label: "Fast Shipping" },
              { icon: <FaUsers />, label: "Customer First" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center bg-white p-6 rounded-xl shadow hover:shadow-md transition"
              >
                <div className="text-3xl text-orange-500 mb-2">{item.icon}</div>
                <p className="text-lg font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Story */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <img
            src={story}
            alt="Our Story"
            className="rounded-xl shadow-md w-full object-cover"
          />
          <div className="space-y-4 px-4 md:px-0">
            <p>
              Sneakers started with a simple idea: to make exclusive sneakers
              accessible. We’ve grown into a trusted platform where sneakerheads
              find the rarest drops and the freshest fits — all curated with
              care.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mt-12">
          <p className="text-xl mb-4 font-medium">
            Step into the future of sneaker shopping.
          </p>
          <Link
            to="/collections"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg rounded-full transition"
          >
            Browse Collection
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;
