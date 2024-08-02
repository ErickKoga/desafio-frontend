# Build stage
FROM node:22-alpine3.19 AS builder

# Define build-time arguments
ARG APP_PORT
ARG APP_QUOTESMOCK_URL
ARG APP_QUOTESMOCK_PORT

# Define environment variables based on the build-time arguments
ENV APP_PORT=${APP_PORT}
ENV APP_QUOTESMOCK_URL=${APP_QUOTESMOCK_URL}
ENV APP_QUOTESMOCK_PORT=${APP_QUOTESMOCK_PORT}

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build the project
RUN npm run build

# Production stage
FROM node:22-alpine3.19

# Define environment variables based on the build-time arguments
ARG APP_PORT
ENV APP_PORT=${APP_PORT}

WORKDIR /app

# Copy only the build artifacts from the builder stage
COPY --from=builder /app/dist ./dist

# Install serve globally
RUN npm install -g serve

# Expose the application port
EXPOSE ${APP_PORT}

# Start the server with the specified port
CMD ["sh", "-c", "serve -s dist -l $APP_PORT"]
