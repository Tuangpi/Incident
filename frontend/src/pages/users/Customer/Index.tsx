import { Button } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";
import { useAppDispatch, useAppSelector } from "@/store";
import { BiEdit, BiMenuAltLeft, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toggleAction } from "../../../store/activeActionReducer";
import { useQuery } from "@tanstack/react-query";
import { Customer as CustomerType } from "@/types";
import { fetchAllCustomers } from "@/lib/clientAPI";
import TableLoading from "@/components/TableLoading";
import { IoInformationCircle } from "react-icons/io5";

const Customer = () => {
    const dispatch = useAppDispatch();
    const actionId = useAppSelector((state) => state.activeAction.id);

    const handleActionToggle = (
        id: string,
        e: React.MouseEvent<SVGElement>
    ) => {
        e.stopPropagation();
        dispatch(toggleAction({ id: actionId === id ? undefined : id }));
    };

    const { data: customers, isLoading } = useQuery<CustomerType[]>({
        queryKey: ["customers"],
        queryFn: fetchAllCustomers,
    });

    return (
        <div className="m-2 text-zinc-300">
            <div className="mb-4">
                <h5 className="text-zinc-300">Customer Lists</h5>
            </div>
            <div className="bg-zinc-800 p-3 rounded-md">
                <div className="flex justify-end mb-3">
                    <Link to={ROUTE_PATHS.USER_CUSTOMER_CREATE}>
                        <Button variant="secondary">Create</Button>
                    </Link>
                </div>
                {isLoading ? (
                    <TableLoading numberOfTableColumns={8} />
                ) : (
                    <table className="bg-zinc-800 rounded-t-lg">
                        <thead>
                            <tr className="bg-zinc-600">
                                <th className="py-2 text-zinc-300 border-r border-b border-solid border-zinc-600 rounded-tl-lg">
                                    ID
                                </th>
                                <th className="py-2 text-zinc-300 border border-solid border-zinc-600">
                                    Email
                                </th>
                                <th className="py-2 text-zinc-300 border-l border-b border-solid border-zinc-600 rounded-tr-lg text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers && customers.length > 0 ? (
                                customers.map((customer, i) => (
                                    <tr
                                        className="hover:bg-zinc-700"
                                        key={customer.id}
                                    >
                                        <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                            {i + 1}
                                        </td>
                                        <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                            {customer.email}
                                        </td>
                                        <td className="text-zinc-300 border border-solid border-zinc-600 text-sm relative">
                                            <div className="flex justify-center items-center absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10">
                                                <BiMenuAltLeft
                                                    size={20}
                                                    className="cursor-pointer"
                                                    onClick={(e) =>
                                                        handleActionToggle(
                                                            customer.id,
                                                            e
                                                        )
                                                    }
                                                />
                                                {actionId == customer.id && (
                                                    <div
                                                        className="bg-zinc-700 w-28 h-28 absolute top-4 right-4 rounded-md select-none border border-zinc-500"
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                    >
                                                        <Link
                                                            to={`${ROUTE_PATHS.USER_CUSTOMER_DETAIL}/${customer.id}`}
                                                            className="flex items-center gap-x-2 hover:bg-zinc-600 p-2 px-2.5 rounded-t-md border-b border-gray-500"
                                                        >
                                                            <IoInformationCircle
                                                                size={20}
                                                            />
                                                            <span>Detail</span>
                                                        </Link>
                                                        <Link
                                                            to={`${ROUTE_PATHS.USER_CUSTOMER_EDIT}/${customer.id}`}
                                                            className="flex items-center gap-x-2 p-2 px-2.5 hover:bg-zinc-600 border-b border-gray-500"
                                                        >
                                                            <BiEdit size={20} />
                                                            <span>Edit</span>
                                                        </Link>
                                                        <div className="flex items-center gap-x-2 p-2 px-2.5 cursor-pointer hover:bg-zinc-600">
                                                            <BiTrash
                                                                size={20}
                                                            />
                                                            <span>Delete</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="hover:bg-transparent">
                                    <td
                                        colSpan={3}
                                        className="text-zinc-300 text-center text-base py-2"
                                    >
                                        no data
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};
export default Customer;
