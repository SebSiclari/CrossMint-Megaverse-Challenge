import config from "../config/config";
import axiosInstance from "../http/axios-instance";
import { AxiosInstance } from "axios";
import { Coordinates } from "../interfaces/interfaces";

type Planets = "SPACE" | "POLYANET"

interface GoalMap {
    goal: Planets[][];
}

interface IPolyanetAPI {
    createPolyanet: (coordinates: Coordinates) => Promise<void>;
    deletePolyanet: (coordinates: Coordinates) => Promise<void>;
} 

interface Polyanet {
    row: number;
    column: number;
    candidateId: string;
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
     * @param coordinates - The row and column coordinates where the polyanet should be created
     * @throws Error if creating the polyanet fails
     */

    public async createPolyanet({ row, column }: Coordinates): Promise<void> {
        const url = `${this.apiBaseUrl}/polyanets`;
        try {
            const body = {  
                row,
                column,
                candidateId: this.candidateId
            }
            await this.axiosInstance.post<Polyanet>(url, body);

        } catch (error) {
            throw new Error(`Error creating polyanet: ${error}`);
        }
    }

    /**
     * Deletes a polyanet at the specified coordinates
     * @param coordinates - The row and column coordinates of the polyanet to delete
     * @throws Error if deleting the polyanet fails
     */

    public async deletePolyanet({ row, column }: Coordinates): Promise<void> {
        const url = `${this.apiBaseUrl}/polyanets`;
        try {
            const body = {
                row,
                column,
                candidateId: this.candidateId
            }
            await this.axiosInstance.delete(url, {
                data: body
            });
        } catch (error) {
            console.error(error);
            throw new Error(`Error deleting polyanet: ${error}`);
        }
    }

}

export default PolyanetsAPI
