const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
    {
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
            // email validation using regex
            match: /^[a-z0-9_\.-]+@[\da-z\.-]+\.[a-z\.]{2,6}$/
        },
        // array of Thought's ids
        thoughts: [
            {
                type: Types.ObjectId,
                ref: 'Thought'
            }
        ],
        // array of User(friend)'s ids
        friends: [
            {
                type: Types.ObjectId,
                ref: this
            }
        ]

    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// counts the number of friends for the user
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
