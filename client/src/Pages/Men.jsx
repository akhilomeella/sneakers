import { useState, useEffect } from "react";
import Item from "../Components/Item";
import { motion } from "framer-motion";
import menBanner from "../Components/assets/images/men-banner.webp";

const Men = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch data on component mount
  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        // Fetch ONLY Men's sneakers using the query param we built earlier
        const response = await fetch(
          "http://localhost:3000/api/v1/products/sneakers?category=Men"
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
    return <div className="text-center py-20">Loading Men's Collection...</div>;
  }
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

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 px-6 sm:px-12 md:px-24 lg:px-36 pb-20">
        {items.map((item) => (
          <Item
            key={item._id} // MongoDB uses _id, not id
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

export default Men;
