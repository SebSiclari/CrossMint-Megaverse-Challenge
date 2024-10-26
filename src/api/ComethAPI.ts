import { Coordinates, Direction } from "../interfaces/interfaces";
import axiosInstance from "../http/axios-instance";
import { AxiosInstance } from "axios";
import config from "../config/config";




interface IComethAPI {
    createCometh: (coordinates: Coordinates, direction: Direction) => Promise<void>;
    deleteCometh: (coordinates: Coordinates) => Promise<void>;
}

class ComethAPI implements IComethAPI {
    private axiosInstance: AxiosInstance;
    private apiBaseUrl: string;
    private candidateId: string;

    constructor() {
        this.apiBaseUrl = config.apiBaseUrl;
        this.candidateId = config.candidateId;
        this.axiosInstance = axiosInstance;
    }

    /**
     * Creates a cometh at the specified coordinates with the given direction
     * @param coordinates - The coordinates where the cometh will be created
     * @param direction - The direction of the cometh
     * @throws Error if creating the cometh fails
     */

    public async createCometh(coordinates: Coordinates, direction: Direction): Promise<void> {

        console.log(coordinates, direction);
        try {
            const url = `${this.apiBaseUrl}/comeths`;
            const body = {
                row: coordinates.row,
                column: coordinates.column,
                direction,
                candidateId: this.candidateId
            }
           const response = await this.axiosInstance.post(url, body);
           await response.data;
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Deletes a cometh at the specified coordinates
     * @param coordinates - The coordinates where the cometh will be deleted
     * @throws Error if deleting the cometh fails
     */

    public async deleteCometh(coordinates: Coordinates): Promise<void> {
        try {
            const url = `${this.apiBaseUrl}/comeths`;
            const body = {
                row: coordinates.row,
                column: coordinates.column,
                candidateId: this.candidateId
            }
            const response = await this.axiosInstance.delete(url, { data: body });
            await response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default ComethAPI;