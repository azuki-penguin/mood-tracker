import type { Coordinates } from "./Coordinates";

export interface Weather {
    id: number;
    weather: string;
    description?: string;
    iconUrl?: string;
    temperature: number;
    pressure: number;
    humidity: number;
    clouds?: number;
    location: {
        coord: Coordinates;
    };
}