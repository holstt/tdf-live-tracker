export default interface SseClient {
    startListening(): void;
    stopListening(): void;
}
