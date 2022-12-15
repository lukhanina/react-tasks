const express = require('express');
const fs = require('fs');
const update = require('react-addons-update')

const server = express();

server.get("/api/getMessages", (req, res) => {
    fs.readFile(`./server/db/chats.json`, 'utf-8', (err, data) => {
        if(!err) {
            data = JSON.parse(data);
            res.json(data);
        } 
    })
})

// server.post("/api/postMessage", (req, res) => {
//     fs.readFile(`./server/db/chats.json`, 'utf-8', (err, data) => {
//         if(!err) {
//             const newMsg = req.body[Object.keys(req.body)].messages;
//             update(chats, {
//                 [Object.keys(req.body)]: {
//                     messages: {
//                         $merge: {
//                             ...newMsg
//                     }
//                 }
//             }
//         }
//             )
//             const chats = JSON.parse(data);
//             chats.push(item);
//             fs.writeFile('./server/db/chats.json', JSON.stringify(chats), (err) => {
//                 if (err) {
//                     res.send('{"result": 0}')
//                 } else {
//                     res.send('{"result": 1}')
//                 }
//             })
//         } 
//     })
// })

server.listen(3000, () => {console.log('Server started at port 3000')})
