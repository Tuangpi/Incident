import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";
import { useToast } from "@/hooks/use-toast";
import { createCompany } from "@/lib/clientAPI";
import { useMutation } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import {
    IoArrowBack,
    IoCloseCircle,
    IoCloudUploadOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const CreateCompany = () => {
    const [name, setName] = useState("");
    const [imagePreview, setImagePreview] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const { toast } = useToast();
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

    const createCompanyMutation = useMutation({
        mutationFn: async ({
            name,
            image,
        }: {
            name: string;
            image: File | null;
        }) => createCompany({ name, image }),
        onSuccess: () => {
            toast({
                description: "Company has been created successfully!",
            });
            setName("");
            setImagePreview("");
            setImage(null);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        createCompanyMutation.mutate({ name, image });
    };

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
                <h4 className="text-gray-300">Create Company</h4>
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
                </div>
                <div className="flex justify-end w-full bg-[#343438] rounded-b-lg py-2 pr-4">
                    <Button
                        variant={"secondary"}
                        className="w-28"
                        disabled={createCompanyMutation.isPending}
                        type="submit"
                    >
                        {createCompanyMutation.isPending
                            ? "Saving ..."
                            : "Save"}
                    </Button>
                </div>
            </form>
        </div>
    );
};
export default CreateCompany;
