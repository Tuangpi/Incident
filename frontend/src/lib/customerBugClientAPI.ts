import axiosInstance from "./axiosInstance";
import { delayFetch } from "./utils";

export const customerFetchAllBugs = async (id: string) => {
    return await delayFetch(async () => {
        const res = await axiosInstance.get(`/customer/bug/${id}`);
        if (res.status === 200) return res.data;
        throw new Error("Error: Check Network Log");
    }, 2500);
};


export const customerCreateBug = async ({
    title,
    file,
    description,
    status,
    severity,
    link,
    priority,
    due_date,
    project_id, }: {
        title: string,
        description: string,
        file: File | null,
        status: string,
        link: string,
        severity: string,
        priority: string,
        due_date: Date,
        project_id: string,
    }) => {

    const res = await axiosInstance.post(`/customer/bug/create`, {
        title,
        file,
        description,
        link,
        status,
        severity,
        priority,
        due_date,
        project_id,
    });

    if (res.status === 200) return res.data;
    throw new Error("Error: Check Network Log");
};

export const customerEditBugs = async (id: string) => {
    const res = await axiosInstance.get(`/customer/bug/edit/${id}`);

    if (res.status === 200) return res.data;
    throw new Error("Error: Check Network Log");
}

export const customerUpdateBugs = async (id: string) => {
    const res = await axiosInstance.post(`/customer/bug/update/${id}`);

    if (res.status === 200) return res.data;
    throw new Error("Error: Check Network Log");
}

export const customerRemoveBugs = async (id: string) => {
    const res = await axiosInstance.delete(`/customer/bug/delete/${id}`);

    if (res.status === 200) return res.data;
    throw new Error("Error: Check Network Log");
}
