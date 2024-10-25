import axios from "axios";
import config from "../config/config";

const axiosInstance = axios.create({
    baseURL: config.apiBaseUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;