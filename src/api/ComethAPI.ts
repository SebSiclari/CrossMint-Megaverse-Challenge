import { Coordinates, Direction } from "../interfaces/interfaces";
import axiosInstance from "../http/axios-instance";
import { AxiosInstance } from "axios";
import config from "../config/config";


class ComethError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ComethError';
    }
}

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
     * @throws ComethError if creating the cometh fails
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
            throw new ComethError(`Failed to create cometh at coordinates (${coordinates.row}, ${coordinates.column}): ${error}`);
        }
    }

    /**
     * Deletes a cometh at the specified coordinates
     * @param coordinates - The coordinates where the cometh will be deleted
     * @throws ComethError if deleting the cometh fails
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
            throw new ComethError(`Failed to delete cometh at coordinates (${coordinates.row}, ${coordinates.column}): ${error}`);
        }
    }
}

export default ComethAPI;