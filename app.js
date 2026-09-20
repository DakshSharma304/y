import { createServer } from "node:http" // Going to use a import (newer) instead of require

const PORT = process.env.PORT || 3000; // 3000 is default, but check for PORT in env vars first

const server = createServer(async (request, response) => {
    try {
        const {method, url} = request;
        
        // Health Endpoint - a test endpoint to see if backend is running
        if (method === "GET" && url === "/api/health") {
            response.writeHead(200, {"Content-Type": "application/json"})
            return response.end(JSON.stringify({status: "success", message: "Backend running!"}))
        }

        // Unknown Routes - Default to 404
        response.writeHead(404, {"Content-Type": "application/json"})
        return response.end(JSON.stringify({ error: "Route not found" }))
        
    } catch (err) {
        console.log(err)
        
        response.writeHead(400, {"Content-Type": "application/json"})
        return response.end(JSON.stringify({error: "Bad request/Invalid JSON"}))
    }
})

server.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`)
})