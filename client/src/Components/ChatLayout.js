import React, { useState } from 'react'
import ChatMessage from './ChatMessage';

const ChatLayout = () => {
    const [input, setInput] = useState("")
    const [chatLog, setChatLog] = useState([{
        user: "gpt",
        message: "¿Cómo puedo ayudarte?"
    }])

    function clearChat() {
        setChatLog([
            {
                user: "gpt",
                message: "¿Cómo puedo ayudarte?"
            }
        ])
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let chatLogNew = [...chatLog, { user: "me", message: `${input}` }]
        setInput("");
        setChatLog(chatLogNew);

        const messages = chatLogNew.map((message) => message.message).join("\n")

        try {
            const response = await fetch("http://localhost:3080/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    message: messages
                })
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }])
        } catch (error) {
            console.log(error);
            alert("Ha ocurrido un error al procesar la solicitud");
        }
    }

    return (
        <div className="App">
            <aside className="sidemenu">
                <div className="side-menu-button" onClick={clearChat}> <span>+</span>New chat</div>
            </aside>
            <section className="chatbox">
                <div className="chat-log">
                    {chatLog.map((message, index) => (
                        <ChatMessage key={index} message={message} />
                    ))}
                </div>
                <div className="chat-input-holder">
                    <form onSubmit={handleSubmit}>
                        <input
                            rows="1"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="chat-input-textarea"
                            placeholder="Type your message here"
                        ></input>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default ChatLayout