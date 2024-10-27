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
class PolyanetError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PolyanetError';
    }
}
class PolyanetsAPI {
    constructor() {
        this.apiBaseUrl = config_1.default.apiBaseUrl;
        this.candidateId = config_1.default.candidateId;
        this.axiosInstance = axios_instance_1.default;
    }
    /**
     * Creates a polyanet at the specified coordinates
     * @param coordinates - The coordinates where the polyanet will be created
     * @throws PolyanetError if creating the polyanet fails
     */
    createPolyanet(coordinates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `${this.apiBaseUrl}/polyanets`;
                const body = {
                    row: coordinates.row,
                    column: coordinates.column,
                    candidateId: this.candidateId
                };
                const response = yield this.axiosInstance.post(url, body);
                yield response.data;
            }
            catch (error) {
                console.error(error);
                throw new PolyanetError(`Failed to create polyanet at coordinates (${coordinates.row}, ${coordinates.column}): ${error}`);
            }
        });
    }
    /**
     * Deletes a polyanet at the specified coordinates
     * @param coordinates - The coordinates where the polyanet will be deleted
     * @throws PolyanetError if deleting the polyanet fails
     */
    deletePolyanet(coordinates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `${this.apiBaseUrl}/polyanets`;
                const body = {
                    row: coordinates.row,
                    column: coordinates.column,
                    candidateId: this.candidateId
                };
                const response = yield this.axiosInstance.delete(url, { data: body });
                yield response.data;
            }
            catch (error) {
                console.error(error);
                throw new PolyanetError(`Failed to delete polyanet at coordinates (${coordinates.row}, ${coordinates.column}): ${error}`);
            }
        });
    }
}
exports.default = PolyanetsAPI;
