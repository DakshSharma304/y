import {Router} from "express"
import {hashPassword} from "../utils/crypto.js"

const router = Router()

// Temporary mock data storage (will be replaced with an actual database eventually)
const users = new Map()
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
    users.set(username, passwordHash)

    console.log(users) // Temporary debug print

    return res.status(201).json({status: "success", message: "User has been registered"})
})

export default router;