const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'Thought text is required',
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: new Date.now,
        // change format using Day.js library (format ex => 12:27pm Jun 18, 2022)
        get: dateValue => dayjs(dateValue).format('h:mma MMM D, YYYY')
    },

    username: {
        type: String,
        required: 'Username is required'
    }
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
