const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, trimmed: true, unique: true, required: true },
    email: { type: String, unique: true, required: true, match: [/.+\@.+\..+/] },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'thoughts' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'users' }]
    },
    {
        toJSON: {virtuals: true}, id: false
    });

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;