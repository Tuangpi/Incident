import axiosInstance from "./axiosInstance";
import { delayFetch } from "./utils";

export const fetchAllBugTypes = async () => {
    return delayFetch(async () => {
        const res = await axiosInstance.get(`/bug-types`);

        if (res.status === 200) return res.data;
        throw new Error("Error: Check Network Log");
    }, 2000)
}

export const fetchBugType = async (id: string) => {
    const res = await axiosInstance.get(`/bug-types/${id}`);

    if (res.status === 200) return res.data;
    throw new Error("Error: Check Network Log");
}

export const createBugTypes = async ({
    name, }: {
        name: string,
    }) => {

    const res = await axiosInstance.post(`/bug-types/create`, {
        name,
    });

    if (res.status === 200) return res.data;
    throw new Error("Error: Check Network Log");
};

export const updateBugType = async ({
    id,
    name, }: {
        id: string,
        name: string,
    }) => {

    const res = await axiosInstance.put(`/bug-types/update/${id}`, {
        name,
    });

    if (res.status === 200) return res.data;
    throw new Error("Error: Check Network Log");
};

export const fetchAllBugs = async ({ companyFilter,
    projectFilter,
    bugTypeFilter,
    statusFilter,
    severityFilter,
    priorityFilter,
    employeeFilter }: {
        companyFilter: string,
        projectFilter: string,
        bugTypeFilter: string,
        statusFilter: string,
        severityFilter: string,
        priorityFilter: string,
        employeeFilter: string,
    }) => {
    const queryParams = new URLSearchParams({
        company: companyFilter,
        project: projectFilter,
        bugType: bugTypeFilter,
        status: statusFilter,
        severity: severityFilter,
        priority: priorityFilter,
        employee: employeeFilter,
    }).toString();

    return delayFetch(async () => {
        const res = await axiosInstance.get(`/bug?${queryParams}`);

        if (res.status === 200) return res.data;
        throw new Error("Error: Check Network Log");
    }, 2000)
}

export const fetchBug = async (id: string) => {
    const res = await axiosInstance.get(`/bug/${id}`);

    if (res.status === 200) return res.data;
    throw new Error("Error: Check Network Log");
}

export const createBug = async ({
    title,
    image,
    description,
    type,
    status,
    severity,
    priority,
    due_date,
    reported_by,
    assign_to,
    project_id,
    resolution }: {
        title: string,
        type: string;
        description: string,
        image: File | null,
        status: string,
        severity: string,
        priority: string,
        reported_by: string,
        due_date: string,
        assign_to: string,
        project_id: string,
        resolution: string
    }) => {

    const res = await axiosInstance.post(`/bug/create`, {
        title,
        type,
        description,
        image,
        status,
        severity,
        priority,
        reported_by,
        due_date,
        assign_to, project_id, resolution
    });

    if (res.status === 200) return res.data;
    throw new Error("Error: Check Network Log");
};

export const updateBug = async ({
    id,
    title,
    image,
    description,
    type,
    status,
    severity,
    priority,
    due_date,
    reported_by,
    assign_to,
    project_id,
    resolution }: {
        id: string,
        title: string,
        type: string;
        description: string,
        image: File | null,
        status: string,
        severity: string,
        priority: string,
        reported_by: string,
        due_date: string,
        assign_to: string,
        project_id: string,
        resolution: string
    }) => {

    const res = await axiosInstance.post(`/bug/update/${id}`, {
        title,
        type,
        description,
        image,
        status,
        severity,
        priority,
        reported_by,
        due_date,
        assign_to, project_id, resolution
    });

    if (res.status === 200) return res.data;
    throw new Error("Error: Check Network Log");
};
