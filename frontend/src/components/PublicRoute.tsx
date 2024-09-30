import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";

interface PublicRouteProps {
    children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
    const { user } = useAuth();

    return user ? (
        user.role == "customer" ? (
            <Navigate to={ROUTE_PATHS.CUSTOMER_DASHBOARD} />
        ) : (
            <Navigate to={ROUTE_PATHS.USER_DASHBOARD} />
        )
    ) : (
        <>{children}</>
    );
};

export default PublicRoute;
