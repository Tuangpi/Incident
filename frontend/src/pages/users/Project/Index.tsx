import { Button } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Project as ProjectType } from "@/types";
import { fetchAllProjects } from "@/lib/clientAPI";
import TableLoading from "@/components/TableLoading";
import { IoInformationCircle } from "react-icons/io5";
import { formatRelative } from "date-fns";
import DataTable, { TableColumn } from "react-data-table-component";
import { TableUserCustomStyle } from "@/components/TableCustomStyle";
import { TableActionUser } from "@/components/TableAction";

const Project = () => {
    const { data: projects, isLoading } = useQuery<ProjectType[]>({
        queryKey: ["projects"],
        queryFn: fetchAllProjects,
    });

    const columns: TableColumn<ProjectType>[] = [
        {
            name: "Company",
            selector: (row: ProjectType) => row.company.name,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row: ProjectType) => row.name,
            sortable: true,
        },

        {
            name: "Logo",
            cell: (row) => (
                <div className="flex justify-center items-center">
                    <img
                        className="max-h-20 max-w-20"
                        src={`${
                            import.meta.env.VITE_API_BASE_URL
                        }/storage/uploads/projectLogo/${row.logo}`}
                        alt=""
                    />
                </div>
            ),
        },
        {
            name: "Created At",
            selector: (row: ProjectType) =>
                formatRelative(new Date(row.created_at), new Date()),
            sortable: true,
        },
        {
            cell: (row) => (
                <TableActionUser id={row.id}>
                    <Link
                        to={`${ROUTE_PATHS.USER_PROJECT_DETAIL}/${row.id}`}
                        className="flex items-center gap-x-2 hover:bg-zinc-600 p-2 px-2.5 rounded-t-md border-b border-gray-500"
                    >
                        <IoInformationCircle size={20} />
                        <span>Detail</span>
                    </Link>
                    <Link
                        to={`${ROUTE_PATHS.USER_PROJECT_EDIT}/${row.id}`}
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
                <h5 className="text-zinc-300">Project Lists</h5>
            </div>
            <div className="bg-zinc-800 p-3 rounded-md">
                <div className="flex justify-end mb-3">
                    <Link to={ROUTE_PATHS.USER_PROJECT_CREATE}>
                        <Button variant="secondary">Create</Button>
                    </Link>
                </div>
                {isLoading ? (
                    <TableLoading numberOfTableColumns={8} />
                ) : (
                    projects && (
                        <DataTable
                            data={projects}
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
export default Project;
