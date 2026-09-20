import {Router} from "express"
import {hashPassword, verifyPassword} from "../utils/crypto.js"

const router = Router()

// Temporary mock data storage (will be replaced with an actual database eventually)
const users = new Map() // Stores key-value pairs (key: username, value: user object, containing username and passwordHash)
const sessions = new Map()

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

    // TODO: Implement session key system

    return res.json({message: "Login successful"})
})

export default router;