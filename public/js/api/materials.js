import { getToken } from "./auth.js"

// POST /api/materials
export async function uploadMaterials(formData) {
    const token = getToken()

    if (!token) return {ok: false, error: "Not logged in - authentication required"}

    const res = await fetch("/api/materials", { // Note: Content-Type is not set on purpose (bc we are using FormData)
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    })

    return {ok: res.ok, ...await res.json()}
}