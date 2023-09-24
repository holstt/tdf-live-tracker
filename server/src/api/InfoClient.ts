import axios, { AxiosInstance } from "axios";
import { HttpConfig } from "../config/types";
import { HttpClient } from "./HttpClient";

export class InfoClient implements HttpClient {
    private client: AxiosInstance;
    private config: HttpConfig;

    constructor(config: HttpConfig) {
        this.config = config;
        this.client = axios.create({
            baseURL: config.baseUrl,
        });
    }

    async getRiders() {
        const response = await this.client.get(this.config.riderInfoEndpoint);
        // TODO: Convert to DTO type
        return response.data;
    }
}
