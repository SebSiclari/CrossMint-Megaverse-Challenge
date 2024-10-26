export interface Config {
    candidateId: string;
    apiBaseUrl: string;
  }

export interface Coordinates {
    row: number;
    column: number;
}

export type Colors = "blue" | "red" | "purple" | "white";

export type Direction = "up" | "down" | "left" | "right";