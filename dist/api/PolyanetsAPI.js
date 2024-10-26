"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const axios_instance_1 = __importDefault(require("../http/axios-instance"));
class PolyanetsAPI {
    constructor() {
        this.apiBaseUrl = config_1.default.apiBaseUrl;
        this.candidateId = config_1.default.candidateId;
        this.axiosInstance = axios_instance_1.default;
    }
    /**
     * Creates a polyanet at the specified coordinates
     * @param coordinates - The row and column coordinates where the polyanet should be created
     * @throws Error if creating the polyanet fails
     */
    createPolyanet(_a) {
        return __awaiter(this, arguments, void 0, function* ({ row, column }) {
            const url = `${this.apiBaseUrl}/polyanets`;
            try {
                const body = {
                    row,
                    column,
                    candidateId: this.candidateId
                };
                yield this.axiosInstance.post(url, body);
            }
            catch (error) {
                throw new Error(`Error creating polyanet: ${error}`);
            }
        });
    }
    /**
     * Deletes a polyanet at the specified coordinates
     * @param coordinates - The row and column coordinates of the polyanet to delete
     * @throws Error if deleting the polyanet fails
     */
    deletePolyanet(_a) {
        return __awaiter(this, arguments, void 0, function* ({ row, column }) {
            const url = `${this.apiBaseUrl}/polyanets`;
            try {
                const body = {
                    row,
                    column,
                    candidateId: this.candidateId
                };
                yield this.axiosInstance.delete(url, {
                    data: body
                });
            }
            catch (error) {
                console.error(error);
                throw new Error(`Error deleting polyanet: ${error}`);
            }
        });
    }
}
exports.default = PolyanetsAPI;
