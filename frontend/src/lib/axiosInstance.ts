import Axios from "axios";

const axiosInstance = Axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL + "/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const storedCredential = localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_KEY);

        if (storedCredential) {
            try {
                const token = JSON.parse(storedCredential)?.token;

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            } catch (error) {
                console.error("Error parsing token:", error);
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const handleResponseError = (error: { response: { status: any; data: any; }; message: any; }) => {
    if (error.response) {
        const { status, data } = error.response;
        console.error(`API Error (Status: ${status}):`, data);
    } else {
        console.error("Network or Server Error:", error.message);
    }

    return Promise.reject(error);
};

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => handleResponseError(error)
);

export default axiosInstance;
