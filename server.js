import http from 'http';
import {Server} from 'socket.io';
import express from 'express';
import cors from 'cors';
 

const app=express();
app.use(cors());
const server = http.createServer(app);
const io= new Server(server,{
    cors:{
        origin:"http://localhost:5180",
        methods:["GET","POST"]
    }
});
io.on('connection',(socket)=>{
    console.log('New client connected');
    socket.on('chat message', (msg)=>{
        io.emit('chat message', msg);
       });
});
server.listen(3000,()=>console.log('Server running on 3000'));
