import Navbar from "../components/Navbar.jsx"
import CourseCard from "../components/CourseCard.jsx"
import logo from "../assets/yNotStudy logo 1.png"
import { useNavigate } from "react-router-dom"

function Home() {
    const loggedIn = false; /*add auth state here*/
    const navigate = useNavigate()

    return (
        <>
            <img src={logo} className="logo" alt="y not study logo" />
            <Navbar>
                <button onClick={() => navigate("/about")}>about</button>
                <button onClick={() => navigate("/chat")}>chat</button>
                <button onClick={() => navigate("/frontpage")}>frontpage</button>
            </Navbar>

            <button className = "newMaterial" onClick={() => navigate("/addmaterials")}>New Material</button>

            <div className = "courses">
                
            </div>  
        </>
    )

}

export default Home