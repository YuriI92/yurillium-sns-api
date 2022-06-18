const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: 'Email address is required',
        match: /^[a-z0-9_\.-]+@[\da-z\.-]+\.[a-z\.]{2,6}$/
    },
    // array of Thought's ids
    thoughts: [
        {
            type: Types.ObjectId,
            ref: 'Thought'
        }
    ]
});

const User = model('User', userSchema);

module.exports = User;
