import { Button } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";
import { useAppDispatch, useAppSelector } from "@/store";
import { BiEdit, BiMenuAltLeft, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toggleAction } from "../../../store/activeActionReducer";
import { useQuery } from "@tanstack/react-query";
import { fetchAllBugTypes } from "@/lib/bugClientAPI";
import TableLoading from "@/components/TableLoading";
import { BugType as BugTypeState } from "@/types";
import { formatRelative } from "date-fns";

const BugType = () => {
    const dispatch = useAppDispatch();
    const actionId = useAppSelector((state) => state.activeAction.id);

    const { data: bugTypes, isLoading } = useQuery<BugTypeState[]>({
        queryKey: ["bugTypes"],
        queryFn: fetchAllBugTypes,
    });

    const handleActionToggle = (
        id: string,
        e: React.MouseEvent<SVGElement>
    ) => {
        e.stopPropagation();
        dispatch(toggleAction({ id: actionId === id ? undefined : id }));
    };

    return (
        <div className="m-2 text-zinc-300">
            <div className="mb-4">
                <h5 className="text-zinc-300">Bug Type Lists</h5>
            </div>
            <div className="bg-zinc-800 p-3 rounded-md">
                <div className="flex justify-end items-end mb-3">
                    <Link to={ROUTE_PATHS.USER_BUG_TYPE_CREATE}>
                        <Button variant="secondary">Create</Button>
                    </Link>
                </div>

                {isLoading ? (
                    <TableLoading numberOfTableColumns={4} numberOfRows={5} />
                ) : (
                    <table className="bg-zinc-800 rounded-t-lg">
                        <thead>
                            <tr className="bg-zinc-600">
                                <th className="py-2 text-zinc-300 border-r border-b border-solid border-zinc-600 rounded-tl-lg">
                                    ID
                                </th>
                                <th className="py-2 text-zinc-300 border border-solid border-zinc-600">
                                    Name
                                </th>
                                <th className="py-2 text-zinc-300 border-b border-solid border-zinc-600">
                                    Created At
                                </th>
                                <th className="py-2 text-zinc-300 border-l border-b border-solid border-zinc-600 rounded-tr-lg text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {bugTypes?.map((bugType, i) => (
                                <tr
                                    className="hover:bg-zinc-700"
                                    key={bugType.id}
                                >
                                    <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                        {i + 1}
                                    </td>
                                    <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                        {bugType.name}
                                    </td>
                                    <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                        {formatRelative(
                                            new Date(bugType.created_at),
                                            new Date()
                                        )}
                                    </td>
                                    <td className="text-zinc-300 border border-solid border-zinc-600 text-sm relative">
                                        <div className="flex justify-center items-center absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10">
                                            <BiMenuAltLeft
                                                size={20}
                                                className="cursor-pointer"
                                                onClick={(e) =>
                                                    handleActionToggle(
                                                        bugType.id,
                                                        e
                                                    )
                                                }
                                            />
                                            {actionId == bugType.id && (
                                                <div
                                                    className="bg-zinc-700 w-28 max-h-28 absolute top-4 right-4 rounded-md select-none border border-zinc-500"
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                >
                                                    <Link
                                                        to={`${ROUTE_PATHS.USER_BUG_TYPE_EDIT}/${bugType.id}`}
                                                        className="flex items-center gap-x-2 p-2 px-2.5 hover:bg-zinc-600 border-b border-gray-500"
                                                    >
                                                        <BiEdit size={20} />
                                                        <span>Edit</span>
                                                    </Link>
                                                    <div className="flex items-center gap-x-2 p-2 px-2.5 cursor-pointer hover:bg-zinc-600">
                                                        <BiTrash size={20} />
                                                        <span>Delete</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};
export default BugType;
