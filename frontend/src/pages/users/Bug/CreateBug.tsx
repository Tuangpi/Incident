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
import { createBug } from "@/lib/bugClientAPI";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import {
    IoArrowBack,
    IoCloseCircle,
    IoCloudUploadOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const CreateBug = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");
    const [severity, setSeverity] = useState("");
    const [priority, setPriority] = useState("");
    const [dueDate, setDueDate] = useState<Date>();
    const [assignTo, setAssignTo] = useState("");
    const [selectedProject, setSelectedProject] = useState<string | undefined>(
        undefined
    );
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const createBugMutation = useMutation({
        mutationFn: createBug,
        onSuccess: () => {
            toast({
                description: "Employee has been created successfully!",
            });
            setTitle("");
            setDescription("");
            setType("");
            setStatus("");
            setSeverity("");
            setPriority("");
            // setDueDate();
            setAssignTo("");
            setSelectedProject(undefined);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selectedProject) {
            createBugMutation.mutate({
                image,
                assign_to: "",
                description,
                due_date: "",
                priority,
                project_id: selectedProject,
                reported_by: "",
                resolution: "",
                status,
                severity,
                title,
                type,
            });
        }
    };

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
                <h4 className="text-gray-300">Create Bug</h4>
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
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 text-zinc-300">
                                <SelectGroup>
                                    <SelectLabel>Select Role</SelectLabel>
                                    <SelectItem value="ADMIN">Admin</SelectItem>
                                    <SelectItem value="USER">User</SelectItem>
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
                                <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 text-zinc-300">
                                <SelectGroup>
                                    <SelectLabel>Select Type</SelectLabel>
                                    <SelectItem value="OPEN">Open</SelectItem>
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
                        <Label htmlFor="status">Status</Label>
                        <Select
                            value={status}
                            onValueChange={(value) => setStatus(value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 text-zinc-300">
                                <SelectGroup>
                                    <SelectLabel>Select Status</SelectLabel>
                                    <SelectItem value="OPEN">Open</SelectItem>
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
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 text-zinc-300">
                                <SelectGroup>
                                    <SelectLabel>Select Role</SelectLabel>
                                    <SelectItem value="ADMIN">Admin</SelectItem>
                                    <SelectItem value="USER">User</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="col-span-2">
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
                    >
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
};
export default CreateBug;
