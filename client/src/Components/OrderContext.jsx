import { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const savedOrder = localStorage.getItem("order");
    return savedOrder ? JSON.parse(savedOrder) : [];
  });

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(orders));
  }, [orders]);

  // Add a new order
  const addOrder = (order) => {
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
