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
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
class PolyanetsAPI {
    constructor() {
        this.apiBaseUrl = config_1.default.apiBaseUrl;
        this.candidateId = config_1.default.candidateId;
        this.axiosInstance = axios_instance_1.default;
    }
    /**
     * Fetches the goal map from the API
     * @returns Promise containing the goal map data
     * @throws Error if fetching the goal map fails
     */
    getGoalMap() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.apiBaseUrl}/map/${this.candidateId}/goal`;
            try {
                const response = yield this.axiosInstance.get(url);
                return response.data;
            }
            catch (error) {
                throw new Error(`Error fetching goal map: ${error}`);
            }
        });
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
                const response = yield this.axiosInstance.post(url, {
                    row,
                    column,
                    candidateId: this.candidateId
                });
                console.log(response.data);
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
                const response = yield this.axiosInstance.delete(url, {
                    data: {
                        row,
                        column,
                        candidateId: this.candidateId
                    }
                });
                console.log(response.data);
            }
            catch (error) {
                throw new Error(`Error deleting polyanet: ${error}`);
            }
        });
    }
    /**
     * Creates polyanets based on the provided goal map
     * @param goal - 2D array representing the desired map layout
     * @throws Error if creating any polyanet fails
     */
    createPolyanetsFromGoal(goal) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = goal.length;
            const columns = goal[0].length;
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < columns; c++) {
                    const planet = goal[r][c];
                    if (planet === "POLYANET") {
                        try {
                            yield this.createPolyanet({ row: r, column: c });
                            yield delay(1000); // Rate Limiting to avoid API throttling 
                        }
                        catch (error) {
                            throw new Error(`Error creating polyanet: ${error}`);
                        }
                    }
                }
            }
        });
    }
    /**
     * Creates the complete map according to the goal map fetched from the API
     * @throws Error if creating the map fails at any step
     */
    createDesiredMap() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { goal } = yield this.getGoalMap();
                yield this.createPolyanetsFromGoal(goal);
            }
            catch (error) {
                console.error('Failed to create desired map:', error);
                throw new Error(`Error creating desired map: ${error}`);
            }
        });
    }
}
exports.default = PolyanetsAPI;
