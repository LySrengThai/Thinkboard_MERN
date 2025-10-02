// Import the axios HTTP client library
import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

// Create an axios instance with a pre-configured base URL
const api = axios.create({
    baseURL: BASE_URL,  // All requests will use this base URL
});

// Export the configured axios instance so it can be reused across the project
export default api;