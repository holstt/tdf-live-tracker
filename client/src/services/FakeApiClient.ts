import { LiveTrackData } from "../../../models/LiveTrackData";
import endpointData from "../data/data-endpoint.json";
import ApiClient from "./ApiClient";

// Returns demo data
export default class FakeApiClient implements ApiClient {
    constructor() {
        console.warn("*** Using fake API - for testing only ***");
    }

    async fetchData(): Promise<LiveTrackData> {
        return new Promise((resolve) => {
            resolve(endpointData);
        });
    }
}
