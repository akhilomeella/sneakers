import { useState } from "react";
import { useOrders } from "../Components/OrderContext";

const Orderhistory = () => {
  const { orders } = useOrders(); // get orders from context
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

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
      <div className="w-full p-6 mt-4 mb-36">
        <div className=" rounded-lg shadow">
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
              <div className="flex items-center w-full md:w-auto justify-end max-[320px]:justify-start">
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
                        <td className="border-b text-xs md:text-[13px] sm:text-base border-gray-300 px-2 sm:px-4 py-2 sm:py-3 max-[320px]:text-[10px]">
                          {order.id}
                        </td>
                        <td className="border-b text-xs md:text-[13px] sm:text-base border-gray-300 px-2 sm:px-4 py-2 sm:py-3 max-[320px]:text-[10px]">
                          {order.date}
                        </td>
                        <td className="border-b text-xs md:text-[13px] sm:text-base border-gray-300 px-2 sm:px-4 py-2 sm:py-3 hidden sm:table-cell md:hidden">
                          {order.items}
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
                          &#8358;{order.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500">No orders match your search.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orderhistory;
