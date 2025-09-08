import sneakers from "../Components/data";
import Item from "../Components/Item";
import { motion } from "framer-motion";
import colBanner from "../Components/assets/images/collection-banner.avif";

const Collections = () => {
  const items = sneakers;

  return (
    <div>
      <div
        className="py-20 sm:py-32 lg:py-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${colBanner})` }}
      >
        <motion.h1
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left sm:text-left text-3xl sm:text-5xl lg:text-6xl text-white font-extrabold px-4 sm:px-12"
        >
          COLLECTIONS
        </motion.h1>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-12 lg:px-36">
        {items.map((item, i) => {
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
        })}
      </div>
    </div>
  );
};

export default Collections;
