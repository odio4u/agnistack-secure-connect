# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Install bun
RUN apk add --no-cache curl bash && \
    curl -fsSL https://bun.sh/install | bash && \
    ln -s /root/.bun/bin/bun /usr/local/bin/bun

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or bun.lockb if using Bun)
COPY package.json bun.lockb ./

# Install dependencies (including devDependencies for vite)
RUN npm install || bun install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build || bun run build

# Expose port 4173 for Vite preview
EXPOSE 4173

# Start the app using Vite preview
CMD ["npm", "run", "preview"]
