import { QueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { delayFetch } from "./utils";

export const queryClient = new QueryClient();

export const fetchAllEmployees = async () => {
    return await delayFetch(async () => {
        const res = await axiosInstance.get(`/employee`);

        if (res.status === 200) return res.data;
        throw new Error("Error: Check Network Log");
    }, 2000);
}

export const createEmployee = async ({ name, email, password, role }: { name: string; email: string, password: string, role: string }) => {

    const res = await axiosInstance.post(`/employee/create`, { name, email, password, role });

    if (res.status === 200) return res.data;
    throw new Error("Error: Check Network Log");
};

export const fetchAllCustomers = async () => {
    return await delayFetch(async () => {
        const res = await axiosInstance.get(`/customer`);

        if (res.status === 200) return res.data;
        throw new Error("Error: Check Network Log");
    }, 2000);

}

export const createCustomer = async ({ companyId, email, password }: { companyId: string; email: string, password: string }) => {

    const res = await axiosInstance.post(`/customer/create`, { companyId, email, password, });

    if (res.status === 200) return res.data;
    throw new Error("Error: Check Network Log");
};

export const fetchAllCompanies = async () => {
    return await delayFetch(async () => {
        const res = await axiosInstance.get(`/company`);

        if (res.status === 200) return res.data;
        throw new Error("Error: Check Network Log");
    })

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

export const fetchAllProjects = async () => {
    return await delayFetch(async () => {
        const res = await axiosInstance.get(`/project`);

        if (res.status === 200) return res.data;
        throw new Error("Error: Check Network Log");
    })
}

export const customerFetchAllProjects = async () => {
    return await delayFetch(async () => {
        const res = await axiosInstance.get(`/customer/project`);

        if (res.status === 200) return res.data;
        throw new Error("Error: Check Network Log");
    })
}

export const createProject = async ({ companyId, name, description, logo, }: { companyId: string, name: string; description: string, logo: File | null }) => {

    const res = await axiosInstance.post(`/project/create`, { name, companyId, description, logo }, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    if (res.status === 200) return res.data;
    throw new Error("Error: Check Network Log");
};

