import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";
import useAuth from "@/hooks/useAuth";
import { customerFetchAllProjects } from "@/lib/clientAPI";
import { useAppDispatch, useAppSelector } from "@/store";
import { Project } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useLocation } from "react-router-dom";
import { setSelectProject } from "./store/selectProjectReducer";
import { RxDashboard } from "react-icons/rx";
import { BiListOl } from "react-icons/bi";
import { IoBug } from "react-icons/io5";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CustomerHeader = () => {
    const { logout } = useAuth();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const selectedProject = useAppSelector((state) => state.selectProject.id);

    const { data: projects, isLoading } = useQuery<Project[]>({
        queryKey: ["projects"],
        queryFn: customerFetchAllProjects,
    });

    const handleLogout = () => {
        logout("/customer/logout")
            .then(() => <Navigate to={ROUTE_PATHS.CUSTOMER_LOGIN} />)
            .catch((error) => console.log(error));
    };

    return (
        <>
            <div className="w-full h-16 bg-stone-800 flex flex-col justify-center text-primary">
                <div className="flex justify-between items-center px-4 mt-4">
                    {isLoading ? (
                        <SkeletonTheme
                            baseColor="#323232"
                            highlightColor="#525252"
                        >
                            <div className="ml-8 w-1/6">
                                <Skeleton className="h-8" />
                            </div>
                        </SkeletonTheme>
                    ) : (
                        <>
                            <div className="ml-8 flex justify-start items-center gap-x-2">
                                {projects && projects?.length > 0 && (
                                    <img
                                        src={`${
                                            import.meta.env.VITE_API_BASE_URL
                                        }/storage/uploads/companyLogo/${
                                            projects[0].company.logo
                                        }`}
                                        alt="company logo"
                                        className="w-12 h-12"
                                    />
                                )}
                                <h3 className="text-zinc-200">
                                    {projects &&
                                        projects?.length > 0 &&
                                        projects[0].company.name}
                                </h3>
                            </div>
                        </>
                    )}
                    <Button variant="secondary" onClick={() => handleLogout()}>
                        Logout
                    </Button>
                </div>
            </div>
            <div className="bg-[#221f1e] w-full pt-3 pl-12 pr-4 flex justify-between items-end">
                <div className="flex justify-between items-center text-zinc-200 gap-x-2">
                    <Link
                        to={ROUTE_PATHS.CUSTOMER_DASHBOARD}
                        className={`flex items-center gap-x-1 rounded-t-md px-2 py-1 text-sm ${
                            location.pathname.includes("dashboard")
                                ? "bg-[#5F9729]"
                                : "bg-zinc-700 hover:bg-zinc-900"
                        }`}
                    >
                        <RxDashboard size={16} />
                        <span>Overview</span>
                    </Link>
                    <Link
                        to={ROUTE_PATHS.CUSTOMER_BUG_LISTS}
                        className={`flex items-center gap-x-1 rounded-t-md px-2 py-1 text-sm ${
                            location.pathname.endsWith("bug-lists")
                                ? "bg-[#5F9729]"
                                : "bg-zinc-700 hover:bg-zinc-900"
                        }`}
                    >
                        <BiListOl size={20} />
                        <span>Bug Lists</span>
                    </Link>
                    {selectedProject !== "all" && (
                        <Link
                            to={ROUTE_PATHS.CUSTOMER_BUG_CREATE}
                            className={`flex items-center gap-x-1 rounded-t-md px-2 py-1 text-sm ${
                                location.pathname.includes("create")
                                    ? "bg-[#5F9729]"
                                    : "bg-zinc-700 hover:bg-zinc-900"
                            }`}
                        >
                            <IoBug size={20} />
                            <span>Create Bug</span>
                        </Link>
                    )}
                </div>
                <Select
                    value={selectedProject}
                    onValueChange={(value) =>
                        dispatch(setSelectProject({ id: value }))
                    }
                >
                    <SelectTrigger className="bg-zinc-300 w-1/6">
                        <SelectValue placeholder="Select Project" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 text-zinc-300">
                        <SelectGroup>
                            <SelectLabel>Select Project</SelectLabel>
                            <SelectItem value="all">All Projects</SelectItem>
                            {isLoading
                                ? "loading... "
                                : projects?.map((project) => (
                                      <SelectItem
                                          key={project.id}
                                          value={project.id}
                                      >
                                          {project.name}
                                      </SelectItem>
                                  ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </>
    );
};
export default CustomerHeader;
