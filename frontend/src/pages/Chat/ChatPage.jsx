import React, { useState, useEffect } from "react"
import socketIOClient from "socket.io-client";
import { useRealmApp } from "../../components/RealmApp";
import { Chip } from "@material-ui/core";
import "./Chat.css";

export default function ChatPage() {
    const { currentUser } = useRealmApp();
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState("");
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const connection = socketIOClient(window.location.origin, { transports: ['websocket']})
        setSocket(connection);

        connection.emit("join chat", currentUser);
        connection.on("chat message", (data) => {
            let temp = messages;
            temp.push(data)
            setMessages([...temp]);
            const el = document.getElementById('chat-feed');
            el.scrollTop = el.scrollHeight;
        });

        return () => {
            connection.emit("leave chat", currentUser);
        }

    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        if (msg) {
            socket.emit("chat message", {
                content: msg,
                user: currentUser
            });
            setMsg("");
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
                                    <small>{ msg.user.name.split('@')[0] }</small><br/>
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
                <input className="chat-input" autocomplete="off" placeholder="Type to chat with others..." value={msg} onChange={e => setMsg(e.target.value)}/><button>Send</button>
            </form>
        </div>
        
        
    );
}