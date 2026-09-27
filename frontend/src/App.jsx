import { Routes, Route } from "react-router-dom"
import FrontPage from "./pages/FrontPage.jsx"
import About from "./pages/About.jsx"
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"
import Materials from "./pages/Materials.jsx"
import Chat from "./pages/Chat.jsx"

function App() {
    return (
        <>
        <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/chat" element={<Chat />} />
        </Routes>
        </>
    )
}

export default App