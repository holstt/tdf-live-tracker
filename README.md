# tdf-live-tracker

Follow the real-time progression of every Tour de France stage.

<img src="docs/screenshot.png" width=50%>

## Features:

-   Real-time SPA frontend updating every 5 seconds
-   Track groups and their time gap to the race lead
-   Filter riders by nationality and team name
-   Monitor the remaining distance of the stage
-   Easy deployment with Docker Compose

**TODO:**

-   [ ] Notification at key points in the race e.g. when there's X km left of the stage to watch the final sprint or at the beginning of crucial climbs
-   [ ] Detailed stage profiles with current positions of riders/groups.

## Tech Stack

-   Frontend: React
-   Backend: Node.js
-   Language: Typescript
-   CI/CD: Github Actions
-   Deployment: Docker + Docker Compose

## Local Installation (development only) 💻

The project is separated into a `./client` and a `./server` directory. The following commands should be run for both projects in their respective directories.

```
npm install
npm start
```

Now the client and server will be accessible on a local host port specified in the console output.

## Docker 🐳

First, set the `API_BASE_URL` environment variable to the public base URL from which you serve the backend e.g. `https://api.example.com`.

Then run the docker compose project:

```
docker compose up
```

The dockerfile of the `build-client` container will build the static client files. At runtime, the container will copy these build files to the mounted directory `./client/build` and then exit. As such, your webserver should be configured to serve this directory. The react app assumes that files are served from the endpoint `/tdf`.

The `server` container will run the backend API service. Your webserver should be configured to proxy requests to this container.
