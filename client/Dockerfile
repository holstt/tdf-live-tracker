FROM node:18-alpine as build

WORKDIR /app/client

# Install dependencies
COPY ./client/package.json package.json
COPY ./client/package-lock.json package-lock.json
COPY ./client/tsconfig.json tsconfig.json
RUN npm install

# Install and validate typescript installation
RUN npm i -g typescript
RUN tsc --version

# Copy source code
COPY ./client .

# Copy shared models
COPY ./models /app/models

# Set internal build path
ENV BUILD_PATH=/internal_build_directory_do_not_mount

# Get and set build environment variables
ARG API_BASE_URL
ENV API_BASE_URL=${API_BASE_URL}

# Build app (on build time)
RUN npm run build

# On run time: Copy build to mounted directory when container starts up
ENTRYPOINT echo "Copying build files from ${BUILD_PATH} to ${OUTPUT_DIR}" && cp -r /internal_build_directory_do_not_mount/* ${OUTPUT_DIR}/

