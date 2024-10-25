import config from "../config/config";
import axiosInstance from "../http/axios-instance";
import { AxiosInstance } from "axios";

interface Coordinates {
    row: number;
    column: number;
}

type Planets = "SPACE" | "POLYANET"

interface GoalMap {
    goal: Planets[][];
}

interface IPolyanetAPI {
    deletePolyanet: (coordinates: Coordinates) => Promise<void>;
    createDesiredMap: () => Promise<void>;
} 

interface Polyanet {
    row: number;
    column: number;
    candidateId: string;
}



const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
     * Fetches the goal map from the API
     * @returns Promise containing the goal map data
     * @throws Error if fetching the goal map fails
     */

    private async getGoalMap(): Promise<GoalMap> {
        const url = `${this.apiBaseUrl}/map/${this.candidateId}/goal`;
        try {
            const response = await this.axiosInstance.get<GoalMap>(url);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching goal map: ${error}`);
        }
    }

    /**
     * Creates a polyanet at the specified coordinates
     * @param coordinates - The row and column coordinates where the polyanet should be created
     * @throws Error if creating the polyanet fails
     */

    private async createPolyanet({ row, column }: Coordinates): Promise<void> {
        const url = `${this.apiBaseUrl}/polyanets`;
        try {
            const response = await this.axiosInstance.post(url, {
                row,
                column,
                candidateId: this.candidateId
            });
            console.log(response.data);
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
            const response = await this.axiosInstance.delete(url, {
                data: {
                    row,
                    column,
                    candidateId: this.candidateId
                }
            });
            console.log(response.data);
        } catch (error) {

            throw new Error(`Error deleting polyanet: ${error}`);
        }
    }

    /**
     * Creates polyanets based on the provided goal map
     * @param goal - 2D array representing the desired map layout
     * @throws Error if creating any polyanet fails
     */

    private async createPolyanetsFromGoal(goal: Planets[][]): Promise<void> {
        const rows = goal.length;
        const columns = goal[0].length;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                const planet = goal[r][c];
                if (planet === "POLYANET") {
                    try {
                        await this.createPolyanet({ row: r, column: c });
                        await delay(1000); // Rate Limiting to avoid API throttling 
                    } catch (error) {
                        throw new Error(`Error creating polyanet: ${error}`);
                    }
                }
            }
        }
    }

    /**
     * Creates the complete map according to the goal map fetched from the API
     * @throws Error if creating the map fails at any step
     */

    public async createDesiredMap(): Promise<void> {
        try {
            const { goal } = await this.getGoalMap();
            await this.createPolyanetsFromGoal(goal);
        } catch (error) {
            console.error('Failed to create desired map:', error);
            throw new Error(`Error creating desired map: ${error}`);
        }
    }
}

export default PolyanetsAPI
