let socket = io();
let username;
let img;
$(document).ready(function () {
    username = $('#username').text();
    img = $('#userImg').attr("src");

    socket.emit('login', username);
    socket.on('add user', (msg)=> {
        $('#loggedUser').append('@ ' + msg + ' @上线');
    });
    socket.on('user list',(data)=>{
        $('#userCount').html('当前在线人数' + data.length);
        let user = data.map((ele)=>{
            let user = '<li id="li">';
            user += '<span id="sendUserName">' + ele.username + '</span>';
            user += '<img src="' + ele.image + '" id = "sendImg" class = "img-rounded">'+'</li>';
            return user;
        });
        $('#userList').append(user);
    })
});

function sendMessage() {
    let message = $('#message').val();
    socket.emit('chat', {img, username, message});
    $('#message').val('');
}
function changeFiles(e) {
    var e = e || window.event;
    var files = e.target.files || e.dataTransfer.files;
    var len = files.length;
    if (len === 0) return false;
    for (var i = 0; i < len; i++) {
        var fs = new FileReader();
        fs.readAsDataURL(files[i]);
        fs.onload = function () {
            socket.emit('send img', this.result);
        }
    }
}
function exit() {
    location.href = 'exit';
    socket.emit('discount', username);
}


socket.on('delete user', (msg)=> {
    $('#loggedUser').append('@ ' + msg + ' @下线');
});


socket.on('chat message', function (msg) {
    let html = '<li id="li">';
    html += '<span id="sendUserName">' + msg.username + '</span>';
    html += '<span id="sendMessage">' + msg.message + '</span>';
    html += '<img src="' + msg.img + '" id = "sendImg" class = "img-rounded">'
    html += '</li>';
    $('#messages').append(html);
});

socket.on('receive img', (msg)=> {
    let html = '<img src="' + msg + '">';
    $('#messages').append($('<li>').html(html));
});
