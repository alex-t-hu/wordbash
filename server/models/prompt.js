const mongoose = require("mongoose");

const PromptSchema = new mongoose.Schema({
    prompt: String,
});

// compile model from schema
module.exports = mongoose.model("prompt", PromptSchema);