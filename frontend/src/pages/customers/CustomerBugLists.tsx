import CustomerTableLoading from "@/components/CustomerTableLoading";
import { customerFetchAllBugs } from "@/lib/customerBugClientAPI";
import { useAppSelector } from "@/store";
import { Bug } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { BiMenuAltLeft } from "react-icons/bi";

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

    return (
        <main className="w-[98%] m-auto">
            {/* <div className="my-2 bg-white rounded-lg shadow-sm p-2">
                Filters will go here
            </div> */}

            <div className="bg-white rounded-lg shadow-md p-2 mt-4">
                {isLoading ? (
                    <CustomerTableLoading numberOfTableColumns={6} />
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Priority</th>
                                <th>Severity</th>
                                <th>Summary</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {bugs && bugs?.length > 0 ? (
                                bugs?.map((bug, i) => (
                                    <tr key={bug.id}>
                                        <td>{i + 1}</td>
                                        <td>{bug.title}</td>
                                        <td>{bug.priority}</td>
                                        <td>{bug.severity}</td>
                                        <td>{bug.description}</td>
                                        <td>{bug.status}</td>
                                        <td>
                                            <BiMenuAltLeft
                                                size={20}
                                                className="cursor-pointer"
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td>no data</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </main>
    );
};
export default CustomerBugLists;
