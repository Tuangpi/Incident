import { Button } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";
import { useAppDispatch, useAppSelector } from "@/store";
import { BiEdit, BiMenuAltLeft, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toggleAction } from "../../../store/activeActionReducer";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCompanies } from "@/lib/clientAPI";
import { Company as CompanyType } from "@/types";
import TableLoading from "@/components/TableLoading";
import { IoInformationCircle } from "react-icons/io5";

const Company = () => {
    const dispatch = useAppDispatch();
    const actionId = useAppSelector((state) => state.activeAction.id);

    const handleActionToggle = (
        id: string,
        e: React.MouseEvent<SVGElement>
    ) => {
        e.stopPropagation();
        dispatch(toggleAction({ id: actionId === id ? undefined : id }));
    };

    const { data: companies, isLoading } = useQuery<CompanyType[]>({
        queryKey: ["companies"],
        queryFn: fetchAllCompanies,
    });

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
                    <table className="bg-zinc-800 rounded-t-lg">
                        <thead>
                            <tr className="bg-zinc-600">
                                <th className="py-2 text-zinc-300 border-r border-b border-solid border-zinc-600 rounded-tl-lg">
                                    ID
                                </th>
                                <th className="py-2 text-zinc-300 border border-solid border-zinc-600">
                                    Logo
                                </th>
                                <th className="py-2 text-zinc-300 border border-solid border-zinc-600 text-center">
                                    Logo
                                </th>
                                <th className="py-2 text-zinc-300 border-l border-b border-solid border-zinc-600 rounded-tr-lg text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies && companies.length > 0 ? (
                                companies.map((company, i) => (
                                    <tr
                                        className="hover:bg-zinc-700"
                                        key={company.id}
                                    >
                                        <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                            {i + 1}
                                        </td>
                                        <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                            {company.name}
                                        </td>
                                        <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                            <div className="flex justify-center items-center">
                                                <img
                                                    className="max-h-20 max-w-20"
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_API_BASE_URL
                                                    }/storage/uploads/companyLogo/${
                                                        company.logo
                                                    }`}
                                                    alt=""
                                                />
                                            </div>
                                        </td>
                                        <td className="text-zinc-300 border border-solid border-zinc-600 text-sm relative">
                                            <div className="flex justify-center items-center absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10">
                                                <BiMenuAltLeft
                                                    size={20}
                                                    className="cursor-pointer"
                                                    onClick={(e) =>
                                                        handleActionToggle(
                                                            company.id,
                                                            e
                                                        )
                                                    }
                                                />
                                                {actionId == company.id && (
                                                    <div
                                                        className="bg-zinc-700 w-28 max-h-auto absolute top-4 right-4 rounded-md select-none border border-zinc-500" // Added z-10
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                    >
                                                        <Link
                                                            to={`${ROUTE_PATHS.USER_COMPANY_DETAIL}/${company.id}`}
                                                            className="flex items-center gap-x-2 hover:bg-zinc-600 p-2 px-2.5 rounded-t-md border-b border-gray-500"
                                                        >
                                                            <IoInformationCircle
                                                                size={20}
                                                            />
                                                            <span>Detail</span>
                                                        </Link>
                                                        <Link
                                                            to={`${ROUTE_PATHS.USER_COMPANY_EDIT}/${company.id}`}
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
                                        colSpan={4}
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
export default Company;
