const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io");
const pool = require("./Database");

const express = require("express");
const path = require("path");

const app = express();

const server = http.createServer(app);

app.use(cors())
app.use(express.json()); // this is required from reading the value of req.body....
//Socket.io Server

const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000", 
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) =>{
    socket.emit(socket.id);
    socket.on("sending_messages", (data)=>{
        data.outgoing = false;
        socket.broadcast.emit("receiving_messages", data);
    })
})

app.get("/", (req, res) => {
    res.send("hello from server");
})

app.post("/login",async(req, res) =>{
    try {
        const data = req.body;
        const db = await pool.query('SELECT * FROM login WHERE user_name = $1 AND user_password = $2', [data.user_name, data.user_password], (error, result)=>{
            try {
                if(result.rows.length > 0){
                    res.send(result.rows);
                    
                }else{
                    res.send("Invalid input");
                }
            } catch (error) {
                console.error(error.message);
            }
        });
    } catch (error) {
        console.error("error is : ", error.message);
    }
})


server.listen(9001, ()=> console.log(`server listening at PORT no 9001`));