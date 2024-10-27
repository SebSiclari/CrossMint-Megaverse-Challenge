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
const PolyanetsAPI_1 = __importDefault(require("../api/PolyanetsAPI"));
const SoloonsAPI_1 = __importDefault(require("../api/SoloonsAPI"));
const ComethAPI_1 = __importDefault(require("../api/ComethAPI"));
const config_1 = __importDefault(require("../config/config"));
const axios_instance_1 = __importDefault(require("../http/axios-instance"));
const bottleneck_1 = __importDefault(require("bottleneck"));
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
class MegaverseService {
    constructor() {
        this.apiBaseUrl = config_1.default.apiBaseUrl;
        this.candidateId = config_1.default.candidateId;
        this.axiosInstance = axios_instance_1.default;
        this.polyanetsAPI = new PolyanetsAPI_1.default();
        this.soloonsAPI = new SoloonsAPI_1.default();
        this.comethAPI = new ComethAPI_1.default();
    }
    /**
     * Checks if a planet is a soloon
     * @param planet - The planet to check
     * @returns True if the planet is a soloon, false otherwise
     */
    isSoloon(planet) {
        return planet.endsWith("_SOLOON");
    }
    /**
     * Checks if a planet is a cometh
     * @param planet - The planet to check
     * @returns True if the planet is a cometh, false otherwise
     */
    isCometh(planet) {
        return planet.endsWith("_COMETH");
    }
    /**
     * Matches the color of a soloon
     * @param soloon - The soloon to match
     * @returns The color of the soloon
     */
    matchColorSoloon(soloon) {
        return soloon.split("_")[0].toLowerCase();
    }
    /**
     * Matches the direction of a cometh
     * @param cometh - The cometh to match
     * @returns The direction of the cometh
     */
    matchDirectionCometh(cometh) {
        return cometh.split("_")[0].toLowerCase();
    }
    /**
   * Fetches the goal map from the API for phase one
   * @returns Promise containing the goal map data
   * @throws Error if fetching the goal map fails
   */
    getGoalMapPhase() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.apiBaseUrl}/map/${this.candidateId}/goal`;
            try {
                const response = yield this.axiosInstance.get(url);
                return response.data;
            }
            catch (error) {
                throw new Error(`Error fetching goal map: ${error}`);
            }
        });
    }
    /**
     * Creates the phase one map from the goal map
     * @param goal - The goal map for phase one
     * @throws Error if creating the phase one map fails
     */
    createPhaseOneMapFromGoal(goal) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = goal.length;
            const columns = goal[0].length;
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < columns; c++) {
                    const planet = goal[r][c];
                    if (planet === "POLYANET") {
                        try {
                            yield this.polyanetsAPI.createPolyanet({ row: r, column: c });
                            yield delay(1000); // Rate Limiting to avoid API throttling 
                        }
                        catch (error) {
                            throw new Error(`Error creating polyanet: ${error}`);
                        }
                    }
                }
            }
        });
    }
    createPhaseTwoMapFromGoal(goal) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = goal.length;
            const columns = goal[0].length;
            const tasks = [];
            const limiter = new bottleneck_1.default({
                maxConcurrent: 2,
                minTime: 1000
            });
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < columns; c++) {
                    const planet = goal[r][c];
                    if (planet === "SPACE")
                        continue;
                    // Group similar operations together
                    const task = limiter.schedule(() => __awaiter(this, void 0, void 0, function* () {
                        try {
                            if (this.isSoloon(planet)) {
                                const color = this.matchColorSoloon(planet);
                                yield this.soloonsAPI.createSoloons({ row: r, column: c }, color);
                            }
                            else if (this.isCometh(planet)) {
                                const direction = this.matchDirectionCometh(planet);
                                yield this.comethAPI.createCometh({ row: r, column: c }, direction);
                            }
                            else if (planet === "POLYANET") {
                                yield this.polyanetsAPI.createPolyanet({ row: r, column: c });
                            }
                        }
                        catch (error) {
                            console.error(`Failed to create entity at (${r},${c}):`, error);
                            throw error;
                        }
                    }));
                    tasks.push(task);
                }
            }
            // Process any remaining tasks
            try {
                yield Promise.all(tasks);
            }
            catch (error) {
                console.error('Error processing remaining tasks:', error);
                throw error;
            }
        });
    }
    /**
     * Creates the desired map for phase one
     * @throws Error if creating the desired map fails
     */
    createDesiredMapPhaseOne() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { goal } = yield this.getGoalMapPhase();
                yield this.createPhaseOneMapFromGoal(goal);
            }
            catch (error) {
                console.error('Failed to create desired map:', error);
                throw new Error(`Error creating desired map: ${error}`);
            }
        });
    }
    /**
     * Creates the desired map for phase two
     * @throws Error if creating the desired map fails
     */
    createDesiredMapPhaseTwo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { goal } = yield this.getGoalMapPhase();
                yield this.createPhaseTwoMapFromGoal(goal);
            }
            catch (error) {
                console.error('Failed to create desired map:', error);
                throw new Error(`Error creating desired map: ${error}`);
            }
        });
    }
}
exports.default = MegaverseService;
