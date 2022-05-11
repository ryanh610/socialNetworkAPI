const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

const thoughtSchema = new Schema({
    thoughtText: { type: String, required: true, maxlength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, require: true },
    reactions: [reactionSchema]
},
{
    toJSON: {virtuals: true, getters: true},
    id: false
})

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });

const Thought = model('Thought', thoughtSchema);

modules.export = Thought