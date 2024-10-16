import { Button } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAllBugTypes } from "@/lib/bugClientAPI";
import TableLoading from "@/components/TableLoading";
import { BugType as BugTypeState } from "@/types";
import { formatRelative } from "date-fns";
import DataTable, { TableColumn } from "react-data-table-component";
import { TableUserCustomStyle } from "@/components/TableCustomStyle";
import { BiEdit, BiTrash } from "react-icons/bi";
import { TableActionUser } from "@/components/TableAction";

const BugType = () => {
    const { data: bugTypes, isLoading } = useQuery<BugTypeState[]>({
        queryKey: ["bugTypes"],
        queryFn: fetchAllBugTypes,
    });

    const columns: TableColumn<BugTypeState>[] = [
        {
            name: "Name",
            selector: (row: BugTypeState) => row.name,
            sortable: true,
        },
        {
            name: "Created At",
            selector: (row: BugTypeState) =>
                formatRelative(new Date(row.created_at), new Date()),
            sortable: true,
        },
        {
            cell: (row) => (
                <TableActionUser id={row.id}>
                    <Link
                        to={`${ROUTE_PATHS.USER_BUG_TYPE_EDIT}/${row.id}`}
                        className="flex items-center gap-x-2 p-2 px-2.5 hover:bg-zinc-600 border-b border-gray-500"
                    >
                        <BiEdit size={20} />
                        <span>Edit</span>
                    </Link>
                    <div className="flex items-center gap-x-2 p-2 px-2.5 cursor-pointer hover:bg-zinc-600">
                        <BiTrash size={20} />
                        <span>Delete</span>
                    </div>
                </TableActionUser>
            ),
        },
    ];

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
                    <TableLoading numberOfTableColumns={3} numberOfRows={5} />
                ) : (
                    bugTypes && (
                        <DataTable
                            data={bugTypes}
                            columns={columns}
                            defaultSortFieldId="id"
                            responsive
                            customStyles={TableUserCustomStyle}
                            highlightOnHover
                        />
                    )
                )}
            </div>
        </div>
    );
};
export default BugType;
