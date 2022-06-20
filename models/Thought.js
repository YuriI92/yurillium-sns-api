const { Schema, model, Types } = require('mongoose');
const dayjs = require('dayjs');

// schema for the reactions to the thoughts
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'Reaction text is required',
            maxLength: 280
        },
        username: {
            type: String,
            required: 'Username is required'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: dateValue => dayjs(dateValue).format('h:mma MMM D, YYYY')
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Thought text is required',
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // change format using Day.js library (format ex => 12:27pm Jun 18, 2022)
            get: dateValue => dayjs(dateValue).format('h:mma MMM D, YYYY')
        },
        username: {
            type: String,
            required: 'Username is required'
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);

// counts the number of reactions to the thought
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
