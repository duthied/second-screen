# Stage 1: Build the React application
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Accept build arguments for environment variables
ARG REACT_APP_WEATHER_API_KEY
ARG REACT_APP_LATITUDE
ARG REACT_APP_LONGITUDE

# Set environment variables for the build
ENV REACT_APP_WEATHER_API_KEY=$REACT_APP_WEATHER_API_KEY
ENV REACT_APP_LATITUDE=$REACT_APP_LATITUDE
ENV REACT_APP_LONGITUDE=$REACT_APP_LONGITUDE

# Build the application
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
