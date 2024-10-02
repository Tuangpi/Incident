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
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";
import { toast } from "@/hooks/use-toast";
import { createCustomer, fetchAllCompanies } from "@/lib/clientAPI";
import { Company } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const CreateCustomer = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedCompany, setSelectedCompany] = useState<string | undefined>(
        undefined
    );

    const { data: companies } = useQuery<Company[]>({
        queryKey: ["companies"],
        queryFn: fetchAllCompanies,
    });

    const createCustomerMutation = useMutation({
        mutationFn: createCustomer,
        onSuccess: () => {
            toast({
                description: "Customer has been created successfully!",
            });
            setEmail("");
            setPassword("");
            setSelectedCompany(undefined);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selectedCompany) {
            createCustomerMutation.mutate({
                email,
                password,
                companyId: selectedCompany,
            });
        }
    };

    return (
        <div className="m-2">
            <div className="mb-4 flex justify-between items-center">
                <Link
                    to={ROUTE_PATHS.USER_CUSTOMER_LISTS}
                    className="flex justify-between items-center gap-x-2 underline text-gray-300 font-medium hover:text-gray-200"
                >
                    <div>
                        <IoArrowBack />
                    </div>
                    <div>Back</div>
                </Link>
                <h4 className="text-gray-300">Create Customer</h4>
            </div>
            <form
                className="bg-zinc-800 rounded-lg shadow-md"
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
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
                </div>
                <div className="flex justify-end w-full bg-[#343438] rounded-b-lg py-2 pr-4">
                    <Button
                        variant={"secondary"}
                        className="w-28"
                        type="submit"
                        disabled={createCustomerMutation.isPending}
                    >
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
};
export default CreateCustomer;
