const express = require('express');
const fs = require('fs');
const update = require('react-addons-update')

const server = express();
server.use(express.json());

server.get("/api/getMessages", (req, res) => {
  fs.readFile(`./server/db/chats.json`, 'utf-8', (err, data) => {
    if(!err) {
      data = JSON.parse(data);
      res.json(data);
    } 
  })
})

server.post("/api/postMessage", (req, res) => {
  fs.readFile(`./server/db/chats.json`, 'utf-8', (err, data) => {
    if(!err) {
      const chats = JSON.parse(data);
      const newMsg = {
        author: {
          name: req.body.name || 'Bot',
          id: req.body.id || 1
        },
        id: `${req.body.chatId}_${chats[req.body.chatId].messages.length + 1}`,
        text: req.body.text || 'I\'m Bot',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString('en-GB').substring(0, 5),
        type: req.body.mesType || 'received'
      };
      chats[req.body.chatId].messages.push(newMsg);
      fs.writeFile('./server/db/chats.json', JSON.stringify(chats), (err, data) => {
        if (!err) {
          res.json(newMsg)
        }
      })
    }})
})



server.listen(3000, () => {console.log('Server started at port 3000')})
