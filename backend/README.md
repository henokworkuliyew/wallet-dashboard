YaYa Wallet Dashboard Backend
Overview
This backend is a TypeScript-based REST API service built with Express.js to support the YaYa Wallet Dashboard. It provides endpoints to fetch and search transactions, implementing pagination, security, and error handling. The solution aligns with the coding test requirements provided by YaYa Wallet.
Assumptions

The API credentials (API Key and API Secret) are stored in environment variables for security, loaded via the dotenv package.
The sandbox environment (https://sandbox.yayawallet.com) is used for development, with a switch to production (https://yayawallet.com) based on the YAYA_ENV variable.
Transactions are fetched from the YaYa Wallet API, and the backend handles pagination with p and per_page query parameters.
Outgoing/incoming transaction status is determined by comparing the receiver with the current user (assumed to be implicit in the API response context).
No user management is implemented as per the test instructions.

Problem-Solving Approach

Structure: The project uses a modular structure with separate files for configuration, middleware, routes, services, and types to ensure maintainability.
Security: API credentials are managed via environment variables, and CORS is configured to allow only the frontend URL. The applySecurity middleware applies cors and express.json() for basic protection.
Authentication: The generateSignature function creates HMAC-SHA256 signatures using the API Secret, adhering to YaYa Wallet's authentication guide (assumed to require timestamp-based signing).
Pagination: Implemented using p (page number) and per_page query parameters, with server-side slicing of transaction data.
Error Handling: A custom errorHandler middleware logs errors and returns appropriate HTTP status codes.

Installation

Clone the repository.
Install dependencies: npm install.
Create a .env file in the root directory with the following:YAYA_API_KEY=your_api_key
YAYA_API_SECRET=your_api_secret
YAYA_ENV=sandbox
PORT=5000


Run the development server: npm run dev.
Build for production: npm run build followed by npm start.

Testing

Test the /api/transactions endpoint with a GET request (e.g., http://localhost:5000/api/transactions?p=1&per_page=10) to fetch paginated transactions.
Test the /api/search endpoint with a POST request (e.g., http://localhost:5000/api/search?q=abebe) to search transactions.
Use tools like Postman or cURL to verify responses, ensuring pagination and search functionality work as expected.
Check logs in the terminal for debugging (e.g., signature generation, API errors).

API Endpoints

GET /api/transactions: Fetches a paginated list of transactions for the current user.
Query Parameters: p (page number), per_page (items per page).
Response: JSON with data, current_page, last_page, per_page, and total.


POST /api/search: Searches transactions by query (e.g., sender, receiver, cause, or ID).
Body: { "query": "search_term" }.
Response: JSON with paginated search results.



Security Considerations

API credentials are stored in .env and excluded from version control (via .gitignore).
CORS is restricted to the frontend URL (https://yaya-wallet-dashboard.vercel.app or environment variable).
Request timeouts (10 seconds) are set to prevent hanging API calls.
Error details are logged but not exposed to clients to prevent information leakage.

Future Improvements

Add rate limiting with express-rate-limit for production use.
Implement caching (e.g., Redis) to reduce API call frequency.
Enhance security with HTTPS and additional middleware (e.g., Helmet).
Adapt table rendering logic for responsive design (to be handled by the frontend).

Repository
This README is part of the backend solution submitted for the YaYa Wallet Coding Test. The full code is available in the GitHub repository here.