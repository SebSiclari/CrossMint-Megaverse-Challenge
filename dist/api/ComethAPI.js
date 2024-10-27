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
class ComethError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ComethError';
    }
}
class ComethAPI {
    constructor() {
        this.apiBaseUrl = config_1.default.apiBaseUrl;
        this.candidateId = config_1.default.candidateId;
        this.axiosInstance = axios_instance_1.default;
    }
    /**
     * Creates a cometh at the specified coordinates with the given direction
     * @param coordinates - The coordinates where the cometh will be created
     * @param direction - The direction of the cometh
     * @throws ComethError if creating the cometh fails
     */
    createCometh(coordinates, direction) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(coordinates, direction);
            try {
                const url = `${this.apiBaseUrl}/comeths`;
                const body = {
                    row: coordinates.row,
                    column: coordinates.column,
                    direction,
                    candidateId: this.candidateId
                };
                const response = yield this.axiosInstance.post(url, body);
                yield response.data;
            }
            catch (error) {
                console.error(error);
                throw new ComethError(`Failed to create cometh at coordinates (${coordinates.row}, ${coordinates.column}): ${error}`);
            }
        });
    }
    /**
     * Deletes a cometh at the specified coordinates
     * @param coordinates - The coordinates where the cometh will be deleted
     * @throws ComethError if deleting the cometh fails
     */
    deleteCometh(coordinates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `${this.apiBaseUrl}/comeths`;
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
                throw new ComethError(`Failed to delete cometh at coordinates (${coordinates.row}, ${coordinates.column}): ${error}`);
            }
        });
    }
}
exports.default = ComethAPI;
