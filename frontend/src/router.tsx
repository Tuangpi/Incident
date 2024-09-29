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
import EditEmployee from "./pages/users/Employee/EitEmployee";
import EmployeeDetail from "./pages/users/Employee/EmployeeDetail";

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
        errorElement: <ErrorPage />,
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
        errorElement: <ErrorPage />,
      },
      {
        path: ROUTE_PATHS.USER_EMPLOYEE_LISTS,
        element: <Employee />,
        errorElement: <ErrorPage />,
      },
      {
        path: ROUTE_PATHS.USER_EMPLOYEE_CREATE,
        element: <CreateEmployee />,
        errorElement: <ErrorPage />,
      },
      {
        path: ROUTE_PATHS.USER_EMPLOYEE_EDIT,
        element: <EditEmployee />,
        errorElement: <ErrorPage />,
      },
      {
        path: ROUTE_PATHS.USER_EMPLOYEE_DETAIL,
        element: <EmployeeDetail />,
        errorElement: <ErrorPage />,
      },
      {
        path: ROUTE_PATHS.USER_COMPANY_LISTS,
        element: <Company />,
        errorElement: <ErrorPage />,
      },
      {
        path: ROUTE_PATHS.USER_PROJECT_LISTS,
        element: <Project />,
        errorElement: <ErrorPage />,
      },
      {
        path: ROUTE_PATHS.USER_BUG_LISTS,
        element: <Bug />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const MainRouter = () => {
  return <RouterProvider router={router} />;
};
export default MainRouter;
