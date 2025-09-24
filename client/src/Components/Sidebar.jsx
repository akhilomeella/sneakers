import {
  Home,
  ShoppingCart,
  Mail,
  Download,
  Key,
  LifeBuoy,
  Users,
} from "lucide-react";
import { useAuth } from "./Contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <aside className="w-64 bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="mt-3 text-lg font-semibold">Ashraf Hossain</h2>
        </div>

        {/* Menu Section */}
        <nav className="w-full flex flex-col gap-2">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 rounded-md bg-orange-500 text-white font-medium shadow"
          >
            <Home size={18} /> Dashboard
          </a>
          <Link
            to="/orderhistory"
            className="flex items-center gap-3 px-4 py-2 rounded-md text-slate-700 hover:bg-slate-100"
          >
            <ShoppingCart size={18} className="text-orange-500" /> Orders
          </Link>
          <Link className="flex items-center gap-3 px-4 py-2 rounded-md text-slate-700 hover:bg-slate-100">
            <Mail size={18} className="text-orange-500" /> Subscriptions
          </Link>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 rounded-md text-slate-700 hover:bg-slate-100"
          >
            <Download size={18} className="text-orange-500" /> Downloads
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 rounded-md text-slate-700 hover:bg-slate-100"
          >
            <Key size={18} className="text-orange-500" /> My Licenses
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 rounded-md text-slate-700 hover:bg-slate-100"
          >
            <LifeBuoy size={18} className="text-orange-500" /> Support
          </a>
          <hr className="my-2" />
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 rounded-md text-slate-700 hover:bg-slate-100"
          >
            <Users size={18} className="text-orange-500" /> Affiliate Area
          </a>
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
