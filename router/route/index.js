let express = require('express');
let router = express.Router();

let User = require('../app');

router.use('/', require('./login'));
router.use('/', require('./register'));


router.get('/home', (req, res)=> {
    User.findOne({
        username: req.cookies.user
    }).then((userInfo)=> {
        res.render('home', {
            username: userInfo.username,
            image: userInfo.image
        });
    });
});

router.get('/exit', function (req, res) {
    User.update({
        username: req.cookies.user
    }, {
        state: false
    }).then(function () {
        res.clearCookie('user');
        res.clearCookie('flag');
        res.redirect('/login');
    });
});

module.exports = router;