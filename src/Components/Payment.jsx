import { useState, useEffect } from "react";

const Payment = () => {
  const publicKey = "pk_test_6e62a658683ffa09f2e2b90b0634febac2ec8f0b";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [number, setNumber] = useState("");

  // Load Paystack script once when the component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const isFormValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    amount > 0 &&
    number.trim() !== "";

  // Function to trigger Paystack payment
  const payWithPaystack = () => {
    const handler = window.PaystackPop.setup({
      key: publicKey,
      email,
      amount: amount * 100,
      metadata: {
        custom_fields: [
          {
            display_name: "Name",
            variable_name: "name",
            value: name,
          },
          {
            display_name: "Phone Number",
            variable_name: "phone_number",
            value: number,
          },
        ],
      },
      callback: (response) => {
        alert("Payment successful! Reference: " + response.reference);
      },
      onClose: () => {
        alert("Transaction closed");
      },
    });
    handler.openIframe();
  };

  const style = {
    input:
      "block w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none",
    button: `block w-full px-4 py-2 rounded-md text-white ${
      isFormValid ? "bg-[#1369A1]" : "bg-gray-400 cursor-not-allowed"
    }`,
  };

  return (
    <div className="px-4">
      <h1 className="text-center text-[25px] my-4 font-[600]">
        Make payment here
      </h1>
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
          type="text"
          value={email}
          placeholder="Email"
          className={style.input}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="number"
          value={amount}
          placeholder="Amount (in USD)"
          className={style.input}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          required
          type="number"
          value={number}
          placeholder="Phone Number"
          className={style.input}
          onChange={(e) => setNumber(e.target.value)}
        />

        {/* Custom Button instead of PaystackButton */}
        <button
          onClick={payWithPaystack}
          className={style.button}
          disabled={!isFormValid}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
