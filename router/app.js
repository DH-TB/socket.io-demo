let mongoose = require('mongoose');

let db = mongoose.connect('mongodb://huanglizhen:dhtb472561212@ds133582.mlab.com:33582/ttms');

db.connection.on("open", function () {
    console.log("数据库连接成功");
});

db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});

mongoose.Promise = require('bluebird');

let user = mongoose.model('User', {
    username: String, //用户姓名
    password: String, //用户密码
    image: String,  //用户图像
    state: Boolean  //用户状态
});

module.exports = user;