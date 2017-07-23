let express  = require('express');
let router = express.Router();
let User = require('../app');

router.post('/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var resData = {};
    User.findOne({
        username: username,
        password: password
    }).then(function (userInfo) {
        if (!userInfo) {
            resData.success = 0;
            resData.err = "用户名或者密码错误!";
            res.json(resData);
            return false;
        } else {
            if(userInfo.state){
                resData.success = 0;
                resData.err = "该用户已登录!";
                res.json(resData);
                return false;
            }else{
                User.update({
                    _id: userInfo._id
                }, {
                    state: true
                }).then(function () {
                    resData.success = 1;
                    resData.err = "登录成功!";
                    res.cookie("user", userInfo.username, {maxAge: 1000 * 60 * 60});
                    res.json(resData);
                    next();
                })
            }
        }
    })
});

module.exports = router;