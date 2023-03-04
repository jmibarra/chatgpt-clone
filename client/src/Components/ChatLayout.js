import React, { useState } from 'react'
import ChatMessage from './ChatMessage';

const ChatLayout = () => {
    const [input, setInput] = useState("")
    const [chatLog, setChatLog] = useState([{
        user: "gpt",
        message: "¿Cómo puedo ayudarte?"
    }])

    async function handleSubmit(e) {
        e.preventDefault();
        setChatLog([...chatLog, { user: "me", message: `${input}` }])
        setInput("");

        const response = await fetch("http://localhost:3080/", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                message: chatLog.map((message) => message.message).join("")
            })
        })

        const data = await response.json();
        setChatLog([...chatLog, { user: "gpt", message: `${data.message}` }])
    }

    return (
        <div className="App">
            <aside className="sidemenu">
                <div className="side-menu-button"> <span>+</span>New chat</div>
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