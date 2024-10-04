import axiosInstance from "./axiosInstance";
import { delayFetch } from "./utils";

export const customerFetchAllBugs = async (id: string) => {
    return await delayFetch(async () => {
        const res = await axiosInstance.get(`/customer/bug/${id}`);
        if (res.status === 200) return res.data;
        throw new Error("Error: Check Network Log");
    }, 500);
};


export const customerCreateBug = async (newData: {
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
        title: newData.title,
        file: newData.file,
        description: newData.description,
        link: newData.link,
        status: newData.status,
        severity: newData.severity,
        priority: newData.priority,
        due_date: newData.due_date,
        project_id: newData.project_id,
    }, { headers: { 'Content-Type': "multipart/form-data" } });

    if (res.status === 200) return res.data;
    throw new Error("Error: Check Network Log");
};

export const customerShowBug = async (id: string) => {
    return delayFetch(async () => {
        const res = await axiosInstance.get(`/customer/bug/show/${id}`);

        if (res.status === 200) return res.data;
        throw new Error("Error: Check Network Log");
    }, 500)
}

export const customerEditBug = async (id: string) => {
    const res = await axiosInstance.get(`/customer/bug/edit/${id}`);

    if (res.status === 200) return res.data;
    throw new Error("Error: Check Network Log");
}

export const customerUpdateBug = async (
    updateData: {
        id: string
        title: string;
        file: File | null;
        description: string;
        link: string;
        status: string;
        severity: string;
        priority: string;
        due_date: Date | undefined;
    }
) => {
    const res = await axiosInstance.post(`/customer/bug/update/${updateData.id}`, {
        title: updateData.title,
        file: updateData.file,
        description: updateData.description,
        link: updateData.link,
        status: updateData.status,
        severity: updateData.severity,
        priority: updateData.priority,
        due_date: updateData.due_date,
    }, { headers: { 'Content-Type': 'multipart/form-data' } });

    if (res.status === 200) return res.data;
    throw new Error("Error: Check Network Log");
};


export const customerRemoveBug = async (id: string) => {
    const res = await axiosInstance.delete(`/customer/bug/delete/${id}`);

    if (res.status === 200) return res.data;
    throw new Error("Error: Check Network Log");
}
