import Navbar from "../components/Navbar.jsx"
import logo from "../assets/yNotStudy logo 1.png"
import { useNavigate } from "react-router-dom"

function About() {
    const loggedIn = false;
    const navigate = useNavigate();
    return (
        <>
        <Navbar>
            {loggedIn ? (
                <>
                    <button onClick={() => navigate("/")}>frontpage</button>
                    <button onClick={() => navigate("/home")}>home</button>
                    <button onClick={() => navigate("/chat")}>chat</button>
                </>
            ) : (
                <>
                    <button onClick={() => navigate("/")}>frontpage</button>
                    <button onClick={() => navigate("/login")}>login</button>
                </>
            )}
        </Navbar>
        <img src={logo} className="logo" alt="ynotstudy logo"></img>
        <div className = "textCard">
            <p>created by two sophmores for hack club thirdspace bc we want 1000 dollars</p>
        </div>
        </>
    );
}

export default About