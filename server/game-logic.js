const ParentNamespace = require("socket.io/lib/parent-namespace");

/** constants */
const MAX_GAME_ID = 1000000;
const SCORE_MULTIPLIER = 50;
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
            votingFinished: a boolean // This describes whether we are done voting on ALL prompts.

            votingResults: a boolean // This is the important one.
            // It gets toggled to true when all responses are in.
            // It gets toggled to false when the host starts the next round of voting.
            // If true, the clients are currently staring at the voting results boi.

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
                player_id:{ (a number from 0 to N-1)
                    name (actual name)
                    id (actual hex id)
                    score
                }
                
            }

        }
    }

/** Create a new game */
const createGame = (gameID, userID) => {
    // const gameID = Math.floor(Math.random() * MAX_GAME_ID);
    // while(gameState[gameID] != undefined) {
    //     gameID = Math.floor(Math.random() * MAX_GAME_ID);
    // }
    gameState[gameID] = {
        num_Players: 0,
        started: false,
        promptsFinished: false,
        votingFinished: false,
        votingResults: false,
        votingRound: 0,
        players: [],
        prompts: {}
    }
    console.log("Created game " + gameID);
    
    return gameID;
}

const deletePlayerFromGame = (playerID, gameID) => {
    if(!gameState[gameID]) {
        console.log("Game " + gameID + " does not exist. (I'm inside deletePlayerFromGame)");
        return;
    }
    gameState[gameID]["players"].splice(playerID, 1);
    gameState[gameID]["num_Players"] -= 1;

    // TODO: Currently we ignore this for debug purposes.
    // if(gameState[gameID]["num_Players"] <= 2){
    //     console.log("Game " + gameID + " now has less than or equal to 2 players. It will be deleted.");
    //     delete gameState[gameID];
    // }
}

/** Adds a player to the game state */
const spawnPlayer = (id, name, gameID) => {
    if(!gameState[gameID]) {
        // ur bad
        console.log("Game " + gameID + " does not exist. (I'm inside spawnPlayer)");
    }else{

        // Check if a player is in any game. If they are, remove them.
        for(let game in gameState) {
            for(let i = 0; i < gameState[game]["num_Players"]; i++) {
                if(gameState[game]["players"][i]["id"] === id) {
                    console.log("Player " + id + " is already in game " + game);
                    if(game === gameID){
                        console.log("They are already in the game they are trying to join. Nothing will happen.");
                        return;
                    }else{
                        console.log("They are in a different game. They will be removed from that game.");
                        deletePlayerFromGame(i, game);
                    }
                }
            }
        }
        
        
        
        console.log("Spawning player " + id + " in game " + gameID);
        
        gameState[gameID]["players"][gameState[gameID]["num_Players"]] = {
            id: id,
            score : 0,
            name : name
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
    // // Check if the game has at least 3 players.
    // if(gameState[gameID]["num_Players"] < 3) {
    //     console.log("Game " + gameID + " does not have enough players to start.");
    //     return;
    // }

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

const IDtoPlayerID = (id, gameID) => {
    for(let i = 0; i < gameState[gameID]["num_Players"]; i++){
        if(gameState[gameID]["players"][i]['id'] === id){
            return i;
        }
    }
    return -1;
}

const IDtoPlayerName = (id, gameID) => {
    return gameState[gameID]["players"][IDtoPlayerID(id, gameID)]['name'];
}

const PlayerIDtoPlayerName = (id, gameID) => {
    return gameState[gameID]["players"][id]['name'];
}


const submitResponse = (id, gameID, promptID, response) => {
    playerIdx = IDtoPlayerID(id, gameID);
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

const submitVote = (id, gameID, promptID, response) => {
    playerID = IDtoPlayerID(id, gameID);

    // Check if player has already voted.
    // I want the playerID not the like google ID.
    console.log("Player " + playerID + " is voting for prompt " + promptID + " response " + response);
    if(gameState[gameID]["prompts"][promptID]["response_0_vote"].includes(playerID) ||
    gameState[gameID]["prompts"][promptID]["response_1_vote"].includes(playerID)){
        console.log("You have already voted for this prompt!");
        return;
    }

    if(response === 0){
        gameState[gameID]["prompts"][promptID]["response_0_vote"].push(playerID);
    }else if(response === 1){
        gameState[gameID]["prompts"][promptID]["response_1_vote"].push(playerID);
    }else{
        console.log("You can't vote for this response! ( response " + response + " )");
    }
    // Check if all votes are in for the current prompt.
    if(gameState[gameID]["prompts"][
        gameState[gameID]["votingRound"]
    ]["response_0_vote"].length
    + gameState[gameID]["prompts"][
        gameState[gameID]["votingRound"]
    ]["response_1_vote"].length
    >= gameState[gameID]["num_Players"]){ // TODO: for testing purposes. Later, change to >= blah - 2
        
        console.log("Voting round " + gameState[gameID]["votingRound"] + " finished!");
        updateScore(gameID);
        gameState[gameID]["votingResults"] = true;
        // Don't update voting round yet!!
        // The voting round will get updated when the client sends a doneVoting message.

    }
    // Check if all votes are in for all prompts.
    
}

const doneVoting = (gameID) => {
    gameState[gameID]["votingResults"] = false;
    gameState[gameID]["votingRound"] += 1;
    console.log("We are done voting.");
    
    if(gameState[gameID]["votingRound"] >= gameState[gameID]["num_Players"]){
        gameState[gameID]["votingFinished"] = true;
    }
}



const updateScore = (gameID) => {
    // Update score for the current voting round.
    let rd = gameState[gameID]["votingRound"];
    gameState[gameID]["players"][rd]["score"] += gameState[gameID]["prompts"][rd]["response_0_vote"].length * SCORE_MULTIPLIER;


    gameState[gameID]["players"][
        (rd + 1) % gameState[gameID]["num_Players"]
    ]["score"] += gameState[gameID]["prompts"][rd]["response_1_vote"].length * SCORE_MULTIPLIER;
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
    doneVoting,
    // 
//   removePlayer,
};
