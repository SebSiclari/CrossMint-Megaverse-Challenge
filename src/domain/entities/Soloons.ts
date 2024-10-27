import type { Coordinates, Colors } from "../../interfaces/interfaces";

export class Soloon {
    constructor(readonly coordinates: Coordinates, readonly color: Colors) {
        if (coordinates.row < 0 || coordinates.column < 0) {
            throw new Error("Invalid coordinates");
        }
        if (color !== "blue" && color !== "red" && color !== "purple" && color !== "white") {
            throw new Error("Invalid color");
        }
    }
}
