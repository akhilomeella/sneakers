import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOrders } from "../Components/Contexts/OrderContext";
import Modal from "../Components/Modal";

const Orderhistory = () => {
  const { orders, clearOrders } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="w-full pt-4 ">
        <div>
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl sm:text-4xl font-bold text-center text-orange-500">
              Order History
            </h1>
          </div>
          <div className="flex flex-col justify-center px-6 py-4">
            <div className="flex flex-row mb-4 justify-between max-[320px]:flex-col ">
              <div className="flex  items-center md:mb-0 md:mr-4">
                <label
                  htmlFor="statusFilter"
                  className="mr-2 md:text-[13px] text-gray-700 hidden sm:block"
                >
                  Filter by Status:
                </label>
                <select
                  id="statusFilter"
                  className=" border border-gray-300 rounded-md px-1 sm:px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs md:text-[13px] sm:text-base max-[320px]:text-[10px]"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Successful">Successful</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex gap-4 items-center w-full md:w-auto justify-end max-[320px]:justify-start">
                <button
                  onClick={() => clearOrders()}
                  className="text-red-500 text-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="Search"
                  className=" flex sm:flex-grow border border-gray-300 text-xs md:text-[13px] sm:text-base max-[320px]:text-[10px] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-center ">
              {filteredOrders.length > 0 ? (
                <table className="w-11/12 sm:w-full  table-auto text-left border-collapse px-4">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border-b border-gray-300 px-0 pr-4 sm:px-4 py-2 sm:py-3 text-left text-xs md:text-[13px] sm:text-base max-[320px]:text-[10px]">
                        Order ID
                      </th>
                      <th className="border-b text-xs md:text-[13px] sm:text-base border-gray-300 px-0 sm:px-4 py-2 sm:py-3 text-left max-[320px]:text-[10px]">
                        Date
                      </th>

                      <th className="border-b text-xs md:text-[13px] sm:text-base border-gray-300 px-0 sm:px-4 py-2 sm:py-3 text-left  hidden sm:table-cell md:hidden">
                        Items
                      </th>
                      <th className="border-b text-xs md:text-[13px] sm:text-base border-gray-300 px-0 sm:px-4 py-2 sm:py-3 text-left max-[320px]:text-[10px]">
                        Status
                      </th>
                      <th className="border-b text-xs md:text-[13px] sm:text-base border-gray-300 px-0 sm:px-4 py-2 sm:py-3 text-left max-[320px]:hidden">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-100">
                        <td
                          onClick={() => setSelectedOrder(order)}
                          className="border-b text-xs md:text-[13px] sm:text-base underline cursor-pointer border-gray-300 px-2 sm:px-4 py-2 sm:py-3 max-[320px]:text-[10px]"
                        >
                          {order.id}
                        </td>
                        <td className="border-b text-xs md:text-[13px] sm:text-base border-gray-300 px-2 sm:px-4 py-2 sm:py-3 max-[320px]:text-[10px]">
                          {order.date}
                        </td>
                        <td className="border-b text-xs md:text-[13px] sm:text-base border-gray-300 px-2 sm:px-4 py-2 sm:py-3 hidden sm:table-cell md:hidden">
                          {order.items.length}
                        </td>
                        <td className="border-b text-xs md:text-[13px] sm:text-base border-gray-300 px-2 sm:px-4 py-2 sm:py-3">
                          <span
                            className={`inline-block px-1 sm:px-2 py-1 text-sm font-extralight sm:font-semibold rounded max-[320px]:text-[10px] ${
                              order.status === "Successful"
                                ? "bg-green-40 text-xs md:text-[13px] sm:text-base text-green-400 outline"
                                : order.status === "Pending"
                                ? "bg-yellow-40 text-xs md:text-[13px] sm:text-base text-orange-300 outline"
                                : "bg-red-40 text-xs md:text-[13px] sm:text-base text-red-500 outline"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="border-b text-xs md:text-[13px] sm:text-base border-gray-300 px-2 sm:px-4 py-2 sm:py-3  max-[320px]:hidden">
                          &#8358;{order.total.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500">No orders match your search.</p>
              )}
            </div>
            {console.log("Selected Order:", selectedOrder)}
            <Modal
              isOpen={!!selectedOrder}
              onClose={() => setSelectedOrder(null)}
              title={`Order Details - ${selectedOrder?.id}`}
            >
              {selectedOrder && (
                <div>
                  <p className="mb-2 font-medium">Date: {selectedOrder.date}</p>
                  <p className="mb-2 font-medium">
                    Status: {selectedOrder.status}
                  </p>
                  <p className="mb-2 font-medium">
                    Total: ₦{selectedOrder.total.toLocaleString()}
                  </p>

                  <h3 className="font-semibold mt-4 mb-2">Items Ordered:</h3>
                  <ul className="list-disc list-inside">
                    {selectedOrder.items.map((item, index) => (
                      <li key={index}>
                        {item.name} – ₦{item.price.toLocaleString()}
                      </li>
                    ))}
                  </ul>

                  <div className="hidden sm:flex gap-1.5 text-sm justify-end mt-4">
                    <button
                      onClick={() => {
                        if (selectedOrder.status === "Pending") {
                          navigate("/payment", {
                            state: {
                              orderId: selectedOrder.id,
                              orderTotal: selectedOrder.total,
                            },
                          });
                        }
                      }}
                      disabled={selectedOrder.status !== "Pending"}
                      className={`text-white px-4 py-2 rounded text-sm sm:text-base ${
                        selectedOrder.status === "Pending"
                          ? "cursor-pointer bg-orange-500"
                          : "hidden"
                      }`}
                    >
                      Complete Payment
                    </button>
                  </div>
                </div>
              )}
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orderhistory;
