import express from "express";
import authRouter from "./routes/auth.js"

const app = express();
const PORT = process.env.PORT || 3000; // 3000 is default, but check for PORT in env vars first

app.use(express.json()) // Parses incoming requests automatically for us
app.use(express.static("public")) // Serves files in public/

// GET /api/health
app.get("/api/health", (req, res) => {
    res.json({message: "Backend running!"})
})

// Hook up routers
app.use("/api", authRouter)

// 404 Known Routes
app.use((req, res) => {
    res.status(404).json({error: "Route not found"})
})

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
})