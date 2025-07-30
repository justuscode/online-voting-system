# Use Node.js image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Expose port used by the backend (adjust if not 5000)
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
