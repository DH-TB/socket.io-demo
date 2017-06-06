let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, res)=> {
    // res.send("hello world");
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', function (socket) {
    // socket.broadcast.emit('hi');
    console.log('a user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('chat', function (msg) {
        console.log('message: ' + msg);
        socket.emit('chat message', msg);
    });
});

http.listen(3000, ()=> {
    console.log('listening 3000');
});