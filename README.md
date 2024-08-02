
# Desafio Frontend
This is an assessment project for Toro Investimentos, for the role of frontend developer. This project aims to create a frontend system that displays real-time stock prices received through a WebSocket connection, presented in an organized and visually appealing manner.
## Project Overview
The application displays the stocks in cards, showing the stock symbol, current price, and a chart illustrating the price evolution. The stock quotes are received from a mock server accessible via Docker.
## Features
-   Real-time stock price updates
-   Stock ordering possible through the UI
-   Responsive design (desktop and mobile)
-   Automated tests
## Technologies Used
-   JavaScript/TypeScript
-   React
-   Tailwind CSS
-   Zustand (State Management)
-   Vite
-   Vitest (Testing)
-   Docker
## Getting Started
### Prerequisites
-   Node.js (version 20.x or later)
-   Docker and Docker Compose
-   Git
### Installation
1.  **Clone the repository**
`git clone https://github.com/erickkoga/desafio-frontend.git`
2. **Install dependencies**
Ensure you have Node.js installed, then run:
`npm install`
3. **Environment Configuration**
Create a `.env` file based on the provided example `.env.example` file.
### Running the Application
#### Locally
1.  **Start the Quotesmock container**
`docker compose up quotesmock -d`
2. **Start the Development Server**
`npm run dev`
The client will be available at the specified APP_PORT in the environment variables.
#### Using Docker
1. **Run the following line to start both the Quotesmock and the Client:**
`docker compose up`
The client will be available at the specified APP_PORT in the environment variables.
### Running Tests
Execute the following command to run the automated tests:
`npm run test`
## Project Structure
-   `src/assets`: Contains images and fonts used in rendering the client.
-   `src/components`: Contains React components for the UI.
-   `src/models`: Defines TypeScript models and enums used in the application.
-  `src/pages`: Contains the pages to be rendered.
 -  `src/services`: Provides a service for handling incoming WebSocket information.
-   `src/stores`: Manages state using Zustand.
-   `src/utils`: Utility functions.
## Important Notes
-   **State Management**: The application uses Zustand for efficient state management and handling real-time data from WebSocket.
-   **Responsiveness**: The design is responsive, accommodating both desktop and mobile views as per the Figma designs.
## Bonus Features
-   **Docker Compose Support**: Enables easy setup and execution using Docker Compose.
-   **CI/CD Integration**: Use CI/CD for automated testing.

