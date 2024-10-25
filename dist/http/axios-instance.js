"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config/config"));
const axiosInstance = axios_1.default.create({
    baseURL: config_1.default.apiBaseUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
exports.default = axiosInstance;
