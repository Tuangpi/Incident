import axiosInstance from "@/lib/axiosInstance";
import React, { createContext, useEffect, useState } from "react";

interface UserAuth {
  email: string;
  password: string;
}

interface LoginUser {
  email: string;
  role: string;
}

interface AuthContextProps {
  user: LoginUser | undefined;
  login: (apiURL: string, { email, password }: UserAuth) => Promise<void>;
  logout: (apiURL: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<LoginUser | undefined>(undefined);

  const storedUser = localStorage.getItem(
    import.meta.env.VITE_LOCAL_STORAGE_KEY
  );

  const isAuthenticated = storedUser !== null;

  useEffect(() => {
    if (isAuthenticated) {
      setUser(JSON.parse(storedUser)?.user ?? JSON.parse(storedUser)?.customer);
    }
  }, [isAuthenticated]);

  const login = async (
    apiURL: string,
    { email, password }: UserAuth
  ): Promise<void> => {
    return await axiosInstance
      .post(apiURL, { email, password })
      .then((response) => {
        localStorage.setItem(
          import.meta.env.VITE_LOCAL_STORAGE_KEY,
          JSON.stringify(response.data)
        );
        setUser(response.data?.user ?? response.data?.customer);
      })
      .catch((error) => {
        throw error;
      });
  };

  const logout = async (apiURL: string): Promise<void> => {
    return await axiosInstance
      .post(apiURL)
      .then(() => {
        localStorage.removeItem(import.meta.env.VITE_LOCAL_STORAGE_KEY);
        setUser(undefined);
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
