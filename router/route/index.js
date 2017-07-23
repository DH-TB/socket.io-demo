let express = require('express');
let app = express();

app.use('/',require('./login'));
app.use('/',require('./register'));
app.use('/',require('./home'));

module.exports = app;