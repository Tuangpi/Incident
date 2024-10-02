import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { user, loading } = useAuth();

    if (!loading) {
        return user ? (
            <>{children}</>
        ) : (
            <Navigate to={ROUTE_PATHS.CUSTOMER_LOGIN} />
        );
    }
};

export default ProtectedRoute;
