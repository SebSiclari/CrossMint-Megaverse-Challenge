import type { AxiosInstance } from "axios";

export interface Config {
    candidateId: string;
    apiBaseUrl: string;
  }

export interface Coordinates {
    row: number;
    column: number;
}

export interface ServiceConfig extends Config {
    axiosInstance: AxiosInstance;
}

export type Colors = "blue" | "red" | "purple" | "white";

export type Direction = "up" | "down" | "left" | "right";