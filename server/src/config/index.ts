import { Duration } from "luxon";
import { Config } from "./types";

// XXX: Move to yml?

export const CONFIG: Config = {
    defaultPort: 3002,
    api: {
        sse: {
            baseUrl: "https://racecenter.letour.fr/live-stream",
            // How often to receive new data (in milliseconds) from event stream. Events received more frequently than this will be ignored.
            updateFrequency: Duration.fromMillis(10_000),
            eventType: "update",
            eventMessageIdentifier: "pack",
        },
        http: {
            baseUrl: "https://racecenter.letour.fr/api",
            riderInfoEndpoint: "/allCompetitors-2023", // TODO: Dynamic year
        },
    },
};
