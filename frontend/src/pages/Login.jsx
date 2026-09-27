import Navbar from "../components/Navbar.jsx"
import logo from "../assets/yNotStudy logo 1.png"
import { useNavigate } from "react-router-dom"

function Login() {
    const loggedIn = false; /*add auth state here*/
    const navigate = useNavigate()

    return (
        <>
        <Navbar>
            <button onClick={() => navigate("/")}>frontpage</button>
            <button onClick={() => navigate("/about")}>about</button>
        </Navbar>
        <img src={logo} className="logo" alt="y not study logo" />

        <form id="login-form">
            <h2>Login</h2>
            <input type="text" id="username" placeholder="username" autocomplete="username" required />
            <input type="password" id="password" placeholder="password" autocomplete="current-password" required />
            <button type="submit" id="login-button">Login</button>
            <p id="error-message"></p>
            <p>Don't have an account? <a href="./register.html">Register here</a></p> 
        </form>
        </>
    )
}

export default Login