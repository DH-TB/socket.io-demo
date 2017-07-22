let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', ()=> {
        console.log('user disconnected');
    });
    socket.on('chat', (msg)=> {
        io.sockets.emit('chat message', msg);
    });
    socket.on('send img', (msg)=> {
        io.sockets.emit('receive img', msg);
    })
});

const port = (process.env.PORT || 3000);
http.listen(port, ()=> {
    console.log('listening on ' + port);
});