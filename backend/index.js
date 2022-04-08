/**
 * To use this server, make sure the frontend is built and all static files are located in ../frontend/build
 * 
 * To build the client 
 * $ cd ..
 * $ cd frontend
 * $ npm run build
 * 
 * Then navigate back here and run:
 * $ node index.js
 */

 const express = require('express');
 const app = express();
 const http = require('http');
 const server = http.createServer(app);
 const { Server, Socket } = require("socket.io");
 const io = new Server(server);
 
const port = 3000

app.use(express.static('../frontend/build'));

const users = {};

io.on("connection", (socket) => {
    console.log("a client connected");

    socket.on("join chat", (user) => {
        users[user.id] = {
            name: user.profile.data.email,
            id: user.id
        };
    });

    setInterval(() => {
        socket.emit("chat message", {
            time: Date.now(),
            user: {
                id: "",
                name: ""
            },
            content: "test form server"
        })
    }, 5000);

    socket.on("chat message", (data) => {
        socket.emit("chat message", {
            time: Date.now(),
            user: users[data.user.id],
            content: data.content
        })
    });

    socket.on("leave chat", (user) => {

    });

});

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}) 