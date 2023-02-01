const Prompt = require("./models/prompt");

const getPromptSubset = async (temperature, n) => {
    const prompts = await Prompt.find({temperature: temperature});
    const numPrompts = prompts.length;


    // console.log"Generating Prompts for temperature " + temperature + " with " + n + " prompts.");

    // console.log"numPrompts is " + numPrompts);
    
    // // console.logprompts);

    const nums = new Set();
    while(nums.size !== n) {
        nums.add(Math.floor(Math.random() * numPrompts));
    }

    // console.lognums);

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