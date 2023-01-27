const Prompt = require("./models/prompt");

const getPromptSubset = async (temperature, n) => {
    const prompts = await Prompt.find({temperature: temperature});
    const numPrompts = prompts.length;
            
    const nums = new Set();
    while(nums.size !== n) {
        nums.add(Math.floor(Math.random() * numPrompts));
    }
    let result = [];

    for(const i of prompts){
        if(nums.has(i.index)){
            result.push(i["prompt"]);
        }
    }
    return result;
};



module.exports = {
    getPromptSubset,
};