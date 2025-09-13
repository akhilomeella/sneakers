import Home from "./Pages/Home";
import Collections from "./Pages/Collections";
import About from "./Pages/About";
import Men from "./Pages/Men";
import Women from "./Pages/Women";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Account from "./Pages/Account";
import Orderhistory from "./Pages/Orderhistory";
import Payment from "./Components/Payment";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  return (
    <>
      <div>
        <Router>
          <ScrollToTop />
          <div>
            <div className="sticky top-0 z-50">
              <Navbar />
            </div>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/orderhistory" element={<Orderhistory />} />

              <Route path="/contact" element={<Contact />} />
              <Route path="/account" element={<Account />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />

              <Route path="/collections" element={<Collections />} />
              <Route path="/men" element={<Men />} />
              <Route path="/women" element={<Women />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
