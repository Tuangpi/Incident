import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";
import { toast } from "@/hooks/use-toast";
import { fetchCompany, updateCompany } from "@/lib/clientAPI";
import { Company } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import {
    IoArrowBack,
    IoCloseCircle,
    IoCloudUploadOutline,
} from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditCompany = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [imagePreview, setImagePreview] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data: company } = useQuery<Company>({
        queryKey: ["getCompany", id],
        queryFn: () => fetchCompany(id as string),
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

    const updateCompanyMutation = useMutation({
        mutationFn: updateCompany,
        onSuccess: () => {
            toast({
                description: "Company has been updated successfully!",
            });
            navigate(ROUTE_PATHS.USER_COMPANY_LISTS);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        updateCompanyMutation.mutate({ id: id as string, name, logo: image });
    };

    useEffect(() => {
        if (company) {
            setName(company.name);
        }
    }, [company]);

    return (
        <div className="m-2">
            <div className="mb-4 flex justify-between items-center">
                <Link
                    to={ROUTE_PATHS.USER_COMPANY_LISTS}
                    className="flex justify-between items-center gap-x-2 underline text-gray-300 font-medium hover:text-gray-200"
                >
                    <div>
                        <IoArrowBack />
                    </div>
                    <div>Back</div>
                </Link>
                <h4 className="text-gray-300">Edit Company</h4>
            </div>
            <form
                className="bg-zinc-800 rounded-lg shadow-md"
                onSubmit={handleSubmit}
                encType=""
            >
                <div className="grid grid-cols-1 gap-4 p-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-start items-start gap-x-2">
                        <div>
                            <Label htmlFor="image">Logo</Label>
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
                                }/storage/uploads/companyLogo/${company?.logo}`}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end w-full bg-[#343438] rounded-b-lg py-2 pr-4">
                    <Button
                        variant={"secondary"}
                        className="w-28"
                        disabled={updateCompanyMutation.isPending}
                        type="submit"
                    >
                        {updateCompanyMutation.isPending
                            ? "Saving ..."
                            : "Save"}
                    </Button>
                </div>
            </form>
        </div>
    );
};
export default EditCompany;
