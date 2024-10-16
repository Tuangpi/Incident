import CustomerTableLoading from "@/components/CustomerTableLoading";
import { TableActionCustomer } from "@/components/TableAction";
import { TableCustomerCustomStyle } from "@/components/TableCustomStyle";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";
import { customerFetchAllBugs } from "@/lib/customerBugClientAPI";
import { useAppSelector } from "@/store";
import { Bug } from "@/types";
import { useQuery } from "@tanstack/react-query";
import DataTable, { TableColumn } from "react-data-table-component";
import { BiCheckCircle, BiEdit } from "react-icons/bi";
import { IoInformationCircle } from "react-icons/io5";
import { Link } from "react-router-dom";

const CustomerBugLists = () => {
    const customerSelectedProject = useAppSelector(
        (state) => state.selectProject.id
    );

    const { data: bugs, isLoading } = useQuery<Bug[]>({
        queryKey: ["bugs", customerSelectedProject],
        queryFn: async () =>
            await customerFetchAllBugs(customerSelectedProject),
        enabled: customerSelectedProject !== "",
    });

    const columns: TableColumn<Bug>[] = [
        {
            name: "Title",
            selector: (row: Bug) => row.title,
            sortable: true,
        },
        {
            name: "Type",
            selector: (row: Bug) => row.type || "--",
            sortable: true,
        },
        {
            name: "Priority",
            selector: (row: Bug) => row.priority.toLowerCase(),
            sortable: true,
        },
        {
            name: "Severity",
            selector: (row: Bug) => row.severity.toLowerCase(),
            sortable: true,
        },
        {
            name: "Summary",
            selector: (row: Bug) => row.description,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row: Bug) => row.status.toLowerCase(),
            sortable: true,
        },
        {
            name: "Progress",
            selector: (row: Bug) => row.progress,
            sortable: true,
        },
        {
            cell: (row) => (
                <TableActionCustomer id={row.id}>
                    <div
                        className="bg-white w-28 max-h-28 absolute top-4 right-4 rounded-md select-none border border-zinc-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Link
                            to={`${ROUTE_PATHS.CUSTOMER_BUG_DETAIL}/${row.id}`}
                            className="flex items-center gap-x-2 hover:bg-zinc-200 p-2 px-2.5 rounded-t-md border-b border-gray-200"
                        >
                            <IoInformationCircle size={20} />
                            <span>Detail</span>
                        </Link>
                        <Link
                            to={`${ROUTE_PATHS.CUSTOMER_BUG_EDIT}/${row.id}`}
                            className="flex items-center gap-x-2 p-2 px-2.5 hover:bg-zinc-200 border-b border-gray-200"
                        >
                            <BiEdit size={20} />
                            <span>Edit</span>
                        </Link>
                        <div className="flex items-center gap-x-2 p-2 px-2.5 hover:bg-zinc-200 border-b border-gray-200 cursor-pointer">
                            <BiCheckCircle size={20} />
                            <span>Resolved</span>
                        </div>
                    </div>
                </TableActionCustomer>
            ),
        },
    ];

    return (
        <main className="w-[98%] m-auto">
            {/* <div className="my-2 bg-white rounded-lg shadow-sm p-2">
                Filters will go here
            </div> */}

            <div className="bg-white rounded-lg shadow-md p-2 mt-4">
                {isLoading ? (
                    <CustomerTableLoading numberOfTableColumns={6} />
                ) : (
                    bugs && (
                        <DataTable
                            data={bugs}
                            columns={columns}
                            defaultSortFieldId="id"
                            responsive
                            customStyles={TableCustomerCustomStyle}
                            highlightOnHover
                            fixedHeader
                            pagination
                        />
                    )
                )}
            </div>
        </main>
    );
};
export default CustomerBugLists;
