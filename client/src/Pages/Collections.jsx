import { useState, useEffect } from "react";
import Item from "../Components/Item";
import { motion } from "framer-motion";
import colBanner from "../Components/assets/images/collection-banner.avif";

const Collections = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch data on component mount
  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        // Fetch all sneakers using the query param we built earlier
        const response = await fetch(
          "http://localhost:3000/api/v1/products/sneakers?category="
        );
        const data = await response.json();

        // Update state with the database data
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sneakers:", error);
        setLoading(false);
      }
    };

    fetchSneakers();
  }, []); // Empty dependency array = run once on load

  if (loading) {
    return <div className="text-center py-20">Loading Collections...</div>;
  }

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

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-12 lg:px-36 pb-20">
        {items.map((item) => (
          <Item
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.mainImage}
            images={item.images}
            price={item.price}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Collections;
