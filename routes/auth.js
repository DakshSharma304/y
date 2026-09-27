import {Router} from "express"
import {generateSessionToken, hashPassword, verifyPassword} from "../utils/crypto.js"
import {db} from "../config/db.js"

const router = Router()

// Middleware function that protects the routes by validating the session token first
const SESSION_TOKEN_EXPIRATION_MS = 30 * 24 * 60 * 60 * 1000 // 30 days converted to milliseconds

export async function requireAuth(req, res, next) {
    try { // Catch and then throw another error, because we don't want to accidentally leak any secret SQL data or anything

        // Get & make sure authHeader exists
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({error: "Unauthorized - missing authorization header"})
        }

        // Get & validate token
        const token = authHeader.split(" ")[1] // authHeader format is "Bearer <Token>" so we are splitting it by the space
        if (!token) {
            return res.status(401).json({error: "Unauthorized - missing session token"})
        }

        // --- Request for the session from DB ---
        const sessionReqResult = await db.execute({
            sql: "SELECT token, user_id, created_at FROM sessions WHERE token = ?",
            args: [token]
        })

        if (sessionReqResult.rows.length === 0) {
            return res.status(401).json({error: "Unauthorized - invalid session token"})
        }

        const session = sessionReqResult.rows[0]

        // Check if session expired
        if (Date.now() - session.created_at > SESSION_TOKEN_EXPIRATION_MS) {
            // Delete token from DB if expired
            await db.execute({
                sql: "DELETE FROM sessions WHERE token = ?",
                args: [token]
            })
            return res.status(401).json({error: "Unauthorized - session expired"})
        }

        // --- Request user data of this session ---
        const userReqResult = await db.execute({
            sql: "SELECT id, username, created_at FROM users WHERE id = ?",
            args: [session.user_id]
        })

        if (userReqResult.rows.length === 0) {
            return res.status(401).json({error: "Unauthorized - user no longer exists"})
        }

        const user = userReqResult.rows[0]

        // Pass on values to request
        req.user = user
        req.session = session // So the request knows who the user is
        req.token = token
        
        next()

    } catch (e) {
        console.error("requireAuth middleware error: " + e)
        return res.status(500).json({error: "Authentication failed due to internal server error"})
    }
}

// POST /api/register
router.post("/register", async (req, res) => {
    try {
        let {username, password} = req.body

        username = username?.trim() // "Clean" the username; prevents blank usernames

        // Validation & Error Handling
        if (!username || !password) {
            return res.status(400).json({error: "Both a valid username and password are required"})
        }

        // --- Make sure username isn't taken already ---
        const usernameQueryResult = await db.execute({
            sql: "SELECT id FROM users WHERE username = ?",
            args: [username]
        })

        if (usernameQueryResult.rows.length > 0) {
            return res.status(400).json({error: "Username already exists"})
        }
        
        // Store username & password
        const passwordHash = hashPassword(password)
        const createdAt = Date.now();

        await db.execute({
            sql: "INSERT INTO users (username, password_hash, created_at) VALUES (?, ?, ?)",
            args: [username, passwordHash, createdAt]
        })

        return res.status(201).json({message: "User has been successfully registered"})

    } catch (e) {
        console.error("Registration error: " + e)
        return res.status(500).json({error: "Registration failed due to a server error"})
    }
})

// POST /api/login
router.post("/login", async (req, res) => {
    try {
        let {username, password} = req.body

        username = username?.trim() // "Clean" the username; prevents accidental spaces from interfering with login
    
        // Make sure both username and password has been given
        if (!username || !password) {
            return res.status(400).json({error: "Both username and password are required"})
        }

        // --- Request credentials by username ---
        const credentialsReqResult = await db.execute({
            sql: "SELECT id, username, password_hash FROM users WHERE username = ?",
            args: [username]
        })

        if (credentialsReqResult.rows.length === 0) {
            return res.status(401).json({error: "Invalid username or password"})
        }

        const user = credentialsReqResult.rows[0]

        // Test the plain password against the hash
        if (!verifyPassword(password, user.password_hash)) {
            return res.status(401).json({error: "Invalid Username or Password"})
        }

        // Generate and store session token
        const token = generateSessionToken()
        const createdAt = Date.now()

        await db.execute({
            sql: "INSERT INTO sessions (token, user_id, created_at) VALUES (?, ?, ?)",
            args: [token, user.id, createdAt]
        })

        return res.json({message: "Login successful", token})

    } catch (e) {
        console.error("Login error: " + e)
        return res.status(500).json({error: "Login failed due to a server error"})
    }
})

// POST /api/logout
router.post("/logout", requireAuth, async (req, res) => {
    try {
        await db.execute({
            sql: "DELETE FROM sessions WHERE token = ?",
            args: [req.token]
        })

        return res.json({message: "Logged out successfully"})

    } catch (e) {
        console.error("Logout error: " + e)
        return res.status(500).json({error: "Log out failed due to a server error"})
    }
})

// GET /api/session - tests and returns the user's session
router.get("/session", requireAuth, (req, res) => {
    return res.json({message: "Session is valid", user: req.user, session: req.session})
})

export default router