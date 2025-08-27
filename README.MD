YaYa Wallet Dashboard
Overview
This project is a full-stack coding test solution for YaYa Wallet, implementing a secure transaction dashboard with search functionality, pagination, and a responsive user interface. It is built using React with Vite, TypeScript for the frontend, and Node.js with TypeScript for the backend. The solution includes an API client, robust error handling, and a clean, modular architecture.
About
The dashboard allows users to monitor transactions with features like:

Paginated transaction lists with query parameters (p for page, per_page for items).
Search capability by sender, receiver, cause, or ID.
Visual indicators for incoming (green) and outgoing (red) transactions, with top-ups as incoming.
Responsive design using Tailwind CSS, adaptable to various screen sizes.
Secure API credential management via environment variables.

Deployment

Frontend: Deployed on Vercel at https://yaya-wallet-dashboard.vercel.app/. Built with React, Vite, and TypeScript for a fast, modern development experience.
Backend: Deployed on Render at https://wallet-dashboard-ltjf.onrender.com. Built with Node.js, Express.js, and TypeScript, serving as a proxy to YaYa Wallet's API.

Repository

GitHub: https://github.com/henokworkuliyew/wallet-dashboard.git


Features

Frontend: React with Vite, React Router, Axios, and Tailwind CSS for a responsive UI.
Backend: Express.js with middleware for security, error handling, and API authentication via HMAC-SHA256 signatures.
Integration: Seamless communication between frontend and backend, proxying requests to YaYa Wallet's API.

Installation and Setup
For detailed instructions, refer to the README files in each subdirectory:

Frontend README: Covers setup, dependencies (Vite, React, TypeScript), and running the development server.
Backend README: Covers setup, environment variables, and API configuration.

High-level steps:

Clone the repository: git clone https://github.com/henokworkuliyew/wallet-dashboard.git
Navigate to frontend/ and install dependencies: npm install
Navigate to backend/ and install dependencies: npm install
Create .env files in both directories with required variables (e.g., API keys, ports).
Run backend: npm run dev (in backend folder)
Run frontend: npm run dev (in frontend folder)

Usage

Access the live dashboard at https://yaya-wallet-dashboard.vercel.app/.
Navigate to the transaction history page to view paginated lists.
Use the search bar to filter transactions.
For local testing, use backend endpoints like http://localhost:5000/api/transactions?p=1&per_page=10.

Testing

Frontend: Test pagination and search via the browser interface.
Backend: Use Postman or cURL to test API endpoints; check logs for errors.
Detailed testing guides are in the respective READMEs.

Contributing

Fork the repo and create a pull request.
Follow code style with ESLint and Prettier.
Add tests for new features (pending implementation).

