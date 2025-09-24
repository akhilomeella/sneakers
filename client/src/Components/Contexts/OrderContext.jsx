import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  // Get user from AuthContext instead of localStorage directly
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);

  // Load orders when user changes (including login/logout)
  useEffect(() => {
    if (user) {
      const savedOrders = localStorage.getItem(`orders_${user}`);
      setOrders(savedOrders ? JSON.parse(savedOrders) : []);
    } else {
      // Clear orders when user logs out
      setOrders([]);
    }
  }, [user]);

  // Save orders when orders change (only if user is logged in)
  useEffect(() => {
    if (user && orders.length >= 0) {
      localStorage.setItem(`orders_${user}`, JSON.stringify(orders));
    }
  }, [orders, user]);

  // Add a new order
  const addOrder = (order) => {
    if (!user) {
      alert("Please log in to place an order");
      return;
    }

    setOrders((prev) => [...prev, order]);
  };

  // Update status of an existing order
  const updateOrderStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );
  };

  const clearOrders = () => {
    setOrders([]);
  };

  return (
    <OrderContext.Provider
      value={{ orders, addOrder, updateOrderStatus, clearOrders }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// Hook to use the context
export const useOrders = () => useContext(OrderContext);
