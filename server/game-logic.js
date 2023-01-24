/** constants */
const MAX_GAME_ID = 1000000;

/** Game state
 * The game state is a dictionary of games, where each game is a dictionary of players
 * 
*/
const gameState = {}
/*

    gameState = {
        gameID: {
            num_Players: a number
            started: a boolean
            promptsFinished: a boolean
            votingFinished: a boolean
            votingResutlsFinished: a boolean
            votingRound: a number
            prompts: {
                id (a number from 0 to N-1):{
                    timestamp for round start (TODO)

                    content
                    // players id and id +1 will answer this, everyone else will vote.
                    
                    Response 0: a string (corresponds to id)
                    Response 1: a string (corresponds to id + 1)
                    response_0_vote:{
                        player_ids...
                    }
                    response_1_vote:{
                        player_ids...
                    }
                    
                }
            }
            players: {
                player_id:{
                    id (actual hex id)
                    score
                }
                
            }

        }
    }

/** Create a new game */
const createGame = (gameID) => {
    // const gameID = Math.floor(Math.random() * MAX_GAME_ID);
    // while(gameState[gameID] != undefined) {
    //     gameID = Math.floor(Math.random() * MAX_GAME_ID);
    // }
    gameState[gameID] = {
        num_Players: 0,
        game_started: false,
        players: {},
        prompts: {}
    }
    console.log("Created game " + gameID);
    
    return gameID;
}

/** Adds a player to the game state */
const spawnPlayer = (id, gameID) => {
    if(!gameState[gameID]) {
        // ur bad
        console.log("Game " + gameID + " does not exist. (I'm inside spawnPlayer)");
    }else{

        // Check if player is already in game
        for(let i = 0; i < gameState[gameID]["num_Players"]; i++) {
            if(gameState[gameID]["players"][i]["id"] === id) {
                console.log("Player " + id + " is already in game " + gameID);
                return;
            }
        }
        
        console.log("Spawning player " + id + " in game " + gameID);
        
        gameState[gameID]["players"][gameState[gameID]["num_Players"]] = {
            id: id,
            score : 0
        };

        gameState[gameID]["num_Players"] += 1;

    }
};

const Prompts = [
    "Nobody believes this_ until I show them the truth.",
    "I like to make life easier for everyone by___",
    "At the stroke of midnight my life changed forever when I suddenly ___",
    "If I could make $1 million dollars fast, I know I would___",
    "A preschooler proving to jealous fellow students he believed in Santa Claus despite small fingers no softness _.__",
    "I knew I was in trouble when Aunt Patty caught me ___"
]

const startGame = (gameID) => {
    gameState[gameID]["started"] = true;
    // Generate Prompts
    for(let i = 0; i < gameState[gameID]["num_Players"]; i++) {
        gameState[gameID]["prompts"][i] = {
            content: Prompts[i],
            response_0_answer: "",
            response_1_answer: "",
            response_0_vote: [],
            response_1_vote: []
        }
    }
}

const submitResponse = (playerID, gameID, promptID, response) => {
    
    let playerIdx = -1;
    for(let i = 0; i < gameState[gameID]["num_Players"]; i++){
        if(gameState[gameID]["players"][i]['id'] === playerID){
            playerIdx = i;
            break;
        }
    }

    if(promptID === playerIdx ){
        gameState[gameID]["prompts"][promptID]["response_0_answer"] = response;
    }else if((promptID + 1) % gameState[gameID]["num_Players"] === playerIdx){
        gameState[gameID]["prompts"][promptID]["response_1_answer"] = response;
    }else{
        console.log("You can't answer this prompt! ( prompt " + promptID + " player " + playerIdx + " )");
    }
    // Check if all responses are in
    let allResponsesIn = true;
    for(let i = 0; i < gameState[gameID]["num_Players"]; i++) {
        if(gameState[gameID]["prompts"][i]["response_0_answer"] === "" || gameState[gameID]["prompts"][i]["response_1_answer"] === ""){
            allResponsesIn = false;
            break;
        }
    }
    if(allResponsesIn){
        gameState[gameID]["promptsFinished"] = true;
    }
}

const submitVote = (playerID, gameID, promptID, response) => {
    if(response === 0){
        gameState[gameID]["prompts"][promptID]["response_0_vote"].push(playerID);
    }else if(response === 1){
        gameState[gameID]["prompts"][promptID]["response_1_vote"].push(playerID);
    }else{
        console.log("You can't vote for this response!");
    }
    // Check if all votes are in
    let allVotesIn = true;
    for(let i = 0; i < gameState[gameID]["num_Players"]; i++) {
        if(gameState[gameID]["prompts"][i]["response_0_vote"].length
        + gameState[gameID]["prompts"][i]["response_1_vote"].length
        < gameState[gameID]["num_Players"] - 2){
            allVotesIn = false;
            break;
        }
    }
    if(allVotesIn){
        gameState[gameID]["votingFinished"] = true;
    }
}





//TODO: implment removing players

// /** Remove a player from the game state if they disconnect */
// const removePlayer = (id) => {
//     // find the game that the player is in
//     Object.keys(gameState).forEach((gameID) => {
//         if (gameState[gameID].players[id] != undefined) {
//             gameState[gameID].players[id];
//         }
//     });
// };

/** Get a game. */
const getGame = (gameID) => {
    if(!(gameID in gameState)) {
        // ur bad
        console.log("Game " + gameID + " does not exist. (Inside getGame)");
        return {};
    }else{
        return gameState[gameID];
    }
}


/** Get a game. */
const gameExists = (gameID) => {
    return (gameID in gameState);
}



module.exports = {
  gameState,
  spawnPlayer,
  getGame,
    createGame,
    startGame,
    submitResponse,
    submitVote,
    gameExists,
    // 
//   removePlayer,
};
