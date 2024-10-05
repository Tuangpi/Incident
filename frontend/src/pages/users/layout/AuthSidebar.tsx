import logo from "@/assets/react.svg";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";
import { BiBug } from "react-icons/bi";
import {
    TbBuildingBank,
    TbDashboard,
    TbProtocol,
    TbReport,
    TbUserCheck,
    TbUsers,
} from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
const AuthSidebar = () => {
    const location = useLocation();
    return (
        <div className="w-full">
            <Link
                to={ROUTE_PATHS.USER_DASHBOARD}
                className="flex justify-center items-center bg-zinc-800 py-3"
            >
                <div>
                    <img src={logo} />
                </div>
            </Link>
            <div className="ml-1 mt-3">
                <Link
                    to={ROUTE_PATHS.USER_DASHBOARD}
                    className={`mt-2 px-6 py-2 rounded-l-md flex justify-center lg:justify-start items-center gap-x-2 text-gray-light ${
                        location.pathname.includes("dashboard")
                            ? "bg-zinc-800 text-gray-300"
                            : "hover:text-gray-300 hover:bg-zinc-800"
                    }`}
                >
                    <TbDashboard size={23} />
                    <span className="hidden lg:block text-[15px]">
                        Dashboard
                    </span>
                </Link>

                <div className="mt-5 flex justify-center mx-1 lg:justify-start lg:mx-6 text-sm text-gray-300 font-semibold">
                    Manage Users
                </div>
                <Link
                    to={ROUTE_PATHS.USER_EMPLOYEE_LISTS}
                    className={`mt-2 px-6 py-2 rounded-l-md flex justify-center lg:justify-start items-center gap-x-2 text-gray-light ${
                        location.pathname.includes("employee")
                            ? "bg-zinc-800 text-gray-300"
                            : "hover:text-gray-300 hover:bg-zinc-800"
                    }`}
                >
                    <TbUsers size={23} />
                    <span className="hidden lg:block text-[15px]">
                        Employees
                    </span>
                </Link>
                <Link
                    to={ROUTE_PATHS.USER_CUSTOMER_LISTS}
                    className={`mt-2 px-6 py-2 rounded-l-md flex justify-center lg:justify-start items-center gap-x-2 text-gray-light ${
                        location.pathname.includes("customer")
                            ? "bg-zinc-800 text-gray-300"
                            : "hover:text-gray-300 hover:bg-zinc-800"
                    }`}
                >
                    <TbUserCheck size={23} />
                    <span className="hidden lg:block text-[15px]">
                        Customers
                    </span>
                </Link>

                <div className="mt-5 flex justify-center mx-1 lg:justify-start lg:mx-6 text-sm text-gray-300 font-semibold">
                    Manage Company
                </div>
                <Link
                    to={ROUTE_PATHS.USER_COMPANY_LISTS}
                    className={`mt-2 px-6 py-2 rounded-l-md flex justify-center lg:justify-start items-center gap-x-2 text-gray-light ${
                        location.pathname.includes("company")
                            ? "bg-zinc-800 text-gray-300"
                            : "hover:text-gray-300 hover:bg-zinc-800"
                    }`}
                >
                    <TbBuildingBank size={23} />
                    <span className="hidden lg:block text-[15px]">
                        Companies
                    </span>
                </Link>

                <div className="mt-5 flex justify-center mx-1 lg:justify-start lg:mx-6 text-sm text-gray-300 font-semibold">
                    Manage Projects
                </div>
                <Link
                    to={ROUTE_PATHS.USER_PROJECT_LISTS}
                    className={`mt-2 px-6 py-2 rounded-l-md flex justify-center lg:justify-start items-center gap-x-2 text-gray-light ${
                        location.pathname.includes("project")
                            ? "bg-zinc-800 text-gray-300"
                            : "hover:text-gray-300 hover:bg-zinc-800"
                    }`}
                >
                    <TbProtocol size={23} />
                    <span className="hidden lg:block text-[15px]">
                        Projects
                    </span>
                </Link>

                <div className="mt-5 flex justify-center mx-1 lg:justify-start lg:mx-6 text-sm text-gray-300 font-semibold">
                    Manage Bugs
                </div>
                <Link
                    to={ROUTE_PATHS.USER_BUG_TYPE_LISTS}
                    className={`mt-2 px-6 py-2 rounded-l-md flex justify-center lg:justify-start items-center gap-x-2 text-gray-light ${
                        location.pathname.includes("bugs-type-lists")
                            ? "bg-zinc-800 text-gray-300"
                            : "hover:text-gray-300 hover:bg-zinc-800"
                    }`}
                >
                    <BiBug size={23} />
                    <span className="hidden lg:block text-[15px]">
                        Bugs Types
                    </span>
                </Link>
                <Link
                    to={ROUTE_PATHS.USER_BUG_LISTS}
                    className={`mt-2 px-6 py-2 rounded-l-md flex justify-center lg:justify-start items-center gap-x-2 text-gray-light ${
                        location.pathname.includes("bugs-lists")
                            ? "bg-zinc-800 text-gray-300"
                            : "hover:text-gray-300 hover:bg-zinc-800"
                    }`}
                >
                    <TbReport size={23} />
                    <span className="hidden lg:block text-[15px]">
                        Bugs / Issues
                    </span>
                </Link>
            </div>
        </div>
    );
};
export default AuthSidebar;
