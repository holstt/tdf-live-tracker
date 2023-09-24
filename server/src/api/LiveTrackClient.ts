import EventSource from "eventsource";
import { DateTime } from "luxon";
import { SseConfig } from "../config/types";
import SseClient from "./SseClient";

export default class LiveTrackClient implements SseClient {
    private stream: EventSource;
    private lastProcessedEventAt: DateTime;
    private config: SseConfig;
    private onNewData: (data: any) => void;

    constructor(config: SseConfig, onNewData: (data: any) => void) {
        this.config = config;
        this.stream = new EventSource(config.baseUrl);
        this.lastProcessedEventAt = DateTime.fromMillis(0);
        this.onNewData = onNewData;
    }

    // Starts listening to the event stream
    // Stream starts emitting new events when the race starts
    // New events are recieved until approx. 5 minutes after the last rider has finished(?). Afterwards, we may still receive events, but event timestamp/data is unchanged.
    public startListening(): void {
        const shouldProcessEvent = (now: DateTime): boolean => {
            const timeSinceLastProcessedEvent = now.diff(
                this.lastProcessedEventAt
            );
            return timeSinceLastProcessedEvent > this.config.updateFrequency;
        };

        const isTargetEvent = (eventData: any): boolean => {
            const eventIdentifier = eventData.bind.toLowerCase();
            return eventIdentifier.startsWith(
                this.config.eventMessageIdentifier
            );
        };

        this.stream.addEventListener(
            this.config.eventType,
            (event: MessageEvent) => {
                const now = DateTime.now();

                if (!shouldProcessEvent(now)) {
                    return;
                }

                // Raw parse of event data
                const data = JSON.parse(event.data);

                if (isTargetEvent(data)) {
                    this.lastProcessedEventAt = now;
                    // TODO: Convert to DTO type

                    // Notify listener
                    this.onNewData(data);
                }
            }
        );
        console.debug(
            `Started listening to event stream at ${this.config.baseUrl}`
        );
    }

    public stopListening(): void {
        this.stream.close();
    }
}
