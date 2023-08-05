import React, { useEffect, useState } from "react";
import { LiveTrackData } from "../../models/LiveTrackData";
import ApiClient from "./services/ApiClient";
import FakeApiClient from "./services/FakeApiClient";
import RealApiClient from "./services/RealApiClient";

function App() {
    const [data, setData] = useState<LiveTrackData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let apiClient: ApiClient;

        if (process.env.REACT_APP_USE_FAKE_API) {
            apiClient = new FakeApiClient();
        } else {
            console.log("Using real API");
            const apiBaseUrl =
                process.env.API_BASE_URL || "http://localhost:3002";
            apiClient = new RealApiClient(apiBaseUrl);
        }

        (async () => {
            try {
                const data = await apiClient.fetchData();
                setData(data);
            } catch (err: any) {
                setError(err.message);
                console.error("Failed to fetch data:", err.message);
            }
        })();
    }, []);

    return (
        <div className="App" style={{ textAlign: "center" }}>
            <h1 style={{ color: "#444" }}>TDF Live Tracker</h1>

            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : data ? (
                <pre>{data && JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default App;
