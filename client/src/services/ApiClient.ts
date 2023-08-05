import { LiveTrackData } from "../../../models/LiveTrackData";

export default interface ApiClient {
    fetchData(): Promise<LiveTrackData>;
}
