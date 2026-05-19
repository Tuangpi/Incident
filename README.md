# Incident CRM

Incident CRM is a customer relationship management system built with a Laravel API backend and a React + Vite frontend. It helps internal teams manage companies, customers, employees, projects, and customer-reported bugs in one place.

## Overview

This project provides two main experiences:

- Admin/user portal for managing companies, employees, customers, projects, bug types, and bugs
- Customer portal for logging in, viewing assigned company projects, and creating or tracking bug reports

The application uses token-based authentication with Laravel Sanctum and a separate frontend application for the UI.

## Tech Stack

### Backend

- Laravel 11
- PHP 8.2+
- Laravel Sanctum
- MySQL

### Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Redux Toolkit
- React Query

## Features

- User authentication for internal staff
- Customer authentication for client access
- Company management
- Customer management
- Employee management
- Project management
- Bug type management
- Bug tracking with status, severity, priority, due date, and progress
- Customer dashboard for project and bug visibility
- Admin dashboard with summary counts

## Project Structure

```text
Incident/
├── app/                  # Laravel application logic
├── database/             # Migrations and seeders
├── routes/               # API and web routes
├── frontend/             # React frontend application
├── resources/            # Laravel frontend assets
└── README.md
```

## Modules

### Admin/User Side

Internal users can:

- Log in to the admin panel
- View dashboard metrics
- Manage employees
- Manage customers
- Manage companies
- Manage projects
- Manage bug types
- Assign and track bugs

### Customer Side

Customers can:

- Log in with customer credentials
- View projects linked to their company
- View project bug lists
- Create bug reports
- Edit and monitor submitted bugs

## Database Model

The main entities in the system are:

- `companies`
- `customers`
- `users`
- `projects`
- `bug_types`
- `bugs`

Relationships include:

- A company has many projects
- A company has many customers
- A project belongs to a company
- A project has many bugs
- A bug belongs to a project
- A bug can be assigned to a user
- A bug is reported by a customer
- A bug can belong to a bug type

## API Routes

### User Routes

Base API path:

```text
/api
```

Main user endpoints include:

- `POST /api/login`
- `GET /api/dashboard`
- `GET /api/employee`
- `GET /api/customer`
- `GET /api/company`
- `GET /api/project`
- `GET /api/bug-types`
- `GET /api/bug`

### Customer Routes

Base API path:

```text
/api/customer
```

Main customer endpoints include:

- `POST /api/customer/login`
- `GET /api/customer/dashboard`
- `GET /api/customer/project/index`
- `GET /api/customer/bug/{projectId}`
- `POST /api/customer/bug/create`

## Local Development Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Incident
```

### 2. Install backend dependencies

```bash
composer install
```

### 3. Create the backend environment file

```bash
cp .env.example .env
php artisan key:generate
```

Update your database settings in `.env`.

Example:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=incident
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Run migrations and seed data

```bash
php artisan migrate --seed
```

### 5. Install frontend dependencies

```bash
cd frontend
npm install
```

### 6. Configure the frontend environment

Create or update `frontend/.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_LOCAL_STORAGE_KEY=incident
```

### 7. Start the backend server

From the project root:

```bash
php artisan serve
```

The Laravel API will usually run at:

```text
http://127.0.0.1:8000
```

### 8. Start the frontend server

From the `frontend` directory:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:3000
```

## Seeded Demo Accounts

After running `php artisan migrate --seed`, the default accounts are:

### Admin/User Login

- Email: `admin@gmail.com`
- Password: `asdf1234`

### Customer Login

- Email: `customer@gmail.com`
- Password: `asdf1234`

## Frontend Routes

Key UI routes include:

- Customer login: `/`
- Customer dashboard: `/customer/dashboard`
- User login: `/aridient`
- User dashboard: `/user/dashboard`

## Available Commands

### Backend

```bash
php artisan serve
php artisan migrate
php artisan migrate --seed
php artisan test
```

### Frontend

```bash
npm run dev
npm run build
npm run lint
```

## Notes

- The backend and frontend are maintained as separate apps inside the same repository.
- The frontend expects the Laravel API to be running locally.
- Authentication uses Sanctum personal access tokens.
- The project uses ULIDs for several primary keys.

## Future Improvements

- Add role and permission management
- Add notifications and activity logs
- Add file upload storage configuration for bug attachments
- Add test coverage for business-critical flows
- Add deployment instructions for production environments

## License

This project is open-source and available under the [MIT license](https://opensource.org/licenses/MIT).
