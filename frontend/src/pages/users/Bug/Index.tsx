import { Button } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";
import { useAppDispatch, useAppSelector } from "@/store";
import { BiMenuAltLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toggleAction } from "../../../store/activeActionReducer";

const Bug = () => {
    const dispatch = useAppDispatch();
    const actionId = useAppSelector((state) => state.activeAction.id);

    const handleActionToggle = (id: string) => {
        dispatch(toggleAction({ id: actionId === id ? undefined : id }));
    };

    return (
        <div className="m-2 text-zinc-300">
            <div className="mb-4">
                <h5 className="text-zinc-300">Bug Lists</h5>
            </div>
            <div className="bg-zinc-800 p-3 rounded-md">
                <div className="flex justify-end mb-3">
                    <Link to={ROUTE_PATHS.USER_BUG_CREATE}>
                        <Button variant="secondary">Create</Button>
                    </Link>
                </div>
                <table className="bg-zinc-800 rounded-t-lg">
                    <thead>
                        <tr className="bg-zinc-600">
                            <th className="py-2 text-zinc-300 border-r border-b border-solid border-zinc-600 rounded-tl-lg">
                                Name
                            </th>
                            <th className="py-2 text-zinc-300 border border-solid border-zinc-600">
                                Email
                            </th>
                            <th className="py-2 text-zinc-300 border border-solid border-zinc-600">
                                Phone
                            </th>
                            <th className="py-2 text-zinc-300 border-l border-b border-solid border-zinc-600 rounded-tr-lg">
                                Address
                            </th>
                            <th className="py-2 text-zinc-300 border-l border-b border-solid border-zinc-600 rounded-tr-lg">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-zinc-700">
                            <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                Sample Company 1
                            </td>
                            <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                sample@company.com
                            </td>
                            <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                123-456-7890
                            </td>
                            <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                123 Main St, City, State, 12345
                            </td>
                            <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                <div className="flex justify-center items-center relative">
                                    <BiMenuAltLeft
                                        size={20}
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleActionToggle("4");
                                        }}
                                    />
                                    {actionId == "4" && (
                                        <div className="bg-zinc-700 w-28 h-32 absolute top-2 right-14 rounded-md p-2 px-2.5">
                                            <div>Detail</div>
                                            <div>Edit</div>
                                            <div>Delete</div>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                        <tr className="hover:bg-zinc-700">
                            <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                Sample Company 1
                            </td>
                            <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                sample@company.com
                            </td>
                            <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                123-456-7890
                            </td>
                            <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                123 Main St, City, State, 12345
                            </td>
                            <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                <div className="flex justify-center items-center relative">
                                    <BiMenuAltLeft
                                        size={20}
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleActionToggle("3");
                                        }}
                                    />
                                    {actionId == "3" && (
                                        <div className="bg-zinc-700 w-28 h-32 absolute top-2 right-14 rounded-md p-2 px-2.5">
                                            <div>Detail</div>
                                            <div>Edit</div>
                                            <div>Delete</div>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                        <tr className="hover:bg-zinc-700">
                            <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                Sample Company 1
                            </td>
                            <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                sample@company.com
                            </td>
                            <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                123-456-7890
                            </td>
                            <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                123 Main St, City, State, 12345
                            </td>
                            <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                <div className="flex justify-center items-center relative">
                                    <BiMenuAltLeft
                                        size={20}
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleActionToggle("2");
                                        }}
                                    />
                                    {actionId === "2" && (
                                        <div className="bg-zinc-700 w-28 h-32 absolute top-2 right-14 rounded-md p-2 px-2.5">
                                            <div>Detail</div>
                                            <div>Edit</div>
                                            <div>Delete</div>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                        <tr className="hover:bg-zinc-700">
                            <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                Sample Company 1
                            </td>
                            <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                sample@company.com
                            </td>
                            <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                123-456-7890
                            </td>
                            <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                123 Main St, City, State, 12345
                            </td>
                            <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                <div className="flex justify-center items-center relative">
                                    <BiMenuAltLeft
                                        size={20}
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleActionToggle("1");
                                        }}
                                    />
                                    {actionId == "1" && (
                                        <div className="bg-zinc-700 w-28 h-32 absolute top-2 right-14 rounded-md p-2 px-2.5">
                                            <div>Detail</div>
                                            <div>Edit</div>
                                            <div>Delete</div>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Bug;
