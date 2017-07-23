let express = require('express');
let swig = require('swig');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
//设置模板
app.engine('html', swig.renderFile);
app.set('views', './public');
app.set('view engine', 'html');
swig.setDefaults({
    cache: false
});

app.use('/login',express.static('./public/login.html'));
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
