import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../Components/CartContext";
import { useOrders } from "../Components/OrderContext";

const Payment = () => {
  const publicKey = "pk_test_6e62a658683ffa09f2e2b90b0634febac2ec8f0b";

  const navigate = useNavigate();
  const location = useLocation();

  const { orderId } = location.state || {}; // get orderId passed from Cart
  const { updateOrderStatus } = useOrders();
  const { cartItems, clearCart } = useCart();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  // calculate cart total
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Load Paystack script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const isFormValid =
    name.trim() !== "" && email.trim() !== "" && number.trim() !== "";

  // Function to trigger Paystack payment
  const payWithPaystack = () => {
    const handler = window.PaystackPop.setup({
      key: publicKey,
      email,
      amount: totalAmount * 100,
      metadata: {
        custom_fields: [
          { display_name: "Name", variable_name: "name", value: name },
          {
            display_name: "Phone Number",
            variable_name: "phone_number",
            value: number,
          },
        ],
      },
      callback: () => {
        alert("Payment successful!");
        updateOrderStatus(orderId, "Successful");
        clearCart();
        navigate("/orderhistory");
      },
      onClose: () => {
        alert("Transaction closed");
        updateOrderStatus(orderId, "Cancelled");
        navigate("/orderhistory");
      },
    });
    handler.openIframe();
  };

  const style = {
    input:
      "block w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none",
    button: `block w-full px-4 py-2 rounded-md text-white ${
      isFormValid
        ? "bg-[#1369A1] cursor-pointer"
        : "bg-gray-400 cursor-not-allowed"
    }`,
  };

  return (
    <div className="px-4">
      <h1 className="text-center text-[25px] my-4 font-[600]">Make Payment</h1>
      <div className="max-w-md mx-auto my-4">
        <input
          required
          type="text"
          value={name}
          placeholder="Full Name"
          className={style.input}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          type="email"
          value={email}
          placeholder="Email"
          className={style.input}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="number"
          value={number}
          placeholder="Phone Number"
          className={style.input}
          onChange={(e) => setNumber(e.target.value)}
        />

        <p className="mb-2 text-center font-semibold">
          Total Amount: &#8358;{totalAmount}
        </p>

        <button
          onClick={payWithPaystack}
          className={style.button}
          disabled={!isFormValid}
        >
          Pay Now
        </button>

        <Link to="/cart">
          <div
            className="hidden sm:flex gap-1.5 text-sm "
            // onClick={() => {
            //   if (orderId) {
            //     updateOrderStatus(orderId, "Pending");
            //   }
            // }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="orange"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>

            <p> Go back</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Payment;
