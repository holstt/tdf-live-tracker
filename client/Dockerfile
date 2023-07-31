FROM node:18-alpine as build

WORKDIR /app

# Install dependencies
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json
RUN npm install

# Install and validate typescript installation
RUN npm i -g typescript
RUN tsc --version

# Copy source code
COPY . .

# Set build path
ENV BUILD_PATH=/internal_build_directory_do_not_mount

# Build project
RUN npm run build

# Copy build to mounted directory when container starts up
ENTRYPOINT echo "Copying build files from ${BUILD_PATH} to ${OUTPUT_DIR}" && cp -r /internal_build_directory_do_not_mount/* ${OUTPUT_DIR}/

