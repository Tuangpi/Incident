import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";
import { toast } from "@/hooks/use-toast";
import { fetchBugType, updateBugType } from "@/lib/bugClientAPI";
import { BugType } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";

const EditBugType = () => {
    const { id } = useParams();

    const [name, setName] = useState("");

    const { data: bugType } = useQuery<BugType>({
        queryKey: ["bugType", id],
        queryFn: () => fetchBugType(id as string),
    });

    const updateBugTypeMutation = useMutation({
        mutationFn: updateBugType,
        onSuccess: () => {
            toast({
                description: "Bug Type has been update successfully!",
            });
            setName("");
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        updateBugTypeMutation.mutate({
            id: id as string,
            name,
        });
    };

    useEffect(() => {
        if (bugType) {
            setName(bugType.name);
        }
    }, [bugType]);

    return (
        <div className="m-2">
            <div className="mb-4 flex justify-between items-center">
                <Link
                    to={ROUTE_PATHS.USER_BUG_TYPE_LISTS}
                    className="flex justify-between items-center gap-x-2 underline text-gray-300 font-medium hover:text-gray-200"
                >
                    <div>
                        <IoArrowBack />
                    </div>
                    <div>Back</div>
                </Link>
                <h4 className="text-gray-300">Create Bug Type</h4>
            </div>
            <form
                className="bg-zinc-800 rounded-lg shadow-md"
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-end w-full bg-[#343438] rounded-b-lg py-2 pr-4">
                    <Button
                        variant={"secondary"}
                        className="w-28"
                        type="submit"
                        disabled={updateBugTypeMutation.isPending}
                    >
                        {updateBugTypeMutation.isPending
                            ? "Saving... "
                            : "Save"}
                    </Button>
                </div>
            </form>
        </div>
    );
};
export default EditBugType;
