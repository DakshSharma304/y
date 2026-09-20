import { getToken, login, register } from "./api/auth.js";

const REDIRECT_PAGE = "index.html"
const LOGIN_PAGE = "login.html"

if (getToken()) {
    window.location.href = REDIRECT_PAGE
}

const registerForm = document.querySelector("#register-form")
const usernameInput = document.querySelector("#username")
const passwordInput = document.querySelector("#password")
const registerButton = document.querySelector("#register-button")
const errorDisplay = document.querySelector("#error-message")

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault() // Don't reload page (we have more to do)

    errorDisplay.textContent = ""
    const username = usernameInput.value.trim()
    const password = passwordInput.value

    registerButton.disabled = true // So the user can't spam

    try { // Both register AND login in one go

        // Create account
        const registerResult = await register(username, password)

        if (!registerResult.ok) {
            errorDisplay.textContent = registerResult.error || "Registration failed. Please try again."
            return
        }

        // Auto-login
        const loginResult = await login(username, password)

        if (!loginResult.ok) {
            window.location.href = LOGIN_PAGE // Unusual, but could happen where registration successful but login fails
            return 
        }

        window.location.href = REDIRECT_PAGE

    } catch (err) {
        errorDisplay.textContent = "Could not connect to server. Please try again."
        return 

    } finally {
        registerButton.disabled = false
    }
})