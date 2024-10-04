import CustomerDetailLoading from "@/components/CustomerDetailLoading";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";
import { customerShowBug } from "@/lib/customerBugClientAPI";
import { Bug } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { BiUserCircle, BiUserX } from "react-icons/bi";
import { FaUserTie } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";

const CustomerBugDetail = () => {
    const { id } = useParams<{ id: string }>();

    const { data: bug, isLoading } = useQuery<Bug>({
        queryKey: ["showBug", id],
        queryFn: () => customerShowBug(id as string),
    });

    return (
        <div>
            {isLoading ? (
                <CustomerDetailLoading />
            ) : (
                <>
                    <div className="flex justify-start items-start py-2 mx-4 text-[13px] font-medium gap-x-2">
                        <Link
                            to={`${ROUTE_PATHS.CUSTOMER_BUG_EDIT}/${bug?.id}`}
                            className="bg-zinc-50 border border-zinc-400 px-1.5 py-0.5 rounded-md hover:bg-zinc-200"
                        >
                            Edit this bug
                        </Link>
                        <div className="bg-zinc-50 border border-zinc-400 px-1.5 py-0.5 rounded-md hover:bg-zinc-200 cursor-pointer">
                            Close bug
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-between items-start py-2 border-t border-t-zinc-300 mx-4 text-sm">
                        <div className="py-2 pb-6 px-4 flex flex-col gap-y-2 w-11/12 lg:w-1/5 bg-zinc-200">
                            <div className="flex items-center gap-x-2">
                                <div className="font-medium">Status:</div>
                                <div className="capitalize">
                                    {bug?.status.toLocaleLowerCase()}
                                </div>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <div className="font-medium">Severity:</div>
                                <div className="capitalize">
                                    {bug?.severity.toLocaleLowerCase()}
                                </div>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <div className="font-medium">Priority:</div>
                                <div className="capitalize">
                                    {bug?.priority}
                                </div>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <div className="font-medium">Due Date:</div>
                                <div className="capitalize">
                                    {bug?.due_date || "N/A"}
                                </div>
                            </div>
                        </div>
                        <div className="px-4 lg:px-8 py-1 w-11/12 lg:w-4/5 bg-gray-50">
                            <div className="mt-2">
                                {bug?.file && (
                                    <div>
                                        <img
                                            src={`${
                                                import.meta.env
                                                    .VITE_API_BASE_URL
                                            }/storage/uploads/bugFiles/${
                                                bug.file
                                            }`}
                                        />
                                    </div>
                                )}
                            </div>
                            <h4 className="mt-2">{bug?.title}</h4>
                            <p className="mt-2 text-sm font-medium">
                                {bug?.description}
                            </p>

                            <a
                                href={bug?.link}
                                className="mt-2 underline mb-4 inline-block"
                            >
                                {bug?.link}
                            </a>
                        </div>
                    </div>

                    <div className="mx-16 bg-white inline-block rounded-t-lg px-2 py-1 mt-4 -mb-0.5 border border-gray-300 border-b-0 border-t-2 border-t-green-500">
                        Comments (2)
                    </div>
                    <div className="bg-white mx-4 rounded-md px-4 border border-zinc-300 py-4">
                        <div className="flex items-start gap-x-2 mt-2">
                            <div className="w-14 h-14 bg-zinc-500">
                                <FaUserTie
                                    size={52}
                                    className="text-zinc-800 ml-1 mt-0.5"
                                />
                            </div>
                            <div className="border border-zinc-300 shadow-md w-11/12 lg:w-1/2">
                                <div className="bg-zinc-300 px-2">
                                    user comment on monday
                                </div>
                                <div className="bg-white px-2 min-h-14 py-2">
                                    first comment
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-x-2 mt-2">
                            <div className="w-14 h-14 bg-zinc-500">
                                <FaUserTie
                                    size={52}
                                    className="text-zinc-800 ml-1 mt-0.5"
                                />
                            </div>
                            <div className="border border-zinc-300 shadow-md w-11/12 lg:w-1/2">
                                <div className="bg-zinc-300 px-2">
                                    user comment on monday
                                </div>
                                <div className="bg-white px-2 min-h-14 py-2">
                                    second comment
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-x-2 mt-2">
                            <div className="w-14 h-14 bg-zinc-500">
                                <FaUserTie
                                    size={52}
                                    className="text-zinc-800 ml-1 mt-0.5"
                                />
                            </div>
                            <div className="border border-zinc-300 shadow-md w-11/12 lg:w-1/2">
                                <div className="bg-zinc-300 px-2">
                                    add comment
                                </div>
                                <div className="bg-white px-2 min-h-14 py-2">
                                    <Textarea rows={4}></Textarea>
                                </div>
                                <Button>Add</Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
export default CustomerBugDetail;
