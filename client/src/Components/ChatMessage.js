import React from 'react'
import { ReactComponent as ChatGPTAvatar } from '../images/chatgpt-icon.svg'
import { ReactComponent as UserAvatar } from '../images/default-profile-picture-male-icon.svg'

const ChatMessage = ({ message }) => {
    return (
        <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
            <div className="chat-message-center">
                <div className="avatar">
                    {message.user === "gpt" ? <ChatGPTAvatar /> : <UserAvatar />}
                </div>
                <div className="message">
                    {message.message}
                </div>
            </div>
        </div>
    )
}

export default ChatMessage