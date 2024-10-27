import { PolyanetsAPI } from "../api/PolyanetsAPI";
import { SoloonsAPI } from "../api/SoloonsAPI";
import { ComethAPI } from "../api/ComethAPI";
import config from "../config/config";
import { axiosInstance } from "../http/axios-instance";
import type { AxiosInstance } from "axios";
import Bottleneck from "bottleneck";
import type { Colors, Direction } from "../interfaces/interfaces";
import { Cometh } from "../domain/entities/Cometh";
import { Polyanet } from "../domain/entities/Polyanets";
import { Soloon } from "../domain/entities/Soloons";

type PlanetsPhaseOne = "SPACE" | "POLYANET";

interface GoalMapPhaseOne {
	goal: PlanetsPhaseOne[][];
}

type SoloonType = `${Uppercase<Colors>}_SOLOON`;
type ComethType = `${Uppercase<Direction>}_COMETH`;
type PlanetsPhaseTwo = PlanetsPhaseOne | SoloonType | ComethType;

interface GoalMapPhaseTwo {
	goal: PlanetsPhaseTwo[][];
}

const SPACE = "SPACE";
const POLYANET = "POLYANET";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export class MegaverseService {
	private axiosInstance: AxiosInstance;
	private apiBaseUrl: string;
	private candidateId: string;
	private polyanetsAPI: PolyanetsAPI;
	private soloonsAPI: SoloonsAPI;
	private comethAPI: ComethAPI;
	constructor() {
		this.apiBaseUrl = config.apiBaseUrl;
		this.candidateId = config.candidateId;
		this.axiosInstance = axiosInstance;
		this.polyanetsAPI = new PolyanetsAPI();
		this.soloonsAPI = new SoloonsAPI();
		this.comethAPI = new ComethAPI();
	}

	/**
	 * Checks if a planet is a soloon
	 * @param planet - The planet to check
	 * @returns True if the planet is a soloon, false otherwise
	 */
	private isSoloon(planet: PlanetsPhaseTwo): planet is SoloonType {
		return planet.endsWith("_SOLOON");
	}

	/**
	 * Checks if a planet is a cometh
	 * @param planet - The planet to check
	 * @returns True if the planet is a cometh, false otherwise
	 */
	private isCometh(planet: PlanetsPhaseTwo): planet is ComethType {
		return planet.endsWith("_COMETH");
	}

	/**
	 * Matches the color of a soloon
	 * @param soloon - The soloon to match
	 * @returns The color of the soloon
	 */
	private matchColorSoloon(soloon: SoloonType): Colors {
		return soloon.split("_")[0].toLowerCase() as Colors;
	}

	/**
	 * Matches the direction of a cometh
	 * @param cometh - The cometh to match
	 * @returns The direction of the cometh
	 */
	private matchDirectionCometh(cometh: ComethType): Direction {
		return cometh.split("_")[0].toLowerCase() as Direction;
	}

	/**
	 * Fetches the goal map from the API for phase one
	 * @returns Promise containing the goal map data
	 * @throws Error if fetching the goal map fails
	 */
	private async getGoalMapPhase(): Promise<GoalMapPhaseOne | GoalMapPhaseTwo> {
		const url = `${this.apiBaseUrl}/map/${this.candidateId}/goal`;
		try {
			const response = await this.axiosInstance.get<
				GoalMapPhaseOne | GoalMapPhaseTwo
			>(url);
			return response.data;
		} catch (error) {
			throw new Error(`Error fetching goal map: ${error}`);
		}
	}

	/**
	 * Creates the phase one map from the goal map
	 * @param goal - The goal map for phase one
	 * @throws Error if creating the phase one map fails
	 */
	private async createPhaseOneMapFromGoal(
		goal: PlanetsPhaseOne[][],
	): Promise<void> {
		const rows = goal.length;
		const columns = goal[0].length;

		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < columns; c++) {
				const planet = goal[r][c];
				if (planet === "POLYANET") {
					try {
						const polyanet = new Polyanet({ row: r, column: c });
						await this.polyanetsAPI.createPolyanet(polyanet);
						await delay(1000); // Rate Limiting to avoid API throttling
					} catch (error) {
						throw new Error(`Error creating polyanet: ${error}`);
					}
				}
			}
		}
	}


    /**
     * Creates the phase two map from the goal map
     * @param goal - The goal map for phase two
     * @throws Error if creating the phase two map fails
     */
	private async createPhaseTwoMapFromGoal(
		goal: PlanetsPhaseTwo[][],
	): Promise<void> {
		const rows = goal.length;
		const columns = goal[0].length;
		const tasks: Promise<void>[] = [];

        // API THROTTLES AT 3 REQUESTS PER SECOND
		const limiter = new Bottleneck({
			maxConcurrent: 2,
			minTime: 1000,
		});

		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < columns; c++) {
				const planet = goal[r][c];
				if (planet === SPACE) continue;

				// Group similar operations together
				const task = limiter.schedule(async () => {
					try {
						if (this.isSoloon(planet)) {
							const color = this.matchColorSoloon(planet);
							const soloon = new Soloon({ row: r, column: c }, color);
							await this.soloonsAPI.createSoloons(soloon);
						} else if (this.isCometh(planet)) {
							const direction = this.matchDirectionCometh(planet);
							const cometh = new Cometh({ row: r, column: c }, direction);
							await this.comethAPI.createCometh(cometh);
						} else if (planet === POLYANET) {
							const polyanet = new Polyanet({ row: r, column: c });
							await this.polyanetsAPI.createPolyanet(polyanet);
						}
					} catch (error) {
						console.error(`Failed to create entity at (${r},${c}):`, error);
						throw error;
					}
				});

				tasks.push(task);
			}
		}

		try {
			await Promise.all(tasks);
		} catch (error) {
			console.error("Error processing remaining tasks:", error);
			throw error;
		}
	}
	/**
	 * Creates the desired map for phase one
	 * @throws Error if creating the desired map fails
	 */
	public async createDesiredMapPhaseOne(): Promise<void> {
		try {
			const { goal } = await this.getGoalMapPhase();
			await this.createPhaseOneMapFromGoal(goal as PlanetsPhaseOne[][]);
		} catch (error) {
			console.error("Failed to create desired map:", error);
			throw new Error(`Error creating desired map: ${error}`);
		}
	}

	/**
	 * Creates the desired map for phase two
	 * @throws Error if creating the desired map fails
	 */
	public async createDesiredMapPhaseTwo(): Promise<void> {
		try {
			const { goal } = await this.getGoalMapPhase();
			await this.createPhaseTwoMapFromGoal(goal as PlanetsPhaseTwo[][]);
		} catch (error) {
			console.error("Failed to create desired map:", error);
			throw new Error(`Error creating desired map: ${error}`);
		}
	}
}

export default MegaverseService;
