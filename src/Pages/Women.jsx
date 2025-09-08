import React from "react";
import sneakers from "../Components/data";
import Item from "../Components/Item";
import { motion } from "framer-motion";
import womenBanner from "../Components/assets/images/women-banner.webp";

const Women = () => {
  const items = sneakers;

  return (
    <div>
      <div
        className="w-full h-40 sm:h-56 md:h-72 lg:h-96 bg-cover bg-center flex items-center px-4 sm:px-8 lg:px-48"
        style={{ backgroundImage: `url(${womenBanner})` }}
      >
        <motion.h1
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold"
        >
          WOMEN
        </motion.h1>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-12 lg:px-36">
        {items.map((item, i) => {
          if (item.category === "Women") {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                images={item.images}
                price={item.price}
                description={item.description}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Women;
