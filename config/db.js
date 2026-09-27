import {createClient} from "@libsql/client";
import "dotenv/config"

const dbURL = process.env.TURSO_DATABASE_URL
const dbToken = process.env.TURSO_AUTH_TOKEN

if (!dbURL || !dbToken) {
    console.error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in environment variables")
    process.exit(1)
}

export const db = createClient({
    url: dbURL,
    authToken: dbToken
})