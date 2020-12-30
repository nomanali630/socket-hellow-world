const { disconnect } = require("cluster");
var express = require ("express");
var http = require("http");
var socketIo = require ("socket.io");

app = express();

var PORT = process.env.PORT || 5000;

app.get("/" ,function(req,res,next){
    res.send("hellow bro");
});

var server = http.createServer(app);

var io = socketIo(server,{core:{origin: "*" , methods: "*", } });

let connectedUsers = [];

io.on("connection",function(socket){
    console.log("new client connected with id : ", socket.id);

    socket.emit("topic 1 ","Acha DATA");

    socket.on("disconnect",function(message){
        console.log("client disconnect with id: ", message);
    });
});

setInterval(()=>{
    io.emit("test topic", {event:"ADDED_ITEM" , data: "Acha data"});
    console.log("emiting data to all client");
},2000);

server.listen(PORT,function(){
    console.log("server is running on port ", PORT);
});