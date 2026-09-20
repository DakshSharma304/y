import express from "express";

const app = express();
const PORT = process.env.PORT || 3000; // 3000 is default, but check for PORT in env vars first

app.use(express.json()) // Parses incoming requests automatically for us

// Health Route
app.get("/api/health", (req, res) => {
    res.json({status: "success", message: "Backend running!"})
})

// Unknown Routes - Respond with 404
app.use((req, res) => {
    res.status(404)
})

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
})