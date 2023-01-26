
const AllPrompts = [
    [], // 0
    [], // 1
    [], // 2
    [], // 3
    [], // 4
    [], // 5
    [], // 6
    [], // 7
    [], // 8
    [], // 9
    [], // 10
    [], // 11
    [], // 12
    [], // 13
    [], // 14
    [], // 15
    [], // 16
    [], // 17
    [], // 18
    [], // 19
    [] // 20
]

for(let i = 0; i < 20; i++) {
    for(let j = 0; j < 5; j++){
        AllPrompts[i].push("Prompt " + i + " " + j);
    }
}


module.exports = {AllPrompts};