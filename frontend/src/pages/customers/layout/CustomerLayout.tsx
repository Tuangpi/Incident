import { Outlet } from "react-router-dom";
import CustomerHeader from "./CustomerHeader";

const CustomerLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <CustomerHeader />
      <Outlet />
    </div>
  );
};
export default CustomerLayout;
