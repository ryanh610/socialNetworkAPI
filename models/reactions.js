const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: { type: Types.objectId, default: new Types.objectId() },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
},
{
    toJSON: {getters: true},
    id: false
})

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;