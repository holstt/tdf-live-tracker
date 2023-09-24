import { InfoClient } from "./src/api/InfoClient";
import LiveTrackClient from "./src/api/LiveTrackClient";
import { CONFIG } from "./src/config";

async function main() {
    console.log(`Running in ${process.env.NODE_ENV} mode`);
    // Init dependencies
    const infoClient = new InfoClient(CONFIG.api.http);
    const liveTrackClient = new LiveTrackClient(CONFIG.api.sse, (data) =>
        console.log(data)
    );

    // Test API
    liveTrackClient.startListening();
    const data = await infoClient.getRiders();
    console.log(data);

    // Block main thread
    await new Promise((resolve) => setTimeout(resolve, 100000));
}

main();
