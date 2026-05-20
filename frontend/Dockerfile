FROM node:20-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies including new ones like lucide-react
RUN npm install

# Copy the rest of the application
COPY . .

EXPOSE 3000

# Start with host flag to allow access from outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
