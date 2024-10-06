import CustomerDashboardLoading from "@/components/CustomerDashboardLoading";
import { fetchCustomerDashboardData } from "@/lib/clientAPI";
import { Bug } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { formatRelative } from "date-fns";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

interface DashboardState {
    id: string;
    name: string;
    open_bugs_count: number;
    resolved_bugs_count: number;
    total_bugs: number;
    updated_at: string;

    bugs: Bug[];
}

const CustomerDashboard = () => {
    const { data: customerDashboards, isLoading } = useQuery<DashboardState[]>({
        queryKey: ["customerDashboard"],
        queryFn: fetchCustomerDashboardData,
    });

    if (isLoading) {
        return <CustomerDashboardLoading />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 m-auto mt-6 gap-4 text-sm">
            {customerDashboards?.map((customerDashboard) => (
                <div
                    className="bg-white p-6 w-full shadow-lg rounded-lg"
                    key={customerDashboard.id}
                >
                    {/* Title Section */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="font-bold text-green-800 text-xl">
                            {customerDashboard?.name}
                        </div>
                        <div className="text-sm text-gray-600">
                            {customerDashboard?.updated_at &&
                                formatRelative(
                                    new Date(customerDashboard.updated_at),
                                    new Date()
                                )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-gray-700">
                        <div className="font-semibold">Total Bugs</div>
                        <div className="text-right">
                            {customerDashboard?.total_bugs}
                        </div>

                        <div className="font-semibold">Open Bugs</div>
                        <div className="text-right text-red-500">
                            {customerDashboard?.open_bugs_count}
                        </div>

                        <div className="font-semibold">Resolved Bugs</div>
                        <div className="text-right text-green-500">
                            {customerDashboard?.resolved_bugs_count}
                        </div>

                        <div className="font-semibold">Bug Status</div>
                        <div className="text-right">
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                In Progress
                            </span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="flex justify-between items-center mb-2">
                            <div className="font-semibold text-gray-700">
                                Overall Progress
                            </div>
                            <div className="text-sm text-gray-600">45%</div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: "45%" }}
                            ></div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6 space-x-2">
                        <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md shadow-md hover:bg-blue-600">
                            View Details
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-md shadow-md hover:bg-gray-200">
                            Edit Project
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default CustomerDashboard;
