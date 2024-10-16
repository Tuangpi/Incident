import { Button } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCompanies } from "@/lib/clientAPI";
import { Company as CompanyType } from "@/types";
import TableLoading from "@/components/TableLoading";
import DataTable, { TableColumn } from "react-data-table-component";
import { TableUserCustomStyle } from "@/components/TableCustomStyle";
import { IoInformationCircle } from "react-icons/io5";
import { BiEdit, BiTrash } from "react-icons/bi";
import { TableActionUser } from "@/components/TableAction";

const Company = () => {
    const { data: companies, isLoading } = useQuery<CompanyType[]>({
        queryKey: ["companies"],
        queryFn: fetchAllCompanies,
    });

    const columns: TableColumn<CompanyType>[] = [
        {
            name: "Name",
            selector: (row: CompanyType) => row.name,
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
                        }/storage/uploads/companyLogo/${row.logo}`}
                        alt=""
                    />
                </div>
            ),
        },
        {
            cell: (row) => (
                <TableActionUser id={row.id}>
                    <Link
                        to={`${ROUTE_PATHS.USER_COMPANY_DETAIL}/${row.id}`}
                        className="flex items-center gap-x-2 hover:bg-zinc-600 p-2 px-2.5 rounded-t-md border-b border-gray-500"
                    >
                        <IoInformationCircle size={20} />
                        <span>Detail</span>
                    </Link>
                    <Link
                        to={`${ROUTE_PATHS.USER_COMPANY_EDIT}/${row.id}`}
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
                <h5 className="text-zinc-300">Company Lists</h5>
            </div>
            <div className="bg-zinc-800 p-3 rounded-md">
                <div className="flex justify-end mb-3">
                    <Link to={ROUTE_PATHS.USER_COMPANY_CREATE}>
                        <Button variant="secondary">Create</Button>
                    </Link>
                </div>
                {isLoading ? (
                    <TableLoading numberOfTableColumns={4} numberOfRows={4} />
                ) : (
                    companies && (
                        <DataTable
                            data={companies}
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
export default Company;
