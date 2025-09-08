import sneakers from "../Components/data";
import Item from "../Components/Item";
import { motion } from "framer-motion";
import menBanner from "../Components/assets/images/men-banner.webp";

const Men = () => {
  const items = sneakers;

  return (
    <div>
      <div
        className="x-6 sm:px-12 md:px-24 lg:px-48 py-20 sm:py-28 lg:py-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${menBanner})` }}
      >
        <motion.h1
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left text-4xl sm:text-5xl lg:text-6xl text-white font-extrabold"
        >
          MEN
        </motion.h1>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 sm:gap-8 px-6 sm:px-12 md:px-24 lg:px-36">
        {items.map((item, i) => {
          if (item.category === "Men") {
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

export default Men;
