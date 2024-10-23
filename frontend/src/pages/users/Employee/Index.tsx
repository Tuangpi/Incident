import { Button } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types";
import { fetchAllEmployees } from "@/lib/clientAPI";
import TableLoading from "@/components/TableLoading";
import DataTable, { TableColumn } from "react-data-table-component";
import { TableUserCustomStyle } from "@/components/TableCustomStyle";
import { BiEdit, BiTrash } from "react-icons/bi";
import { TableActionUser } from "@/components/TableAction";

const Employee = () => {
    const { data: employees, isLoading } = useQuery<User[]>({
        queryKey: ["employees"],
        queryFn: fetchAllEmployees,
    });

    const columns: TableColumn<User>[] = [
        {
            name: "Name",
            selector: (row: User) => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row: User) => row.email,
            sortable: true,
        },
        {
            name: "Role",
            selector: (row: User) => row.role.toLowerCase(),
            sortable: true,
        },
        {
            cell: (row) => (
                <TableActionUser id={row.id}>
                    {/* <Link
                        to={`${ROUTE_PATHS.USER_EMPLOYEE_DETAIL}/${row.id}`}
                        className="flex items-center gap-x-2 hover:bg-zinc-600 p-2 px-2.5 rounded-t-md border-b border-gray-500"
                    >
                        <IoInformationCircle size={20} />
                        <span>Detail</span>
                    </Link> */}
                    <Link
                        to={`${ROUTE_PATHS.USER_EMPLOYEE_EDIT}/${row.id}`}
                        className="flex items-center gap-x-2 p-2 px-2.5 hover:bg-zinc-600 border-b border-gray-500"
                    >
                        <BiEdit size={20} />
                        <span>Edit</span>
                    </Link>
                    <div className="flex items-center gap-x-2 p-2 px-2.5 cursor-pointer hover:bg-zinc-600 text-red-500">
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
                <h5 className="text-zinc-300">Employee Lists</h5>
            </div>
            <div className="bg-zinc-800 p-3 rounded-md">
                <div className="flex justify-end mb-3">
                    <Link to={ROUTE_PATHS.USER_EMPLOYEE_CREATE}>
                        <Button variant="secondary">Create</Button>
                    </Link>
                </div>
                {isLoading ? (
                    <TableLoading numberOfTableColumns={4} />
                ) : (
                    employees && (
                        <DataTable
                            columns={columns}
                            data={employees}
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
export default Employee;
