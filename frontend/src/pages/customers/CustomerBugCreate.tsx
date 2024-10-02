import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { toast } from "@/hooks/use-toast";
import { customerCreateBug } from "@/lib/customerBugClientAPI";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { IoCloseCircle, IoCloudUploadOutline } from "react-icons/io5";

const CustomerBugCreate = () => {
    const [dueDate, setDueDate] = useState<Date>();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [severity, setSeverity] = useState("");
    const [priority, setPriority] = useState("");
    const [link, setLink] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const customerSelectedProject = useAppSelector(
        (state) => state.selectProject.id
    );

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
        mutationFn: customerCreateBug,
        onSuccess: () => {
            toast({
                description: "Bug has been created successfully!",
            });

            setTitle("");
            setDescription("");
            setStatus("");
            setSeverity("");
            setLink("");
            setPriority("");
            setImage(null);
            setImagePreview("");
        },
    });

    const handleSave = () => {
        if (customerSelectedProject && dueDate) {
            createBugMutation.mutate({
                description,
                due_date: dueDate,
                file: image,
                link,
                priority,
                project_id: customerSelectedProject,
                severity,
                status,
                title,
            });
        }
    };

    return (
        <div className="flex justify-between items-start py-2">
            <div className="py-1 pb-6 px-4 flex flex-col gap-y-2 w-1/4 bg-zinc-200">
                <div className="flex items-center gap-x-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                        value={status}
                        onValueChange={(value) => setStatus(value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Select Status</SelectLabel>
                                <SelectItem value="OPEN">Open</SelectItem>
                                <SelectItem value="IN-PROGRESS">
                                    In Progress
                                </SelectItem>
                                <SelectItem value="RESOLVED">
                                    Resolved
                                </SelectItem>
                                <SelectItem value="CLOSED">Closed</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-x-2">
                    <Label htmlFor="severity">Severity</Label>
                    <Select
                        value={severity}
                        onValueChange={(value) => setSeverity(value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Severity" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Select Severity</SelectLabel>
                                <SelectItem value="LOW">Low</SelectItem>
                                <SelectItem value="MEDIUM">Medium</SelectItem>
                                <SelectItem value="HIGH">High</SelectItem>
                                <SelectItem value="CRITICAL">
                                    Critical
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-x-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                        value={priority}
                        onValueChange={(value) => setPriority(value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Select Priority</SelectLabel>
                                <SelectItem value="LOW">Low</SelectItem>
                                <SelectItem value="MEDIUM">Medium</SelectItem>
                                <SelectItem value="HIGH">High</SelectItem>
                                <SelectItem value="URGENT">Urgent</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-x-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Popover>
                        <PopoverTrigger
                            asChild
                            className="!w-full bg-transparent"
                        >
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[280px] justify-start text-left font-normal",
                                    !dueDate && ""
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
            <div className="px-8 py-1 w-3/4">
                <div>
                    <Label htmlFor="title">Bug Title</Label>
                    <Input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mt-2">
                    <Label htmlFor="name">Description</Label>
                    <Textarea
                        id="name"
                        rows={6}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mt-2">
                    <Label htmlFor="image">File</Label>
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
                                    Upload file
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-2">
                    <Label htmlFor="link">Link</Label>
                    <Input
                        id="link"
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>
                <div className="flex justify-start w-full bg-zinc-100 py-2 mt-6">
                    <Button
                        className="w-28"
                        type="button"
                        onClick={() => handleSave()}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default CustomerBugCreate;
