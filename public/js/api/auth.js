const TOKEN_KEY = "sessionToken"

export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
    localStorage.removeItem(TOKEN_KEY)
}

function combineDataWithOK(data, ok) { // Combine response data with response 'ok' value
    return {ok, ...data}
}

// POST /api/register
export async function register(username, password) {
    const res = await fetch("/api/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    })

    return combineDataWithOK(await res.json(), res.ok)
}

// POST /api/login
export async function login(username, password) {
    const res = await fetch("/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    })
    const data = await res.json()

    // Make sure successful and session token was given
    if (res.ok && data.token) {
        setToken(data.token)
    }

    return combineDataWithOK(data, res.ok)
}

// GET /api/session
export async function getSession() {
    const token = getToken()
    if (!token) return {ok: false, error: "Client error: no session token stored (not logged in)"}

    const res = await fetch("/api/session", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return combineDataWithOK(await res.json(), res.ok)
}

// POST /api/logout
export async function logout() {
    const token = getToken()
    if (!token) return {ok: true, message: "Already logged out (client)"}

    const res = await fetch("/api/logout", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    clearToken()

    return combineDataWithOK(await res.json(), res.ok)
}