import Navbar from "../components/Navbar.jsx"
import logo from "../assets/yNotStudy logo 1.png"
import { useNavigate } from "react-router-dom"

function FrontPage() {
  const loggedIn = false; /*add auth state here*/
  const navigate = useNavigate()

  return (
      <>
        <img src={logo} className="logo" alt="ynotstudy logo" />
        <Navbar>
          {loggedIn ? (
            <>
              <button onClick={() => navigate("/about")}>about</button>
              <button onClick={() => navigate("/chat")}>chat</button>
              <button onClick={() => navigate("/home")}>home</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/about")}>about</button>
              <button onClick={() => navigate("/login")}>login</button>
            </>
          )}
        </Navbar>
        <div className = "textCard">
          <h1>Y r u not studying?</h1>
          <h2>is it cuz you dont know what to study?</h2>
          <h2>or what your teacher wants?</h2>
          <h2>or have you given up because your grade just wont go up?</h2>
          <button>Click to reach enlightenment</button>
        </div>
      </>
  );
}

export default FrontPage