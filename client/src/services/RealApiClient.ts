import axios, { AxiosInstance } from "axios";
import { LiveTrackData } from "../../../models/LiveTrackData";
import ApiClient from "./ApiClient";

export default class RealApiClient implements ApiClient {
    private client: AxiosInstance;

    constructor(baseURL: string) {
        // Internal client
        this.client = axios.create({
            baseURL,
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    // TODO: Ensure expected response type
    async fetchData(): Promise<LiveTrackData> {
        const response = await this.client.get("/data");
        return response.data;
    }
}
