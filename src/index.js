const express = require("express");
const fs = require('fs');
const http = require('http');
const path = require("path");
const { Server } = require("socket.io");
var robot = require("robotjs");

const app = express();
const PORT = 3003 ;

const server = http.createServer(app);

const io = new Server(server);

io.on("connection",(socket) => {
    console.log("Client Connected " , socket.id) ;

    // handle mouse movement
    socket.on("mousemove",(mouseDelta)=>{
        let currentMousePosition = robot.getMousePos();
        robot.moveMouse(
            currentMousePosition.x + mouseDelta.dx,
            currentMousePosition.y + mouseDelta.dy
        );
    });

    // handle mouse click
    socket.on("click",()=>{
        robot.mouseClick();
    });

    socket.on("rightclick",()=>{
        robot.mouseClick("right");
    });

    // keyboard handlers
    socket.on("keyboardType",(text)=>{
        robot.typeString(text);
    });

    socket.on("keyboardBackspace",()=>{
        robot.keyTap("backspace");
    });
    
})

app.use('/static', express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname , '../public/index.html'));
});

server.listen(PORT,()=>{
    console.info(`APP RUNNING ON PORT ${PORT}`) ;
});

