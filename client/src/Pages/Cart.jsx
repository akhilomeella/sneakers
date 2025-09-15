import { Link } from "react-router-dom";
import { useCart } from "../Components/CartContext.jsx";
import minus from "../Components/assets/images/icon-minus.svg";
import add from "../Components/assets/images/icon-plus.svg";
import { useOrders } from "../Components/OrderContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeItem, updateQuantity } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    const orderId = `ORD${Math.floor(100 + Math.random() * 900)}`;

    addOrder({
      id: orderId,
      date: new Date().toLocaleDateString(),
      items: cartItems.map((i) => i.name).join(", "),
      total: totalPrice,
      status: "Pending", // immediately set as pending
    });

    // navigate to Payment page with this orderId
    navigate("/payment", { state: { orderId } });
  };

  return (
    <div className="max-w-[1800px] mx-auto px-4 lg:px-40">
      <div className="w-full">
        <div className="py-10">
          <div className="py-5 w-full bg-orange-500">
            <h1 className="text-4xl font-bold mb-4 text-center text-white">
              Shopping Cart
            </h1>
          </div>

          <div className="w-screen sm:w-full bg-white rounded p-4">
            {cartItems.length > 0 ? (
              <div>
                <table className="w-11/12 sm:w-full table-auto text-left border-none ">
                  <thead>
                    <tr>
                      <th className="border-b py-2 text-sm sm:text-base">
                        Product
                      </th>
                      <th className="border-b py-2 text-sm sm:text-base hidden sm:block">
                        Price
                      </th>
                      <th className="border-b py-2 text-sm sm:text-base">
                        Quantity
                      </th>
                      <th className="border-b py-2 text-sm sm:text-base">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="py-3 flex items-center text-sm sm:text-base">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="size-6 sm:size-8 mr-2"
                          />
                          {item.name}
                        </td>
                        <td className="py-3 text-xs sm:text-base hidden sm:table-cell">
                          &#8358;{item.price}
                        </td>
                        <td className="py-3">
                          <div className="flex bg-[#f7f8fd] justify-between p-1 sm:p-2 w-14 sm:w-24 rounded-lg text-sm">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <img
                                src={minus}
                                alt="Decrease"
                                className="w-3 "
                              />
                            </button>

                            <h1 className="text-xs sm:text-base">
                              {item.quantity}
                            </h1>

                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <img src={add} alt="Increase" className="w-3 " />
                            </button>
                          </div>
                        </td>
                        <td className="py-2 text-sm sm:text-base">
                          &#8358;{item.price * item.quantity}
                        </td>
                        <td className="py-2">
                          <button onClick={() => removeItem(item.id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="text-right mt-4 mr-8 sm:mr-0 justify-between flex text-orange-500">
                  <Link to="/collections">
                    <div className="hidden sm:flex gap-1.5 text-sm ">
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

                      <p> Continue Shopping</p>
                    </div>
                  </Link>
                  <div>
                    <p className="text-base sm:text-lg font-semibold">
                      Total: &#8358;{totalPrice}
                    </p>

                    <button
                      className="mt-2 bg-orange-500 text-white px-4 py-2 rounded text-sm sm:text-base cursor-pointer"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
