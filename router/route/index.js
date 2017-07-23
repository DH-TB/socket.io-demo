let express = require('express');
let router = express.Router();

let User = require('../app');

router.use('/', require('./login'));
router.use('/', require('./register'));


router.get('/home', (req, res)=> {
    console.log(req.cookies.user);
    User.findOne({
        username: req.cookies.user
    }).then((userInfo)=> {
        res.render('home', {
            username: userInfo.username,
            image: userInfo.image
        });
    });
});


module.exports = router;