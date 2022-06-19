const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3002;

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import and execute routes
app.use(require('./routes'));

// set up mongodb connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yurillium-sns-api');

// to log db queries
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected on PORT ${PORT}`));
