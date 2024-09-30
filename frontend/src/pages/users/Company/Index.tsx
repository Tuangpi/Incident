import { Button } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";
import { useAppDispatch, useAppSelector } from "@/store";
import { BiMenuAltLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toggleAction } from "../Employee/store/activeActionReducer";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCompanies } from "@/lib/clientAPI";
import { Company as CompanyType } from "@/types";

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

    const { data: companies } = useQuery<CompanyType[]>({
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
                <table className="bg-zinc-800 rounded-t-lg">
                    <thead>
                        <tr className="bg-zinc-600">
                            <th className="py-2 text-zinc-300 border-r border-b border-solid border-zinc-600 rounded-tl-lg">
                                Name
                            </th>
                            <th className="py-2 text-zinc-300 border border-solid border-zinc-600">
                                Logo
                            </th>
                            <th className="py-2 text-zinc-300 border-l border-b border-solid border-zinc-600 rounded-tr-lg text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies?.map((company) => (
                            <tr className="hover:bg-zinc-700" key={company.id}>
                                <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                    {company.name}
                                </td>
                                <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                    {company.logo}
                                </td>
                                <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                    <div className="flex justify-center items-center relative">
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
                                                className="bg-zinc-700 w-28 h-32 absolute top-1 right-20 rounded-md p-2 px-2.5"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                <Link
                                                    to={`${ROUTE_PATHS.USER_COMPANY_DETAIL}/${company.id}`}
                                                    className="block"
                                                >
                                                    Detail
                                                </Link>
                                                <Link
                                                    to={`${ROUTE_PATHS.USER_COMPANY_EDIT}/${company.id}`}
                                                    className="block"
                                                >
                                                    Edit
                                                </Link>
                                                <div>Delete</div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Company;
