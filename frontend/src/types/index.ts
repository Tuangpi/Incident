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

    company?: Company
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
    bug_types_id: string
    status: string
    severity: string
    priority: string
    progress: number
    link: string
    due_date: string
    reported_by_id: string
    assigned_to_id: string
    project_id: string
    resolution: string
    created_at: string
    updated_at: string;

    project: Project
    employee?: User
    reported_by: Customer
    bug_type?: BugType
}

export interface BugType {
    id: string;
    name: string;
    created_at: string
    updated_at: string;
}
