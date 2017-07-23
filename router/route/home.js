let express  = require('express');
let router = express.Router();
let User = require('../app');

router.get('/home', function (req, res) {
    if (!req.cookies.user) {
        res.redirect('/login');
    } else {
        if (!req.cookies.flag) {
            User.findOne({
                username: req.cookies.user
            }).then(function (userInfo) {
                res.render('home', {

                    username: userInfo.username,
                    image: userInfo.image
                });
            });
        } else {
            res.redirect('/exit');
        }

    }
});

module.exports = router;