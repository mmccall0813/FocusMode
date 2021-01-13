const WebSocket = require("ws");
const fs = require("fs")
const express = require("express")
const WSPort = 8080; // Port that the websocket server listens on
const logFile = true; // Determines whether or not to log blocks and whitelists to a file
const app = express();
const ExpressPort = 3000; // Port that the blockscreen listens on

function ConsoleLog(input){
    if(logFile){
        var log = fs.readFileSync("log.txt").toString();
        const date = new Date;
        const timestamp = "["+date.getHours().toString()+":"+date.getMinutes().toString()+":"+date.getSeconds().toString()+"]"
        log+="\n"+timestamp+" "+input;
        fs.writeFileSync("log.txt", log)
    }
    console.log(input)
}

const wss = new WebSocket.Server({ port: WSPort, perMessageDeflate: { zlibDeflateOptions: { chunkSize: 1024, memLevel: 7,level: 3}, zlibInflateOptions: {chunkSize: 10 * 1024}, clientNoContextTakeover: true, serverNoContextTakeover: true, serverMaxWindowBits: 10, concurrencyLimit: 10, threshold: 1024}});
console.log(`FocusMode listening on port ${WSPort}`)
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
      var dataJSON = JSON.parse(data);
      var database = fs.readFileSync("whitelists.json")
      var databaseJSON = JSON.parse(database);
      
      if(dataJSON.type == "ask"){
      
      if(databaseJSON[dataJSON.website] == undefined){
        
        ws.send('{"type":"filter","response":"disallow"}')
        ConsoleLog(dataJSON.website + " was blocked")
      
    }else{
    
        if(databaseJSON[dataJSON.website].allowed == true){
      ws.send('{"type":"filter","response":"allow"}')
    }else{
    
        ws.send('{"type":"filter","response":"disallow"}')
        ConsoleLog(dataJSON.website + " was blocked")
    
    }}
}else if(dataJSON.type = "whitelist"){
    if(databaseJSON[dataJSON.website] == undefined){
    var whitelist = JSON.parse(fs.readFileSync("whitelists.json"))
    whitelist[dataJSON.website] = {allowed:true}
    fs.writeFileSync("whitelists.json", JSON.stringify(whitelist)+"")
    ws.send(`{"type":"success"}`)
    ConsoleLog(`${dataJSON.website} was whitelisted`)
}else{ 
   ws.send(`{"type":"error","content":"Unable to whitelist website ${dataJSON.website} as a whitelist already exists for the website."}`)
}
}
      });
    });


app.use("/", express.static('public'))

app.listen(ExpressPort, () => {
  console.log(`Blockscreen lisening on port ${port}`)
})
