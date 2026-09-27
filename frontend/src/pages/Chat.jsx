import logo from "../assets/yNotStudy logo 1.png"
import { useNavigate } from "react-router-dom"

function Chat() {
    const navigate = useNavigate()

    return (
        <>
            <div className = "chatPage">
                <div className = "wholeChatPage">
                    <div className = "sidebar">
                        <img src = {logo} alt = "yNotStudy logo" />
                        <button id="newMaterial">New Material</button>
                    </div>

                    <div className = "chat">
                        <div className = "messages">
                
                    </div>

                        <div className = "prompt">
                            <input type="text" id="prompt" placeholder="put message here" />
                            <button id="send">⟶</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default Chat