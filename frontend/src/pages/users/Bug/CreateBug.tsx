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
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
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
    const [resolution, setResolution] = useState("");
    const [selectedProject, setSelectedProject] = useState<string | undefined>(
        undefined
    );

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
            setResolution("");
            setSelectedProject(undefined);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // if (selectedRole) {
        //     createBugMutation.mutate({
        //         name,
        //         email,
        //         password,
        //         role: selectedRole,
        //     });
        // }
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
                    {/* <div>
                        <Label htmlFor="image">Image</Label>
                        <Input
                            id="image"
                            type="text"
                            value={image}
                            onChange={(e) => setIma(e.target.value)}
                        />
                    </div> */}
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            rows={6}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="type">Type</Label>
                        <Input
                            id="type"
                            value={type}
                            type="text"
                            onChange={(e) => setType(e.target.value)}
                        />
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
                        <Label htmlFor="resolution">Resolution</Label>
                        <Textarea
                            id="resolution"
                            value={resolution}
                            rows={6}
                            onChange={(e) => setResolution(e.target.value)}
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
