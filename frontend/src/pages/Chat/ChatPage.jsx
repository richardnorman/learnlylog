import React, { useState, useEffect } from "react"
import socketIOClient from "socket.io-client";
import { useRealmApp } from "../../components/RealmApp";
import { Chip } from "@material-ui/core";
import "./Chat.css";

let socket = null;

export default function ChatPage() {
    const { currentUser } = useRealmApp();
    const [messages, setMessages] = useState([]);
    const [msgInput, setMsgInput] = useState("");
    // const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (socket == null) {
            socket = socketIOClient(window.location.origin, { transports: ['websocket']});
        } 
        socket.emit("join chat", currentUser);
        socket.on("chat message", (data) => {
            let temp = messages;
            temp.push(data)
            setMessages([...temp]);
            const el = document.getElementById('chat-feed');
            el.scrollTop = el.scrollHeight;
        });
        return () => {
            socket.emit("leave chat", currentUser);
            socket.off("chat message");
        }

    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        if (msgInput) {
            socket.emit("chat message", {
                content: msgInput,
                user: currentUser
            });
            setMsgInput("");
        }
    }

    return (
        <div>
            <div className="messages" id="chat-feed">
                {
                    messages.map(msg => {
                        if (msg.user.id == currentUser.id) {
                            return (
                                <div className="chat-message message-right">
                                    <Chip className="chat-chip" color="primary" label={ msg.content }/><br/>
                                    <small>{ new Date(msg.time).toLocaleTimeString() }</small>
                                </div>
                            );
                        } else {
                            return (
                                <div className="chat-message">
                                    <small>{ msg.user.name.split('@')[0] }</small><br/>
                                    <Chip color="secondary" label={ msg.content }></Chip><br/>
                                    <small>{ new Date(msg.time).toLocaleTimeString() }</small>
                                </div>
                            );
                        }  
                    })
                }
            </div>
            <form className="chat-form" action="" onSubmit={sendMessage}>
                <input className="chat-input" autocomplete="off" placeholder="Type to chat with others..." value={msgInput} onChange={e => setMsgInput(e.target.value)}/><button>Send</button>
            </form>
        </div>
        
        
    );
}