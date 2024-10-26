import axiosInstance from "../http/axios-instance";
import { Coordinates, Colors } from "../interfaces/interfaces";
import { AxiosInstance } from "axios";
import config from "../config/config";

interface ISoloonsAPI {
    createSoloons: (coordinates: Coordinates, color: Colors) => Promise<void>;
    deleteSoloons: (coordinates: Coordinates) => Promise<void>;
}



class SoloonsAPI implements ISoloonsAPI {
    private axiosInstance: AxiosInstance;
    private apiBaseUrl: string;
    private candidateId: string;

    constructor() {
        this.axiosInstance = axiosInstance;
        this.apiBaseUrl = config.apiBaseUrl;
        this.candidateId = config.candidateId;
    }

    /**
     * Creates a soloons at the specified coordinates with the given color
     * @param coordinates - The coordinates where the soloons will be created
     * @param color - The color of the soloons
     * @throws Error if creating the soloons fails
     */

    public async createSoloons(coordinates: Coordinates, color: Colors): Promise<void> {

        try {
            const url = `${this.apiBaseUrl}/soloons`;
            const body = {
            row: coordinates.row,
            column: coordinates.column,
            color,
            candidateId: this.candidateId
            }
            const response = await this.axiosInstance.post(url, body);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Deletes a soloons at the specified coordinates
     * @param coordinates - The coordinates where the soloons will be deleted
     * @throws Error if deleting the soloons fails
     */

    public async deleteSoloons(coordinates: Coordinates): Promise<void> {
        try {
            const url = `${this.apiBaseUrl}/soloons`;
            const body = {
                row: coordinates.row,
            column: coordinates.column,
            candidateId: this.candidateId
        }
            const response = await this.axiosInstance.delete(url, { data: body });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }


}


export default SoloonsAPI;

