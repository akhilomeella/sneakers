import { Link } from "react-router-dom";
import { useCart } from "../Components/Contexts/CartContext.jsx";
import minus from "../Components/assets/images/icon-minus.svg";
import add from "../Components/assets/images/icon-plus.svg";
import { useOrders } from "../Components/Contexts/OrderContext.jsx";
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
    const orderId = `ORD00${Math.floor(100 + Math.random() * 900)}`;

    addOrder({
      id: orderId,
      date: new Date().toLocaleDateString(),
      items: cartItems.map((i) => ({
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      total: totalPrice,
      status: "Pending", // immediately set as pending
    });

    // navigate to Payment page with this orderId
    navigate("/payment", { state: { orderId } });
  };

  return (
    <div className="max-w-[1800px] mx-auto px-4 lg:px-16 ">
      <div className=" w-full pt-4">
        <h1 className="text-2xl font-bold mb-2 text-center text-orange-500">
          Shopping Cart
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-10 items-center py-4 ">
        <div className=" w-full lg:w-3/4  ">
          <div className=" bg-white rounded px-4  ">
            {cartItems.length > 0 ? (
              <div className="flex flex-col justify-center">
                <table className="w-11/12 sm:w-full table-auto text-left border-none  ">
                  <thead>
                    <tr className="border-b border-gray-200  py-4">
                      <th className=" py-2 text-sm ">Product</th>

                      <th className=" py-2 text-sm ">Quantity</th>
                      <th className=" py-2 text-sm ">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-b border-gray-200 ">
                        <td className="py-8 flex items-center text-sm sm:text-base">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="size-6 sm:size-12 mr-2"
                          />
                          {item.name}
                        </td>

                        <td className="py-8">
                          <div className="flex bg-[#f7f8fd] justify-between p-1 sm:p-2 w-14 sm:w-24 rounded-lg text-sm">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <img
                                src={minus}
                                alt="Decrease"
                                className="lg:w-3 "
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
                          &#8358;{(item.price * item.quantity).toLocaleString()}
                        </td>
                        <td className="py-2">
                          <button onClick={() => removeItem(item.id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="size-4 lg:size-6"
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
                </div>
              </div>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        </div>

        <aside
          className={` ${
            cartItems.length === 0
              ? "hidden"
              : " w-full lg:w-1/4 border-solid border-2 border-gray-200 rounded-lg p-6 max-h-fit flex flex-col self-start"
          } `}
        >
          <h1 className="text-xl pb-4">Summary</h1>
          <hr className="border-gray-200 pb-4" />

          <div className="pb-4 ">
            <p className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>&#8358;{totalPrice.toLocaleString()}</span>
            </p>
            <p className="flex justify-between py-2">
              <span>Shipping Cost</span>
              <span>ertyuio</span>
            </p>
            <p className="flex justify-between py-2">
              <span>VAT</span>
              <span>ertyuio</span>
            </p>
          </div>
          <hr className="border-gray-200 pb-4" />
          <hr className="mt-20 pb-3 border-gray-200" />
          <div>
            <p className="flex justify-between py-2">
              <span>Total</span>
              <span>&#8358;{totalPrice.toLocaleString()}</span>
            </p>
          </div>

          <div>
            <button
              className="w-full mt-2 bg-orange-500 text-white px-4 py-2 rounded text-sm sm:text-base cursor-pointer"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
