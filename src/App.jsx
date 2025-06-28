import React, {useEffect,useState,useRef } from 'react'
import {io} from 'socket.io-client'
const socket=io('http://localhost:3000')
import './App.css';
function App() {
  const [messages,setMessages]=useState([]);
  const [input,setInput]=useState('');
  const [userName,setUsername]=useState('');
  const chatEndRef=useRef(null);

  useEffect(() =>{
    const name=prompt("Enter your username:");
    setUsername(name || 'Anonymous');

    socket.on('chat message',  (data) =>{
      setMessages((prev) => [...prev,data]);
    })

    return() =>socket.off('chat message');
  }, []);

  useEffect(() =>{
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth'});
  }, [messages]);


  const send =() =>{
    if (input.trim()!==''){
      const msgData= {user: userName, text: input};
      socket.emit('chat message',msgData);
      setInput('');
    }
  };
  return (
      <div><h1><b>✨✨FreeTalks😄💫</b></h1>
      <h5>No Filters, Just FreeTalks.</h5>
<ul>
  {messages.map((msg, idx) => (
    <li
      key={idx}
      className={msg.user === userName ? 'my-message' : 'other-message'}
    >
      <strong>💫{msg.user}😀:</strong> {msg.text}
    </li>
  ))}
</ul>
      <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) =>e.key==='Enter' && send()}
      placeholder='Drop your text here....' />
      <button onClick={send}>Send</button>
      
      </div>
  )
}

export default App
