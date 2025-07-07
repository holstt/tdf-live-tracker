FROM node:22-alpine as build

WORKDIR /app/server

# Install dependencies
COPY ./server/package.json package.json
COPY ./server/package-lock.json package-lock.json
COPY ./server/tsconfig.json tsconfig.json
RUN npm install


# Install and validate typescript installation
RUN npm i -g typescript
RUN tsc --version

# Copy source code
COPY ./server .

# Copy shared models
COPY ./models /app/models

ENTRYPOINT npm run start