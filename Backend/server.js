const app = require("express")();
const cors = require("cors");
const server = require("http").createServer(app);
const io = require("socket.io")(server,{
    cors:{
        origins:["http://localhost:5173"],
    }
});

io.on("connection", (socket) => {
    console.log('what is socket', socket);
    console.log('socket is active');
    
    socket.on('message',(playload)=>{
        console.log('what is playload', playload);
        socket.emit('message', playload);
        
    })
})
server.listen(8000, () => {
    console.log("Server is running on port 8000");
});