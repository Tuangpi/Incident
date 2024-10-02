import { Button } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";
import { useAppDispatch, useAppSelector } from "@/store";
import { BiMenuAltLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toggleAction } from "../../../store/activeActionReducer";
import { useQuery } from "@tanstack/react-query";
import { Project as ProjectType } from "@/types";
import { fetchAllProjects } from "@/lib/clientAPI";
import TableLoading from "@/components/TableLoading";

const Project = () => {
    const dispatch = useAppDispatch();
    const actionId = useAppSelector((state) => state.activeAction.id);

    const handleActionToggle = (
        id: string,
        e: React.MouseEvent<SVGElement>
    ) => {
        e.stopPropagation();
        dispatch(toggleAction({ id: actionId === id ? undefined : id }));
    };

    const { data: projects, isLoading } = useQuery<ProjectType[]>({
        queryKey: ["projects"],
        queryFn: fetchAllProjects,
    });

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
                    <table className="bg-zinc-800 rounded-t-lg">
                        <thead>
                            <tr className="bg-zinc-600">
                                <th className="py-2 text-zinc-300 border-r border-b border-solid border-zinc-600 rounded-tl-lg">
                                    ID
                                </th>
                                <th className="py-2 text-zinc-300 border border-solid border-zinc-600">
                                    Name
                                </th>
                                <th className="py-2 text-zinc-300 border border-solid border-zinc-600">
                                    Logo
                                </th>
                                <th className="py-2 text-zinc-300 border-l border-b border-solid border-zinc-600 rounded-tr-lg">
                                    Created At
                                </th>
                                <th className="py-2 text-zinc-300 border-l border-b border-solid border-zinc-600 rounded-tr-lg">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects && projects.length > 0 ? (
                                projects.map((project, i) => (
                                    <tr
                                        className="hover:bg-zinc-700"
                                        key={project.id}
                                    >
                                        <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                            {i + 1}
                                        </td>
                                        <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                            {project.name}
                                        </td>
                                        <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                            {project.logo}
                                        </td>
                                        <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                            {project.created_at}
                                        </td>
                                        <td className="text-zinc-300 border border-solid border-zinc-600 text-sm">
                                            <div className="flex justify-center items-center relative">
                                                <BiMenuAltLeft
                                                    size={20}
                                                    className="cursor-pointer"
                                                    onClick={(e) =>
                                                        handleActionToggle(
                                                            project.id,
                                                            e
                                                        )
                                                    }
                                                />
                                                {actionId === project.id && (
                                                    <div
                                                        className="bg-zinc-700 w-28 h-32 absolute top-2 right-14 rounded-md p-2 px-2.5"
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                    >
                                                        <div>Detail</div>
                                                        <div>Edit</div>
                                                        <div>Delete</div>
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
export default Project;
