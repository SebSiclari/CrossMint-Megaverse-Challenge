import axiosInstance from "../http/axios-instance";
import { Coordinates } from "../interfaces/interfaces";
import { AxiosInstance } from "axios";
import config from "../config/config";

interface ISoloonsAPI {
    createSoloons: (coordinates: Coordinates, color: Colors) => Promise<void>;
    deleteSoloons: (coordinates: Coordinates) => Promise<void>;
}

type Colors = "blue" | "red" | "purple" | "white";


class SoloonsAPI implements ISoloonsAPI {
    private axiosInstance: AxiosInstance;
    private apiBaseUrl: string;
    private candidateId: string;

    constructor() {
        this.axiosInstance = axiosInstance;
        this.apiBaseUrl = config.apiBaseUrl;
        this.candidateId = config.candidateId;
    }

    public async createSoloons(coordinates: Coordinates, color: Colors): Promise<void> {

        try {
            const url = `${this.apiBaseUrl}/soloons`;
            const body = {
            row: coordinates.row,
            column: coordinates.column,
            color,
            candidateId: this.candidateId
            }
            await this.axiosInstance.post(url, body);
        } catch (error) {
            console.error(error);
        }
    }

    public async deleteSoloons(coordinates: Coordinates): Promise<void> {
        try {
            const url = `${this.apiBaseUrl}/soloons`;
            const body = {
                row: coordinates.row,
            column: coordinates.column,
            candidateId: this.candidateId
        }
            await this.axiosInstance.delete(url, { data: body });
        } catch (error) {
            console.error(error);
        }
    }


}


export default SoloonsAPI;

