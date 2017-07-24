let express = require('express');
let router = express.Router();
let User = require('../app');

router.post('/register',(req,res,next)=>{
    let username = req.body.username;
    let password = req.body.password;
    let resData = {};
    User.findOne({username: username}).then(function (userInfo) {
        if (userInfo) {
            resData.success = 0;
            resData.err = "该用户名已被注册！";
            res.json(resData);
            return false;
        } else {
            let user = new User({
                username: username,
                password: password,
                image: '../img/people.jpg',
                state: false
            });
            return user.save();
        }

    }).then(function () {
        resData.success = 1;
        resData.message = "注册成功！";
        res.json(resData);
    }) 
});

module.exports = router;