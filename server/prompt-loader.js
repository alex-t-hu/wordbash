const Prompt = require("./models/prompt");

const logAllPrompts = () => {
    Prompt.find({}, (err, prompts) => {
        console.log(prompts);
    });
};


const getPromptSubset = (temperature, n) => {
    // Count the number of prompts with the given temperature
    const numPrompts = Prompt.countDocuments({}).where('temperature').equals(temperature).exec();
    const nums = new Set();
    while(nums.size !== n) {
        nums.add(Math.floor(Math.random() * numPrompts));
    }
    return Prompt.find({}).where('temperature').equals(temperature).where('index').in(Array.from(nums)).exec();
};



module.exports = {
    getPromptSubset,
    logAllPrompts,
};