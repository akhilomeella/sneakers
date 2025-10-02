import {
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "./Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeSection, onNavigate }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: HomeIcon },
    { id: "orders", label: "Orders", icon: ShoppingCartIcon },
    { id: "support", label: "Settings", icon: Cog6ToothIcon },
    { id: "affiliate", label: "Affiliate Area", icon: UserIcon },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <aside className="w-64 border-b-0 h-screen bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="mt-3 text-lg font-semibold">{user}</h2>
        </div>

        {/* Menu Section */}
        <nav className="w-full flex flex-col gap-2">
          {menuItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`flex items-center cursor-pointer  gap-3 px-4 py-2 rounded-md font-medium transition
                ${
                  isActive
                    ? "bg-orange-500 text-white shadow"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon
                  size={8}
                  className={`h-5 w-5 ${
                    isActive ? "text-white" : "text-orange-500"
                  }`}
                />
                {label}
              </button>
            );
          })}
          <hr className="my-2" />

          <button
            onClick={handleLogout}
            className="mt-2 text-sm px-4 py-1 border rounded-md hover:bg-slate-100"
          >
            Log Out
          </button>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
