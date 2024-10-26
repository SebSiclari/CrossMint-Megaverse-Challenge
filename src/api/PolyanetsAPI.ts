import config from "../config/config";
import axiosInstance from "../http/axios-instance";
import { AxiosInstance } from "axios";
import { Coordinates } from "../interfaces/interfaces";

class PolyanetError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'PolyanetError';
    }
}

interface IPolyanetAPI {
    createPolyanet: (coordinates: Coordinates) => Promise<void>;
    deletePolyanet: (coordinates: Coordinates) => Promise<void>;
}

class PolyanetsAPI implements IPolyanetAPI {
    private axiosInstance: AxiosInstance;
    private apiBaseUrl: string;
    private candidateId: string;

    constructor() {
        this.apiBaseUrl = config.apiBaseUrl;
        this.candidateId = config.candidateId;
        this.axiosInstance = axiosInstance;
    }

    /**
     * Creates a polyanet at the specified coordinates
     * @param coordinates - The coordinates where the polyanet will be created
     * @throws PolyanetError if creating the polyanet fails
     */
    public async createPolyanet(coordinates: Coordinates): Promise<void> {
        try {
            const url = `${this.apiBaseUrl}/polyanets`;
            const body = {
                row: coordinates.row,
                column: coordinates.column,
                candidateId: this.candidateId
            }
            const response = await this.axiosInstance.post(url, body);
            await response.data;
        } catch (error) {
            console.error(error);
            throw new PolyanetError(`Failed to create polyanet at coordinates (${coordinates.row}, ${coordinates.column}): ${error}`);
        }
    }

    /**
     * Deletes a polyanet at the specified coordinates
     * @param coordinates - The coordinates where the polyanet will be deleted
     * @throws PolyanetError if deleting the polyanet fails
     */
    public async deletePolyanet(coordinates: Coordinates): Promise<void> {
        try {
            const url = `${this.apiBaseUrl}/polyanets`;
            const body = {
                row: coordinates.row,
                column: coordinates.column,
                candidateId: this.candidateId
            }
            await this.axiosInstance.delete(url, { data: body });
        } catch (error) {
            console.error(error);
            throw new PolyanetError(`Failed to delete polyanet at coordinates (${coordinates.row}, ${coordinates.column}): ${error}`);
        }
    }
}

export default PolyanetsAPI;
