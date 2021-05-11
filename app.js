const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);

app.use(express.static('public'));

let users = {};

io.on('connection',(socket)=>{
    socket.on('login',(data)=>{
        users[socket.id] =  data.name
    })

    socket.on('sendM',(data)=>{
        io.emit('receiveM',{
            ack:data.d,
            name:users[socket.id],
            sid:socket.id
        })
    })
})



server.listen(process.env.PORT || 8000,()=>{
    console.log("Listening to port 8000");
})