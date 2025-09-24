import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    const loginStatus = localStorage.getItem("isLoggedIn");

    if (loggedInUserId && loginStatus === "true") {
      setUser(loggedInUserId);
      setIsLoggedIn(true);
    }

    // Set loading to false after checking
    setLoading(false);
  }, []);

  const login = (email) => {
    localStorage.setItem("loggedInUserId", email);
    localStorage.setItem("isLoggedIn", "true");
    setUser(email);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("loggedInUserId");
    localStorage.removeItem("isLoggedIn");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
