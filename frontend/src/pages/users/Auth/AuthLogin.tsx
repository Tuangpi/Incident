import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import useAuth from "@/hooks/useAuth";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";

const AuthLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [togglePassword, setTogglePassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        login("/login", { email, password })
            .then(() => {
                setLoading(false);
                navigate(ROUTE_PATHS.USER_DASHBOARD);
            })
            .catch((error) => {
                setLoading(false);
                setError(error?.response?.data?.message);
            });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900">
            <div className="w-full max-w-md p-8 mx-2 bg-gray-800 shadow-lg rounded-lg">
                <h3 className="text-center text-gray-300">Aridient Login</h3>
                {error && (
                    <div className="bg-red-100 text-red-500 text-center font-medium rounded-lg py-1.5 px-2 text-sm shadow-sm">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="mt-4">
                    <div>
                        <Label htmlFor="email" className="text-gray-300">
                            Email
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                            className="text-gray-300"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="password" className="text-gray-300">
                            {" "}
                            Password
                        </Label>
                        <div className="relative">
                            {togglePassword ? (
                                <FaEye
                                    size={18}
                                    className="absolute right-3 top-2.5 cursor-pointer text-gray-300"
                                    onClick={() => setTogglePassword(false)}
                                />
                            ) : (
                                <FaEyeSlash
                                    size={18}
                                    className="absolute right-3 top-2.5 cursor-pointer text-gray-300"
                                    onClick={() => setTogglePassword(true)}
                                />
                            )}
                            <Input
                                type={togglePassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={togglePassword ? "" : "••••••••"}
                                className="text-gray-300"
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <Button
                            className="w-full bg-gray-400 text-gray-900 hover:bg-gray-500"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Authenticating..." : "Login"}
                        </Button>
                    </div>
                </form>
                <Link
                    to={ROUTE_PATHS.CUSTOMER_LOGIN}
                    className="flex justify-center mt-3 underline text-gray-300"
                >
                    Back
                </Link>
            </div>
        </div>
    );
};

export default AuthLogin;
