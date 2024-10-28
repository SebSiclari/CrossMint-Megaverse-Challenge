import axios from "axios";
import { config } from "../config/config";

export const axiosInstance = axios.create({
    baseURL: config.apiBaseUrl,
    timeout: 60000,
    headers: {
        "Content-Type": "application/json",
    },
});
