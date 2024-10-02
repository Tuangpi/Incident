import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import PublicRoute from "./components/PublicRoute";
import AuthLogin from "./pages/users/Auth/AuthLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthLayout from "./pages/users/layout/AuthLayout";
import Dashboard from "./pages/users/Dashboard";
import CustomerLayout from "./pages/customers/layout/CustomerLayout";
import CustomerDashboard from "./pages/customers/CustomerDashboard";
import CustomerLogin from "./pages/customers/Auth/CustomerLogin";
import { ROUTE_PATHS } from "./constants/ROUTE_PATHS";
import Company from "./pages/users/Company/Index";
import Employee from "./pages/users/Employee/Index";
import Project from "./pages/users/Project/Index";
import Bug from "./pages/users/Bug/Index";
import CreateEmployee from "./pages/users/Employee/CreateEmployee";
import EditEmployee from "./pages/users/Employee/EditEmployee";
import EmployeeDetail from "./pages/users/Employee/EmployeeDetail";
import CreateCompany from "./pages/users/Company/CreateCompany";
import EditCompany from "./pages/users/Company/EditCompany";
import CompanyDetail from "./pages/users/Company/CompanyDetail";
import CreateProject from "./pages/users/Project/CreateProject";
import EditProject from "./pages/users/Project/EditProject";
import ProjectDetail from "./pages/users/Project/ProjectDetail";
import CreateBug from "./pages/users/Bug/CreateBug";
import EditBug from "./pages/users/Bug/EditBug";
import BugDetail from "./pages/users/Bug/BugDetail";
import CustomerDetail from "./pages/users/Customer/CustomerDetail";
import EditCustomer from "./pages/users/Customer/EditCustomer";
import CreateCustomer from "./pages/users/Customer/CreateCustomer";
import Customer from "./pages/users/Customer/Index";

const router = createBrowserRouter([
    {
        path: ROUTE_PATHS.CUSTOMER_LOGIN,
        element: (
            <PublicRoute>
                <CustomerLogin />
            </PublicRoute>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: ROUTE_PATHS.CUSTOMER_LAYOUT,
        element: (
            <ProtectedRoute>
                <CustomerLayout />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: ROUTE_PATHS.CUSTOMER_DASHBOARD,
                element: <CustomerDashboard />,
            },
        ],
    },
    {
        path: ROUTE_PATHS.USER_LOGIN,
        element: (
            <PublicRoute>
                <AuthLogin />
            </PublicRoute>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: ROUTE_PATHS.USER_LAYOUT,
        element: (
            <ProtectedRoute>
                <AuthLayout />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: ROUTE_PATHS.USER_DASHBOARD,
                element: <Dashboard />,
            },
            {
                path: ROUTE_PATHS.USER_EMPLOYEE_LISTS,
                element: <Employee />,
            },
            {
                path: ROUTE_PATHS.USER_EMPLOYEE_CREATE,
                element: <CreateEmployee />,
            },
            {
                path: ROUTE_PATHS.USER_EMPLOYEE_EDIT + "/:id",
                element: <EditEmployee />,
            },
            {
                path: ROUTE_PATHS.USER_EMPLOYEE_DETAIL + "/id",
                element: <EmployeeDetail />,
            },
            {
                path: ROUTE_PATHS.USER_CUSTOMER_LISTS,
                element: <Customer />,
            },
            {
                path: ROUTE_PATHS.USER_CUSTOMER_CREATE,
                element: <CreateCustomer />,
            },
            {
                path: ROUTE_PATHS.USER_CUSTOMER_EDIT + "/:id",
                element: <EditCustomer />,
            },
            {
                path: ROUTE_PATHS.USER_CUSTOMER_DETAIL + "/id",
                element: <CustomerDetail />,
            },
            {
                path: ROUTE_PATHS.USER_COMPANY_LISTS,
                element: <Company />,
            },
            {
                path: ROUTE_PATHS.USER_COMPANY_CREATE,
                element: <CreateCompany />,
            },
            {
                path: ROUTE_PATHS.USER_COMPANY_EDIT + "/:id",
                element: <EditCompany />,
            },
            {
                path: ROUTE_PATHS.USER_COMPANY_DETAIL + "/:id",
                element: <CompanyDetail />,
            },
            {
                path: ROUTE_PATHS.USER_PROJECT_LISTS,
                element: <Project />,
            },
            {
                path: ROUTE_PATHS.USER_PROJECT_CREATE,
                element: <CreateProject />,
            },
            {
                path: ROUTE_PATHS.USER_PROJECT_EDIT + "/:id",
                element: <EditProject />,
            },
            {
                path: ROUTE_PATHS.USER_PROJECT_DETAIL + "/:id",
                element: <ProjectDetail />,
            },
            {
                path: ROUTE_PATHS.USER_BUG_LISTS,
                element: <Bug />,
            },
            {
                path: ROUTE_PATHS.USER_BUG_CREATE,
                element: <CreateBug />,
            },
            {
                path: ROUTE_PATHS.USER_BUG_EDIT + "/:id",
                element: <EditBug />,
            },
            {
                path: ROUTE_PATHS.USER_BUG_DETAIL + "/:id",
                element: <BugDetail />,
            },
        ],
    },
]);

const MainRouter = () => {
    return <RouterProvider router={router} />;
};
export default MainRouter;
