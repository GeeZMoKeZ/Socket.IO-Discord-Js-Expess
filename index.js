const Discord = require("discord.js");
const bot = new Discord.Client();
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.get("/", (req, res)=>{
    res.sendFile(`${__dirname}/index.html`)
})

server.listen(3000, ()=>{
    console.log("écoute sur le port 3000")
})
io.on("connection", (socket) => {
    console.log("un user connecté");
    to_pass = [];
    bot.channels.cache.forEach(e => {
        temp = {};
        temp.nom = e.name;
        temp.id = e.id;
        to_pass.push(temp);
    });
    io.emit("loadChannels", to_pass);
    console.log(to_pass);
    socket.on("message", (msg) => {
        bot.channels.cache.get(msg.channel).send(msg.message);
        console.log(msg);
    })
})
bot.on("ready", async () => {
    console.log("bot on");
})











bot.login("N");