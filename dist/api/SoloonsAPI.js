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
const axios_instance_1 = __importDefault(require("../http/axios-instance"));
const config_1 = __importDefault(require("../config/config"));
class SoloonsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SoloonsError';
    }
}
class SoloonsAPI {
    constructor() {
        this.axiosInstance = axios_instance_1.default;
        this.apiBaseUrl = config_1.default.apiBaseUrl;
        this.candidateId = config_1.default.candidateId;
    }
    /**
     * Creates a soloons at the specified coordinates with the given color
     * @param coordinates - The coordinates where the soloons will be created
     * @param color - The color of the soloons
     * @throws Error if creating the soloons fails
     */
    createSoloons(coordinates, color) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `${this.apiBaseUrl}/soloons`;
                const body = {
                    row: coordinates.row,
                    column: coordinates.column,
                    color,
                    candidateId: this.candidateId
                };
                const response = yield this.axiosInstance.post(url, body);
                yield response.data;
            }
            catch (error) {
                console.error(error);
                throw new SoloonsError(`Failed to create soloons at coordinates (${coordinates.row}, ${coordinates.column}): ${error}`);
            }
        });
    }
    /**
     * Deletes a soloons at the specified coordinates
     * @param coordinates - The coordinates where the soloons will be deleted
     * @throws Error if deleting the soloons fails
     */
    deleteSoloons(coordinates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `${this.apiBaseUrl}/soloons`;
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
                throw new SoloonsError(`Failed to delete soloons at coordinates (${coordinates.row}, ${coordinates.column}): ${error}`);
            }
        });
    }
}
exports.default = SoloonsAPI;
