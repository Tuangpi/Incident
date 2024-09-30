import { QueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const queryClient = new QueryClient();

export const fetchAllCompanies = async () => {
    const res = await axiosInstance.get(`/company`);

    if (res.status === 200) return res.data;
    throw new Error("Error: Check Network Log");
}

export const createCompany = async ({ name, image }: { name: string; image: File | null }) => {

    const res = await axiosInstance.post(`/company/create`, { name, logo: image }, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    if (res.status === 200) return res.data;
    throw new Error("Error: Check Network Log");
};
