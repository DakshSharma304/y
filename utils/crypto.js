import {randomBytes, scryptSync, timingSafeEqual} from "node:crypto"

export function hashPassword(plainPassword) {
    const salt = randomBytes(16).toString("hex"); // Random 16 byte hex string
    const hash = scryptSync(plainPassword, salt, 64).toString("hex"); // Scrypt is a specialized hashing function
    return `${salt}:${hash}`
}

export function verifyPassword(candidatePassword, storedCombinedHash) { // Tests to see whether the password in question (candidatePassword) matches our stored hash
    const [salt, storedHash] = storedCombinedHash.split(":")
    const storedHashBytes = Buffer.from(storedHash, "hex") // Converts human-readable hex hash back into bytes which computer can understand
    const candidateHashBytes = scryptSync(candidatePassword, salt, 64)
    return timingSafeEqual(storedHashBytes, candidateHashBytes) // timingSafeEqual is like ===, but it doesn't stop immediately when it finds a mismatch which protects against timing attacks 
}

export function generateSessionToken() {
    return randomBytes(32).toString("hex")
}