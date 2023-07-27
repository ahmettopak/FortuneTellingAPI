const mongoose = require('mongoose');

const FortuneSchema = new mongoose.Schema({
    fortune: { type: String, required: true },
    age: { type: Number, required: true },
    relationship: { type: String, required: true },
    gender: { type: String, required: true },
    mood: { type: String, required: true },
});

module.exports = mongoose.model("fortune", FortuneSchema)