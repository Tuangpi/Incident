export interface Company {
    id: string;
    name: string;
    logo: string;
    address: string;
    created_at: string
    updated_at: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string
    created_at: string
    updated_at: string;
}

export interface Customer {
    id: string;
    email: string;
    password: string;
    company_id: string
    created_at: string
    updated_at: string;
}

export interface Project {
    id: string;
    name: string;
    company_id: string;
    logo: string;
    description: string
    created_at: string
    updated_at: string;

    company: Company
}

export interface Bug {
    id: string;
    title: string;
    file: string;
    description: string;
    type: string
    status: string
    severity: string
    priority: string
    progress: number
    link: string
    due_date: string
    reported_by_id: string
    bug_type_id: string
    assign_to_id: string
    project_id: string
    resolution: string
    created_at: string
    updated_at: string;

    project: Project
    reported_by: Customer
}

export interface BugType {
    id: string;
    name: string;
    created_at: string
    updated_at: string;
}
