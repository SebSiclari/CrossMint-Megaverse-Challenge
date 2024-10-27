import type { Coordinates } from "../../interfaces/interfaces";

export class Polyanet {
    constructor(readonly coordinates: Coordinates) {
        if (coordinates.row < 0 || coordinates.column < 0) {
            throw new Error("Invalid coordinates");
        }
    }
}
