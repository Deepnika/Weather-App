if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// const API_KEY = process.env.API_KEY;

const express = require('express');
const app = express();

const indexRouter = require('./routes/index');

app.use(express.static('public'));
app.use(express.json({ limit: '2mb' }))

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);

// module.exports = API_KEY;