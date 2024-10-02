import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { createProject, fetchAllCompanies } from "@/lib/clientAPI";
import { Company } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import {
    IoArrowBack,
    IoCloseCircle,
    IoCloudUploadOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const CreateProject = () => {
    const [name, setName] = useState("");
    const [logo, setLogo] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string>("");
    const [description, setDescription] = useState("");
    const [selectedCompany, setSelectedCompany] = useState<string | undefined>(
        undefined
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data: companies } = useQuery<Company[]>({
        queryKey: ["companies"],
        queryFn: fetchAllCompanies,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetFile = e.target.files?.[0];
        if (targetFile) {
            const url = URL.createObjectURL(targetFile);
            setLogo(targetFile);
            setLogoPreview(url);
        }
    };

    const removeImage = () => {
        if (logoPreview) {
            URL.revokeObjectURL(logoPreview);
        }
        setLogo(null);
        setLogoPreview("");
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const createProjectMutation = useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            toast({
                description: "Employee has been created successfully!",
            });
            setName("");
            setLogo(null);
            setLogoPreview("");
            setDescription("");
            setDescription("");
            setSelectedCompany(undefined);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selectedCompany) {
            createProjectMutation.mutate({
                name,
                description,
                companyId: selectedCompany,
                logo,
            });
        }
    };

    return (
        <div className="m-2">
            <div className="mb-4 flex justify-between items-center">
                <Link
                    to={ROUTE_PATHS.USER_PROJECT_LISTS}
                    className="flex justify-between items-center gap-x-2 underline text-gray-300 font-medium hover:text-gray-200"
                >
                    <div>
                        <IoArrowBack />
                    </div>
                    <div>Back</div>
                </Link>
                <h4 className="text-gray-300">Create Project</h4>
            </div>
            <form
                className="bg-zinc-800 rounded-lg shadow-md"
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-1 gap-4 p-4">
                    <div>
                        <Label htmlFor="image">Project Logo</Label>
                        <Input
                            ref={fileInputRef}
                            type="file"
                            id="image"
                            onChange={handleChange}
                            className="hidden"
                            accept="image/*"
                        />

                        <div className="rounded-md h-36 w-36 relative overflow-hidden mt-1">
                            {logoPreview ? (
                                <>
                                    <IoCloseCircle
                                        size={20}
                                        onClick={removeImage}
                                        className="absolute right-1 top-1 cursor-pointer text-red-500"
                                    />
                                    <img
                                        src={logoPreview}
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
                        <Label htmlFor="role">For Company</Label>
                        <Select
                            value={selectedCompany}
                            onValueChange={(value) => setSelectedCompany(value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Company" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 text-zinc-300">
                                <SelectGroup>
                                    <SelectLabel>Select Company</SelectLabel>
                                    {companies?.map((company) => (
                                        <SelectItem
                                            value={company.id}
                                            key={company.id}
                                        >
                                            {company.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="name">Project Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
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
export default CreateProject;
