const root = process.cwd(),
   path = require('path'),
   express = require('express'),
   fs = require('fs'),
   app = express(),
   resourcesPath = path.join('', 'dist');

const global = (function() {
   return this || (0, eval)('this');
})();

const clients = {};

app.use(express.static(resourcesPath));
const port = process.env.PORT || 777;
var expressServer = app.listen(port);
console.log('app available on port ' + port);

// websockets

const WebSocket = require('ws');

global.currentInfo = {};

var INTERVALS = [];
let boss;

const wss = new WebSocket.Server({server:expressServer});

/*.listen(8080, function() {
   const {address, port} = this.address() // this is the http[s].Server
   console.log('listening on http://%s:%d (%s)', /::/.test(address) ? '0.0.0.0' : address, port)
});*/
wss.on('connection', function connectionListener(ws) {

  var id = Math.random();
  clients[id] = {
    imboss: false,
    answer: null,
    ws: ws
  };
  console.log("новое соединение " + id);

//    ws.send(JSON.stringify("2"));

   ws.on('close', () => {
      delete clients[id];
   });

   ws.on('message', (data) => {
      handleMessage(JSON.parse(data), id);
   });

});

let activeAnswer;


function handleMessage(data, id) {
   switch (data.type) {
      case "imboss":
         clients[id].imboss = true;
         boss = clients[id];
         break;
      case "newvote":

        activeAnswer = {};
        data.answers.forEach((el)=>{
          activeAnswer[el] = 0;
        });

         for(let i in clients) {
           if (clients.hasOwnProperty(i)) {
             clients[i].answer = null;
             try {
               clients[i].ws.send(JSON.stringify({type: "newvote", answers: data.answers}));
             } catch(e) {}
           }
         }
         break;
      case "answer":
        clients[id].answer = data.answer;
        activeAnswer[data.answer]++;
        boss.ws.send(JSON.stringify({type: "newanswer", count: activeAnswer}));
        break;
      default:
         return "wrong request";
   }
}


function stopServers() {
   // closeAllClientConnections(wss);
   wss.close();
   expressServer.close();
}
