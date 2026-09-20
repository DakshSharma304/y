import { getToken, login } from "./api/auth.js"

const REDIRECT_PAGE = "index.html"

if (getToken()) {
    window.location.href = REDIRECT_PAGE // Redirects user to home page if they are already logged in
}

const loginForm = document.querySelector("#login-form")
const usernameInput = document.querySelector("#username")
const passwordInput = document.querySelector("#password")
const loginButton = document.querySelector("#login-button")
const errorDisplay = document.querySelector("#error-message")

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault() // Don't reload page (we have more to do)

    errorDisplay.textContent = ""
    const username = usernameInput.value.trim()
    const password = passwordInput.value

    loginButton.disabled = true // So the user can't spam

    try {
        const result = await login(username, password)

        if (!result.ok) {
            errorDisplay.textContent = result.error || "Login failed. Please try again."
            return
        }

        window.location.href = REDIRECT_PAGE

    } catch (err) {
        errorDisplay.textContent = "Could not connect to server. Please try again."
        return
        
    } finally {
        loginButton.disabled = false
    }
})