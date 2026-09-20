import {Router} from "express"
import {generateSessionToken, hashPassword, verifyPassword} from "../utils/crypto.js"

const router = Router()

// Temporary mock data storage (will be replaced with an actual database eventually)
const users = new Map() // Stores key-value pairs (key: username, value: user object, containing username and passwordHash)
const sessions = new Map()

// Middleware function that protects the routes by validating the session token first
const SESSION_TOKEN_EXPIRATION_MS = 30 * 24 * 60 * 60 * 1000 // 30 days converted to milliseconds

export function requireAuth(req, res, next) {
    // Get & make sure authHeader exists
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({error: "Unauthorized - missing authorization header"})
    }

    // Get & validate token
    const token = authHeader.split(" ")[1]; // authHeader format is "Bearer <Token>" so we are splitting it by the space
    if (!token || !sessions.has(token)) {
        return res.status(401).json({error: "Unauthorized - missing or invalid session token"})
    }

    // Pass on values to request
    req.session = sessions.get(token); // So the request knows who the user is
    req.token = token

    // Check if session expired
    if (Date.now() - req.session.createdAt > SESSION_TOKEN_EXPIRATION_MS) {
        sessions.delete(token);
        return res.status(401).json({error: "Unauthorized - session expired"})
    }
    
    next();
}

// POST /api/register
router.post("/register", (req, res) => {
    const {username, password} = req.body

    // Validation & Error Handling
    if (!username || !password) {
        return res.status(400).json({error: "Both username and password are required"})
    }

    if (users.has(username)) {
        return res.status(400).json({error: "Username already exists"})
    }

    // Store username & password
    const passwordHash = hashPassword(password)
    users.set(username, {username, passwordHash})

    console.log(users) // Temporary debug print

    return res.status(201).json({message: "User has been successfully registered"})
})

// POST /api/login
router.post("/login", (req, res) => {
    const {username, password} = req.body
    
    // Make sure both username and password has been given
    if (!username || !password) {
        return res.status(400).json({error: "Both username and password are required"})
    }

    const user = users.get(username)

    // Check to see whether username exists and password is correct
    if (!user || !verifyPassword(password, user.passwordHash)) {
        return res.status(401).json({error: "Unauthorized - invalid username or password"})
    }

    // Generate and store session token
    const token = generateSessionToken()
    sessions.set(token, {username: user.username, createdAt: Date.now()})

    console.log(sessions) // Temporary debug print

    return res.json({message: "Login successful", token})
})

// POST /api/logout
router.post("/logout", requireAuth, (req, res) => {
    sessions.delete(req.token)
    return res.json({message: "Logged out successfully"})
})

// GET /api/test-session-token
router.get("/test-session-token", requireAuth, (req, res) => {
    return res.json({message: "Session is valid", user: req.user})
})

export default router;