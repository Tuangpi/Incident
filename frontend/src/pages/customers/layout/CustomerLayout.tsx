import { Outlet } from "react-router-dom";
import CustomerHeader from "./CustomerHeader";

const CustomerLayout = () => {
    return (
        <div className="h-screen bg-gray-100 overflow-y-auto scrollbar-incident">
            <CustomerHeader />
            <Outlet />
        </div>
    );
};
export default CustomerLayout;
