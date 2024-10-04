import { Outlet } from "react-router-dom";
import CustomerHeader from "./CustomerHeader";
import { useAppDispatch } from "@/store";
import { toggleAction } from "@/store/activeActionReducer";

const CustomerLayout = () => {
    const dispatch = useAppDispatch();

    return (
        <div
            className="h-screen bg-gray-100 overflow-y-auto scrollbar-incident"
            onClick={() => dispatch(toggleAction({ id: undefined }))}
        >
            <CustomerHeader />
            <Outlet />
        </div>
    );
};
export default CustomerLayout;
