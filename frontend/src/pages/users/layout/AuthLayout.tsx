import { Outlet } from "react-router-dom";
import { useAppDispatch } from "@/store";
import { toggleDropDown } from "./store/UserMenuDropDownReducer";
import AuthSidebar from "./AuthSidebar";
import AuthHeader from "./AuthHeader";
import { toggleAction } from "../Employee/store/activeActionReducer";

const AuthLayout = () => {
    const dispatch = useAppDispatch();

    return (
        <div
            className="flex bg-zinc-900 text-zinc-400"
            onClick={() => {
                dispatch(toggleAction({ id: undefined }));
                dispatch(toggleDropDown({ isOpen: false }));
            }}
        >
            <div className="w-0 sm:w-1/5 max-h-screen overflow-y-auto sidebar-scrollbar bg-[#1f1f22]">
                <AuthSidebar />
            </div>
            <div className="w-full h-screen overflow-y-auto relative">
                <AuthHeader />
                <Outlet />
            </div>
        </div>
    );
};
export default AuthLayout;
