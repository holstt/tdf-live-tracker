import { Rider } from "./Rider";

export interface Group {
    id: number;
    name: string;
    riders: Rider[];
    completedDistance: number;
    remainingDistance: number;
    size: number;
    secondsToPrevGroup: number | null;
    secondsToFront: number | null;
}
