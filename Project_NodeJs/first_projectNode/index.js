console.log("Hello word")

require("dotenv").config()
const webSocket  = require("ws")

const wss = new webSocket.Server({
    port: process.env.PORT
});
function onConnection(){
    console.log("onConnection")
}
//essa função é onde você coloca tudo o que o servidor deve fazer quando um cliente novo se conecta.
wss.on("connection", onConnection);

console.log(`Websocket Server Está rodando aqui ${process.env.PORT}`)