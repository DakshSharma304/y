import {randomBytes, scryptSync, timingSafeEqual} from "node:crypto"

export function hashPassword(plainPassword) {
    const salt = randomBytes(16).toString("hex"); // Random 16 byte hex string
    const hash = scryptSync(plainPassword, salt, 64).toString("hex"); // Scrypt is a specialized hashing function
    return `${salt}:${hash}`
}