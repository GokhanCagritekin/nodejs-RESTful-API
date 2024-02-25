# Use the official Node.js image as base
FROM node:15

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code to container
COPY . .

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "src/app.js"]
