const mongoose = require('mongoose');
const { User } = require('../models');

mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yurillium-sns-api')
    .then(() => console.log('Connected to Mongo'))
    .catch(err => console.log(err));


const seedUsers = [
    {
        username: 'lernantino',
        email: 'lernantino@gmail.com'
    },
    {
        username: 'yuri',
        email: 'yuri@gmail.com'
    },
    {
        username: 'milo',
        email: 'milo@gmail.com'
    },
    {
        username: 'jack',
        email: 'jack@gmail.com'
    },
    {
        username: 'anna',
        email: 'anna@gmail.com'
    },
];

const seedDB = async () => {
    await User.deleteMany({});
    await User.insertMany(seedUsers);
};

seedDB().then(() => {
    mongoose.connection.close();
});
