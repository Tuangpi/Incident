import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";
import { toast } from "@/hooks/use-toast";
import { fetchAllBugTypes, fetchBug, updateBug } from "@/lib/bugClientAPI";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import {
    IoArrowBack,
    IoCloseCircle,
    IoCloudUploadOutline,
} from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Bug, BugType, Project, User } from "@/types";
import { fetchAllEmployees, fetchAllProjects } from "@/lib/clientAPI";

const EditBug = () => {
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");
    const [severity, setSeverity] = useState("");
    const [priority, setPriority] = useState("");
    const [dueDate, setDueDate] = useState<Date>();
    const [assignTo, setAssignTo] = useState("");
    const [progress, setProgress] = useState(0);
    const [link, setLink] = useState("");
    const [selectedProject, setSelectedProject] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: projects } = useQuery<Project[]>({
        queryKey: ["projects"],
        queryFn: fetchAllProjects,
    });

    const { data: bugTypes } = useQuery<BugType[]>({
        queryKey: ["bugTypes"],
        queryFn: fetchAllBugTypes,
    });

    const { data: employees } = useQuery<User[]>({
        queryKey: ["employees"],
        queryFn: fetchAllEmployees,
    });

    const { data: bug } = useQuery<Bug>({
        queryKey: ["bug", id],
        queryFn: async () => await fetchBug(id as string),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetFile = e.target.files?.[0];
        if (targetFile) {
            const url = URL.createObjectURL(targetFile);
            setImage(targetFile);
            setImagePreview(url);
        }
    };

    const removeImage = () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
        setImage(null);
        setImagePreview("");
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const updateBugMutation = useMutation({
        mutationFn: updateBug,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["bugTypes"],
            });
            await queryClient.refetchQueries({ queryKey: ["bugTypes"] });
            toast({
                description: "Bug has been updated successfully!",
            });
            navigate(ROUTE_PATHS.USER_BUG_LISTS);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selectedProject) {
            updateBugMutation.mutate({
                id: id as string,
                image,
                assign_to: assignTo,
                description,
                due_date: dueDate?.toLocaleDateString() || "",
                priority,
                progress,
                link,
                project_id: selectedProject,
                status,
                severity,
                title,
                type,
            });
        }
    };

    useEffect(() => {
        if (bug && projects && bugTypes && employees) {
            setTitle(bug.title);
            setDescription(bug.description);
            setType(bug.bug_types_id);
            setStatus(bug.status);
            setSeverity(bug.severity);
            setPriority(bug.priority);
            setProgress(bug.progress);
            setLink(bug.link);
            setDueDate(new Date(bug.due_date));
            setAssignTo(bug.assigned_to_id);
            setSelectedProject(bug.project_id);
        }
    }, [bug, projects, bugTypes, employees]);

    return (
        <div className="m-2">
            <div className="mb-4 flex justify-between items-center">
                <Link
                    to={ROUTE_PATHS.USER_BUG_LISTS}
                    className="flex justify-between items-center gap-x-2 underline text-gray-300 font-medium hover:text-gray-200"
                >
                    <div>
                        <IoArrowBack />
                    </div>
                    <div>Back</div>
                </Link>
                <h4 className="text-gray-300">Edit Bug</h4>
            </div>
            <form
                className="bg-zinc-800 rounded-lg shadow-md"
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="project">Project</Label>
                        <Select
                            value={selectedProject}
                            onValueChange={(value) => setSelectedProject(value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Project" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 text-zinc-300">
                                <SelectGroup>
                                    <SelectLabel>Select Project</SelectLabel>
                                    {projects?.map((project, index) => (
                                        <SelectItem
                                            value={project.id}
                                            key={index}
                                        >
                                            {project.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="type">Type</Label>
                        <Select
                            value={type}
                            onValueChange={(value) => setType(value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Bug Type" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 text-zinc-300">
                                <SelectGroup>
                                    <SelectLabel>Select Bug Type</SelectLabel>
                                    {bugTypes?.map((bugType, index) => (
                                        <SelectItem
                                            value={bugType.id}
                                            key={index}
                                        >
                                            {bugType.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="status">Status</Label>
                        <Select
                            value={status}
                            onValueChange={(value) => setStatus(value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 text-zinc-300">
                                <SelectGroup>
                                    <SelectLabel>Select Status</SelectLabel>
                                    <SelectItem value="OPEN">Open</SelectItem>
                                    <SelectItem value="IN-PROGRESS">
                                        In-Progress
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
                    </div>
                    <div>
                        <Label htmlFor="severity">Severity</Label>
                        <Select
                            value={severity}
                            onValueChange={(value) => setSeverity(value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Severity" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 text-zinc-300">
                                <SelectGroup>
                                    <SelectLabel>Select Severity</SelectLabel>
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
                    </div>
                    <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                            value={priority}
                            onValueChange={(value) => setPriority(value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Priority" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 text-zinc-300">
                                <SelectGroup>
                                    <SelectLabel>Select Priority</SelectLabel>
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
                    </div>
                    <div>
                        <Label htmlFor="due_date">Due Date</Label>
                        <div className="w-full mt-1">
                            <Popover>
                                <PopoverTrigger
                                    asChild
                                    className="!w-full bg-zinc-800 hover:bg-zinc-700"
                                >
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[280px] justify-start text-left font-normal",
                                            !dueDate && "text-zinc-300"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dueDate ? (
                                            format(dueDate, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={dueDate}
                                        onSelect={setDueDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="assignTo">Assign to</Label>
                        <Select
                            value={assignTo}
                            onValueChange={(value) => setAssignTo(value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Employee" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 text-zinc-300">
                                <SelectGroup>
                                    <SelectLabel>Select Employee</SelectLabel>
                                    {employees?.map((employee, index) => (
                                        <SelectItem
                                            value={employee.id}
                                            key={index}
                                        >
                                            {employee.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="progress">Progress</Label>
                        <Input
                            id="progress"
                            type="range"
                            value={progress}
                            onChange={(e) =>
                                setProgress(Number(e.target.value))
                            }
                        />
                    </div>
                    <div>
                        <Label htmlFor="link">Link</Label>
                        <Input
                            id="link"
                            type="url"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                    </div>
                    <div className="col-span-2">
                        <div className="flex items-start gap-x-2">
                            <div>
                                <Label htmlFor="image">Image</Label>
                                <Input
                                    ref={fileInputRef}
                                    type="file"
                                    id="image"
                                    onChange={handleChange}
                                    className="hidden"
                                    accept="image/*"
                                />

                                <div className="rounded-md h-36 w-36 relative overflow-hidden mt-1">
                                    {imagePreview ? (
                                        <>
                                            <IoCloseCircle
                                                size={20}
                                                onClick={removeImage}
                                                className="absolute right-1 top-1 cursor-pointer text-red-500"
                                            />
                                            <img
                                                src={imagePreview}
                                                className="h-full w-full object-cover"
                                                alt="Preview"
                                            />
                                        </>
                                    ) : (
                                        <div
                                            className="group w-full h-full border border-gray-400 rounded-md flex flex-col items-center justify-center cursor-pointer"
                                            onClick={triggerFileInput}
                                        >
                                            <IoCloudUploadOutline
                                                size={50}
                                                className="text-gray-400 group-hover:text-gray-600"
                                            />
                                            <p className="text-gray-400 group-hover:text-gray-600">
                                                Upload logo
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <img
                                    src={`${
                                        import.meta.env.VITE_API_BASE_URL
                                    }/storage/uploads/bugFiles/${bug?.file}`}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            rows={6}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-end w-full bg-[#343438] rounded-b-lg py-2 pr-4">
                    <Button
                        variant={"secondary"}
                        className="w-28"
                        type="submit"
                        disabled={updateBugMutation.isPending}
                    >
                        {updateBugMutation.isPending ? "Saving... " : "Save"}
                    </Button>
                </div>
            </form>
        </div>
    );
};
export default EditBug;
