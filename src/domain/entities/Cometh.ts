import type { Coordinates, Direction } from "../../interfaces/interfaces";

export class Cometh {
    constructor(readonly coordinates: Coordinates, readonly direction: Direction) {
        if (coordinates.row < 0 || coordinates.column < 0) {
            throw new Error("Invalid coordinates");
        }
        if (direction !== "up" && direction !== "down" && direction !== "left" && direction !== "right") {
            throw new Error("Invalid direction");
        }
    }
    
}

