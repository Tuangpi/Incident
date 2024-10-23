import { Button } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";
import { BiEdit, BiFirstPage, BiLastPage, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { IoInformationCircle } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import {
    Bug as BugType,
    BugType as BugTypeState,
    Company,
    Project,
    User,
} from "@/types";
import { fetchAllBugs, fetchAllBugTypes } from "@/lib/bugClientAPI";
import TableLoading from "@/components/TableLoading";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    fetchAllCompanies,
    fetchAllEmployees,
    fetchAllProjects,
} from "@/lib/clientAPI";
import { useState } from "react";
import { FaAnglesLeft, FaAnglesRight, FaCircleXmark } from "react-icons/fa6";
import { TbFilterPlus } from "react-icons/tb";
import DataTable, { TableColumn } from "react-data-table-component";
import { TableUserCustomStyle } from "@/components/TableCustomStyle";
import { TableActionUser } from "@/components/TableAction";

const Bug = () => {
    const [companyFilter, setCompanyFilter] = useState("all");
    const [projectFilter, setProjectFilter] = useState("all");
    const [bugTypeFilter, setBugTypeFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [severityFilter, setSeverityFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [employeeFilter, setEmployeeFilter] = useState("all");

    const { data: bugs, isLoading } = useQuery<BugType[]>({
        queryKey: [
            "bugs",
            companyFilter,
            projectFilter,
            bugTypeFilter,
            statusFilter,
            severityFilter,
            priorityFilter,
            employeeFilter,
        ],
        queryFn: async () =>
            await fetchAllBugs({
                companyFilter,
                projectFilter,
                bugTypeFilter,
                statusFilter,
                severityFilter,
                priorityFilter,
                employeeFilter,
            }),
    });

    const { data: companies, isLoading: companyLoading } = useQuery<Company[]>({
        queryKey: ["companies"],
        queryFn: fetchAllCompanies,
    });

    const { data: projects, isLoading: projectLoading } = useQuery<Project[]>({
        queryKey: ["projects"],
        queryFn: fetchAllProjects,
    });

    const { data: bugTypes, isLoading: bugTypeLoading } = useQuery<
        BugTypeState[]
    >({
        queryKey: ["bugTypes"],
        queryFn: fetchAllBugTypes,
    });

    const { data: employees, isLoading: employeeLoading } = useQuery<User[]>({
        queryKey: ["employees"],
        queryFn: fetchAllEmployees,
    });

    const handleClearFilter = () => {
        setCompanyFilter("all");
        setProjectFilter("all");
        setBugTypeFilter("all");
        setStatusFilter("all");
        setSeverityFilter("all");
        setPriorityFilter("all");
        setEmployeeFilter("all");
    };

    const columns: TableColumn<BugType>[] = [
        {
            name: "Title",
            selector: (row: BugType) => row.title,
            sortable: true,
        },
        {
            name: "Type",
            selector: (row: BugType) => row.bug_type?.name || "--",
            sortable: true,
        },
        {
            name: "Status",
            selector: (row: BugType) => row.status.toLowerCase(),
            sortable: true,
        },
        {
            name: "Severity",
            selector: (row: BugType) => row.severity.toLowerCase(),
            sortable: true,
        },
        {
            name: "Priority",
            selector: (row: BugType) => row.priority.toLowerCase(),
            sortable: true,
        },
        {
            name: "Reported By",
            selector: (row: BugType) => row.reported_by.email,
            sortable: true,
        },
        {
            name: "Assign To",
            selector: (row: BugType) => row.employee?.name || "--",
            sortable: true,
        },
        {
            cell: (row) => (
                <TableActionUser id={row.id}>
                    <Link
                        to={`${ROUTE_PATHS.USER_BUG_DETAIL}/${row.id}`}
                        className="flex items-center gap-x-2 hover:bg-zinc-600 p-2 px-2.5 rounded-t-md border-b border-gray-500"
                    >
                        <IoInformationCircle size={20} />
                        <span>Detail</span>
                    </Link>
                    <Link
                        to={`${ROUTE_PATHS.USER_BUG_EDIT}/${row.id}`}
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
                <h5 className="text-zinc-300">Bug Lists</h5>
            </div>
            <div className="bg-zinc-800 p-3 rounded-md">
                <div className="flex justify-between items-end mb-3">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                        <Select
                            value={companyFilter}
                            onValueChange={(value) => setCompanyFilter(value)}
                        >
                            <SelectTrigger>
                                <TbFilterPlus size={17} className="mr-0.5" />
                                <SelectValue placeholder="Select Company" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 text-zinc-300">
                                <SelectGroup>
                                    <SelectLabel>Select Company</SelectLabel>
                                    <SelectItem value="all">
                                        All Company
                                    </SelectItem>
                                    {companyLoading
                                        ? "loading... "
                                        : companies?.map((company) => (
                                              <SelectItem
                                                  key={company.id}
                                                  value={company.id}
                                              >
                                                  {company.name}
                                              </SelectItem>
                                          ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select
                            value={projectFilter}
                            onValueChange={(value) => setProjectFilter(value)}
                        >
                            <SelectTrigger>
                                <TbFilterPlus size={17} className="mr-0.5" />
                                <SelectValue placeholder="Select Project" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 text-zinc-300">
                                <SelectGroup>
                                    <SelectLabel>Select Project</SelectLabel>
                                    <SelectItem value="all">
                                        All Projects
                                    </SelectItem>
                                    {projectLoading
                                        ? "loading... "
                                        : projects?.map((project) => (
                                              <SelectItem
                                                  key={project.id}
                                                  value={project.id}
                                              >
                                                  {project.name}
                                              </SelectItem>
                                          ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select
                            value={bugTypeFilter}
                            onValueChange={(value) => setBugTypeFilter(value)}
                        >
                            <SelectTrigger>
                                <TbFilterPlus size={17} className="mr-0.5" />
                                <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 text-zinc-300">
                                <SelectGroup>
                                    <SelectLabel>Select Type</SelectLabel>
                                    <SelectItem value="all">
                                        All Bug Types
                                    </SelectItem>
                                    {bugTypeLoading
                                        ? "loading... "
                                        : bugTypes?.map((bugType) => (
                                              <SelectItem
                                                  key={bugType.id}
                                                  value={bugType.id}
                                              >
                                                  {bugType.name}
                                              </SelectItem>
                                          ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select
                            value={statusFilter}
                            onValueChange={(value) => setStatusFilter(value)}
                        >
                            <SelectTrigger>
                                <TbFilterPlus size={17} className="mr-0.5" />
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 text-zinc-300">
                                <SelectGroup>
                                    <SelectLabel>Select Status</SelectLabel>
                                    <SelectItem value="all">
                                        All Status
                                    </SelectItem>
                                    <SelectItem value="OPEN">Open</SelectItem>
                                    <SelectItem value="IN-PROGRESS">
                                        In Progress
                                    </SelectItem>
                                    <SelectItem value="RESOLVED">
                                        Resolved
                                    </SelectItem>
                                    <SelectItem value="CLOSED">
                                        Closed
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select
                            value={severityFilter}
                            onValueChange={(value) => setSeverityFilter(value)}
                        >
                            <SelectTrigger>
                                <TbFilterPlus size={17} className="mr-0.5" />
                                <SelectValue placeholder="Select Severity" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 text-zinc-300">
                                <SelectGroup>
                                    <SelectLabel>Select Severity</SelectLabel>
                                    <SelectItem value="all">
                                        All Severity
                                    </SelectItem>
                                    <SelectItem value="LOW">Low</SelectItem>
                                    <SelectItem value="MEDIUM">
                                        Medium
                                    </SelectItem>
                                    <SelectItem value="HIGH">High</SelectItem>
                                    <SelectItem value="CRITICAL">
                                        Critical
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select
                            value={priorityFilter}
                            onValueChange={(value) => setPriorityFilter(value)}
                        >
                            <SelectTrigger>
                                <TbFilterPlus size={17} className="mr-0.5" />
                                <SelectValue placeholder="Select Priority" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 text-zinc-300">
                                <SelectGroup>
                                    <SelectLabel>Select Priority</SelectLabel>
                                    <SelectItem value="all">
                                        All Priority
                                    </SelectItem>
                                    <SelectItem value="LOW">Low</SelectItem>
                                    <SelectItem value="MEDIUM">
                                        Medium
                                    </SelectItem>
                                    <SelectItem value="HIGH">High</SelectItem>
                                    <SelectItem value="URGENT">
                                        Urgent
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select
                            value={employeeFilter}
                            onValueChange={(value) => setEmployeeFilter(value)}
                        >
                            <SelectTrigger>
                                <TbFilterPlus size={17} className="mr-0.5" />
                                <SelectValue placeholder="Select Assignee" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 text-zinc-300">
                                <SelectGroup>
                                    <SelectLabel>Select Assignee</SelectLabel>
                                    <SelectItem value="all">
                                        All Employees
                                    </SelectItem>
                                    {employeeLoading
                                        ? "loading... "
                                        : employees?.map((employee) => (
                                              <SelectItem
                                                  key={employee.id}
                                                  value={employee.id}
                                              >
                                                  {employee.name}
                                              </SelectItem>
                                          ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* <Link to={ROUTE_PATHS.USER_BUG_CREATE}>
                        <Button variant="secondary">Create</Button>
                    </Link> */}
                </div>
                <div className="flex items-center gap-x-2 mb-3">
                    {(companyFilter !== "all" ||
                        projectFilter !== "all" ||
                        bugTypeFilter !== "all" ||
                        statusFilter !== "all" ||
                        severityFilter !== "all" ||
                        priorityFilter !== "all" ||
                        employeeFilter !== "all") && (
                        <Button
                            variant="destructive"
                            onClick={handleClearFilter}
                        >
                            <FaCircleXmark size={18} />
                            <span className="ml-1">Clear all filter</span>
                        </Button>
                    )}
                </div>

                {isLoading ? (
                    <TableLoading numberOfTableColumns={10} numberOfRows={5} />
                ) : (
                    bugs && (
                        <DataTable
                            data={bugs}
                            columns={columns}
                            defaultSortFieldId="id"
                            responsive
                            customStyles={TableUserCustomStyle}
                            highlightOnHover
                            pagination
                            paginationIconNext={
                                <FaAnglesRight className="text-zinc-400" />
                            }
                            paginationIconPrevious={
                                <FaAnglesLeft className="text-zinc-400" />
                            }
                            paginationIconFirstPage={
                                <BiFirstPage
                                    className="text-zinc-400"
                                    size={22}
                                />
                            }
                            paginationIconLastPage={
                                <BiLastPage
                                    className="text-zinc-400"
                                    size={22}
                                />
                            }
                        />
                    )
                )}
            </div>
        </div>
    );
};
export default Bug;
