import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Orderhistory from "./Orderhistory";
import ProtectedRoute from "../Components/ProtectedRoute";

const Account = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className=" flex ">
      <div>
        <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />
      </div>
      <div className="w-full">
        <ProtectedRoute>
          {activeSection === "dashboard" && <h1>Dashboard</h1>}
          {activeSection === "orders" && <Orderhistory />}
          {activeSection === "support" && <h1>Support</h1>}
        </ProtectedRoute>
      </div>
    </div>
  );
};

export default Account;
