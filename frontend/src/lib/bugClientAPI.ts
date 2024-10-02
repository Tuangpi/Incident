import axiosInstance from "./axiosInstance";

export const fetchAllBugs = async () => {
    const res = await axiosInstance.get(`/bug`);

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
