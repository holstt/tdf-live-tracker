import { Duration } from "luxon";

// Config for the Server Sent Events (SSE) API.
export interface SseConfig {
    baseUrl: string;
    // How often to receive new data (in milliseconds) from event stream. Events received more frequently than this will be ignored.
    updateFrequency: Duration;

    // Config that determine the emitted event that contains the rider live tracking data.
    eventType: string;
    eventMessageIdentifier: string;

    // eventTypes: {
    //     riderInfo: string;
    // }
}

// Config for regular HTTP API.
export interface HttpConfig {
    baseUrl: string;
    riderInfoEndpoint: string;
}

export interface ApiConfig {
    sse: SseConfig;
    http: HttpConfig;
}

export interface Config {
    defaultPort: number;
    api: ApiConfig;

    // Other APIs can be added here.
    // VUELTA: ApiConfig; etc...
}
