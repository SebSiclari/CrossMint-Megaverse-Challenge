import PolyanetsAPI from "../api/PolyanetsAPI";
import SoloonsAPI from "../api/SoloonsAPI";
import config from "../config/config";
import axiosInstance from "../http/axios-instance";
import { AxiosInstance } from "axios";

type Planets = "SPACE" | "POLYANET"

interface GoalMapPhaseOne {
    goal: Planets[][];
}


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


interface GoalMapPhaseTwo {}

class MegaverseService {
    private axiosInstance: AxiosInstance;
    private apiBaseUrl: string;
    private candidateId: string;
    private polyanetsAPI: PolyanetsAPI;
    private soloonsAPI: SoloonsAPI;

    constructor() {
        this.apiBaseUrl = config.apiBaseUrl;
        this.candidateId = config.candidateId;
        this.axiosInstance = axiosInstance;
        this.polyanetsAPI = new PolyanetsAPI();
        this.soloonsAPI = new SoloonsAPI();
    }

      /**
     * Fetches the goal map from the API for phase one
     * @returns Promise containing the goal map data
     * @throws Error if fetching the goal map fails
     */

    private async getGoalMapPhaseOne(): Promise<GoalMapPhaseOne> {
        const url = `${this.apiBaseUrl}/map/${this.candidateId}/goal`;
        try {
            const response = await this.axiosInstance.get<GoalMapPhaseOne>(url);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching goal map: ${error}`);
        }
    }


    private async createPhaseOneMapFromGoal(goal: Planets[][]): Promise<void> {
        const rows = goal.length;
        const columns = goal[0].length;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                const planet = goal[r][c];
                if (planet === "POLYANET") {
                    try {
                        await this.polyanetsAPI.createPolyanet({ row: r, column: c });
                        await delay(1000); // Rate Limiting to avoid API throttling 
                    } catch (error) {
                        throw new Error(`Error creating polyanet: ${error}`);
                    }
                }
            }
        }
    }

    public async createDesiredMapPhaseOne(): Promise<void> {
        try {
            const { goal } = await this.getGoalMapPhaseOne();
            await this.createPhaseOneMapFromGoal(goal);
        } catch (error) {
            console.error('Failed to create desired map:', error);
            throw new Error(`Error creating desired map: ${error}`);
        }
    }
}

export default MegaverseService;