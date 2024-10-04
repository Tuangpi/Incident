import CustomerTableLoading from "@/components/CustomerTableLoading";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";
import { customerFetchAllBugs } from "@/lib/customerBugClientAPI";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleAction } from "@/store/activeActionReducer";
import { Bug } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { BiCheckCircle, BiEdit, BiMenuAltLeft } from "react-icons/bi";
import { IoInformationCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const CustomerBugLists = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const actionId = useAppSelector((state) => state.activeAction.id);

    const customerSelectedProject = useAppSelector(
        (state) => state.selectProject.id
    );

    const handleActionToggle = (
        id: string,
        e: React.MouseEvent<SVGElement>
    ) => {
        e.stopPropagation();
        dispatch(toggleAction({ id: actionId === id ? undefined : id }));
    };

    const { data: bugs, isLoading } = useQuery<Bug[]>({
        queryKey: ["bugs", customerSelectedProject],
        queryFn: async () =>
            await customerFetchAllBugs(customerSelectedProject),
        enabled: customerSelectedProject !== "",
    });

    return (
        <main className="w-[98%] m-auto">
            {/* <div className="my-2 bg-white rounded-lg shadow-sm p-2">
                Filters will go here
            </div> */}

            <div className="bg-white rounded-lg shadow-md p-2 mt-4">
                {isLoading ? (
                    <CustomerTableLoading numberOfTableColumns={6} />
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Priority</th>
                                <th>Severity</th>
                                <th>Summary</th>
                                <th>Status</th>
                                <th>Progress</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {bugs && bugs?.length > 0 ? (
                                bugs?.map((bug, i) => (
                                    <tr key={bug.id}>
                                        <td>{i + 1}</td>
                                        <td className="cursor-pointer hover:underline">
                                            <Link
                                                to={`${ROUTE_PATHS.CUSTOMER_BUG_DETAIL}/${bug.id}`}
                                            >
                                                {bug.title}
                                            </Link>
                                        </td>
                                        <td>{bug.type || "--"}</td>
                                        <td>{bug.priority}</td>
                                        <td>{bug.severity}</td>
                                        <td>{bug.description}</td>
                                        <td>{bug.status}</td>
                                        <td>{bug.progress}%</td>
                                        <td className="text-sm relative">
                                            <div className="flex justify-center items-center absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
                                                <BiMenuAltLeft
                                                    size={20}
                                                    className="cursor-pointer"
                                                    onClick={(e) =>
                                                        handleActionToggle(
                                                            bug.id,
                                                            e
                                                        )
                                                    }
                                                />
                                                {actionId == bug.id && (
                                                    <div
                                                        className="bg-white w-28 h-28 absolute top-4 right-4 rounded-md select-none border border-zinc-300"
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                    >
                                                        <Link
                                                            to={`${ROUTE_PATHS.CUSTOMER_BUG_DETAIL}/${bug.id}`}
                                                            className="flex items-center gap-x-2 hover:bg-zinc-200 p-2 px-2.5 rounded-t-md border-b border-gray-200"
                                                        >
                                                            <IoInformationCircle
                                                                size={20}
                                                            />
                                                            <span>Detail</span>
                                                        </Link>
                                                        <Link
                                                            to={`${ROUTE_PATHS.CUSTOMER_BUG_EDIT}/${bug.id}`}
                                                            className="flex items-center gap-x-2 p-2 px-2.5 hover:bg-zinc-200 border-b border-gray-200"
                                                        >
                                                            <BiEdit size={20} />
                                                            <span>Edit</span>
                                                        </Link>
                                                        <div className="flex items-center gap-x-2 p-2 px-2.5 hover:bg-zinc-200 border-b border-gray-200 cursor-pointer">
                                                            <BiCheckCircle
                                                                size={20}
                                                            />
                                                            <span>
                                                                Resolved
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td>no data</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </main>
    );
};
export default CustomerBugLists;
