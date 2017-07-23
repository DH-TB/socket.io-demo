/*
let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/index.html');
});
const port = (process.env.PORT || 3000);
http.listen(port, ()=> {
    console.log('listening on ' + port);
});
*/

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/login',express.static('./public/login.html'));
app.use('/home',express.static('./public/home.html'));
app.use(express.static('./public'));

app.use(require('./router/route/index'));

const http = require('http').createServer(app);
const io = require('socket.io').listen(http);

let User = require('./router/app');

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
    });
});

http.listen(process.env.PORT ||3000,()=>{
    console.log('listen 3000');
});
