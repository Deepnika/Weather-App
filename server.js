if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();

const indexRouter = require('./routes/index');

app.use(express.static('public'));

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);