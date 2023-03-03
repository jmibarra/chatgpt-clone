import './App.css';
import {useState} from 'react'
import ChatMessage from './Components/ChatMessage';
function App() {

    const [input, setInput] = useState("")
    const [chatLog, setChatLog] = useState([{
        user: "gpt",
        message: "¿Cómo puedo ayudarte?"

    }])

    async function handleSubmit(e){
        e.preventDefault();
        setChatLog([...chatLog,{ user:"me", message: `${input}`}])
        setInput("");


    
    }
  return (
    <div className="App">
        <aside className="sidemenu">
            <div className="side-menu-button"> <span>+</span>New chat</div>
        </aside>
        <section className="chatbox">
            <div className="chat-log">
                {chatLog.map( (message,index) => (
                    <ChatMessage key={index} message={message}/>
                ))}
            </div>
            <div className="chat-input-holder">
                <form onSubmit={handleSubmit}> 
                    <input 
                        rows="1" 
                        value={input}
                        onChange={ (e) => setInput(e.target.value) }
                        className="chat-input-textarea" 
                        placeholder="Type your message here"
                        ></input>
                </form>
            </div>
        </section>
    </div>
  );
}

export default App;
