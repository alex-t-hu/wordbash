const ParentNamespace = require("socket.io/lib/parent-namespace");

const User = require("./models/user");


const PromptLoader = require("./prompt-loader");


/** constants */
const SCORE_MULTIPLIER = 50;
/** Game state
 * The game state is a dictionary of games, where each game is a dictionary of players
 * 
*/
const gameState = {}
/**

    gameState = {
        gameID: {
            num_Players: a number
            numRounds: a number
            numPrompts: num_Players * numRounds
            started: a boolean
            temperature: a number from 5 to 20. Divide by 10 for the actual temperature.
            promptsFinished: a boolean
            votingFinished: a boolean // This describes whether we are done voting on ALL prompts.
            terminated: a boolean   // This describes whether the game
                                    // has been terminated due to a player leaving.


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
                    response_0_vote_names: a list of strings
                    response_1_vote_names: a list of strings
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

*/

/*
-------------------------------- Helper functions --------------------------------
*/


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

const playerIDtoPlayerName = (id, gameID) => {
    return gameState[gameID]["players"][id]['name'];
}

/*
-------------------------------- Initialization --------------------------------
*/


/** Create a new game */
const createGame = (gameID) => {
    gameState[gameID] = {
        num_Players: 0,
        numRounds: 0,
        numPrompts: 0,
        started: false,
        temperature: 15,
        promptsFinished: false,
        votingFinished: false,
        votingResults: false,
        votingRound: 0,
        players: [],
        prompts: []
    }
    console.log("Created game " + gameID);
    
    return gameID;
}

const removePlayer = (playerID) => {
    // Remove player from all games.
    for(let game in gameState) {
        for(let i = 0; i < gameState[game]["players"].length; i++) {
            if(gameState[game]["players"][i]["id"] === playerID) {
                deletePlayerFromGame(i, game);
            }
        }
    }
}

    

const deletePlayerFromGame = (playerID, gameID) => {
    if(!gameState[gameID]) {
        console.log("Game " + gameID + " does not exist. (I'm inside deletePlayerFromGame)");
        return;
    }
    console.log("blah");
    console.log(playerID);
    console.log(IDtoPlayerID(playerID._id, gameID));
    gameState[gameID]["players"].splice(IDtoPlayerID(playerID._id, gameID), 1);
    gameState[gameID]["num_Players"] -= 1;

    // TODO: More graceful handling of player removal?
    console.log("Player " + playerID + " has been removed from game " + gameID);
    // gameState[gameID]["terminated"] = true;
    // console.log("Game " + gameID + " has been terminated.");

    // TODO: Currently we ignore this for debug purposes.
    if(gameState[gameID]["num_Players"] <= 0){
        console.log("Game " + gameID + " now has no players. It will be deleted.");
        delete gameState[gameID];
    }
    console.log(gameState[gameID]);
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
                        console.log("They are in a different game. However, we are not handling this yet.");
                        // deletePlayerFromGame(i, game);
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
    console.log(gameState[gameID]);
};


const startGame = (gameID, temperature, numRounds) => {
    // // Check if the game has at least 3 players.
    // if(gameState[gameID]["num_Players"] < 3) {
    //     console.log("Game " + gameID + " does not have enough players to start.");
    //     return;
    // }

    console.log("Starting game " + gameID);
    gameState[gameID]["numRounds"] = numRounds;
    gameState[gameID]["numPrompts"] = gameState[gameID]["num_Players"] * gameState[gameID]["numRounds"];

    gameState[gameID]["temperature"] = temperature;
    // Generate Prompts
    // TODO
    PromptLoader.getPromptSubset(temperature, gameState[gameID]["numPrompts"]).then((subset) => {
        console.log("Subset: " + subset);
        for(let i = 0; i < gameState[gameID]["numPrompts"]; i++) {
            gameState[gameID]["prompts"][i] = {
                content: subset[i],
                response_0_answer: "",
                response_1_answer: "",
                response_0_vote_names: [],
                response_1_vote_names: [],
                response_0_vote: [],
                response_1_vote: [],
                numNoVote: 0
            }
        }
        
        gameState[gameID]["started"] = true;
        console.log("Starting game for real " + gameID);
    });
}

/*
-------------------------------- Game Logic --------------------------------
*/

const submitResponse = (id, gameID, promptID, timedOut, response) => {
    console.log("just submitted response");
    const playerIdx = IDtoPlayerID(id, gameID);
    const numPlayers = gameState[gameID]["num_Players"];
    // const numPrompts = gameState[gameID]["numPrompts"];
    if(promptID % numPlayers === playerIdx ){
        gameState[gameID]["prompts"][promptID]["response_0_answer"] = response;
    }else if((promptID + 1) % numPlayers === playerIdx){
        gameState[gameID]["prompts"][promptID]["response_1_answer"] = response;
    }else{
        console.log("You can't answer this prompt! ( prompt " + promptID + " player " + playerIdx + " )");
    }
    // Check if all responses are in
    let allResponsesIn = true;
    for(let i = 0; i < gameState[gameID]["numPrompts"]; i++) {
        console.log("Checking prompt " + i + " responses: " + gameState[gameID]["prompts"][i]["response_0_answer"] + "|||" + gameState[gameID]["prompts"][i]["response_1_answer"]);
        if(gameState[gameID]["prompts"][i]["response_0_answer"] === "" || gameState[gameID]["prompts"][i]["response_1_answer"] === ""){
            if (timedOut) {
                console.log("Timed out. Submitting empty responses.");
                if (gameState[gameID]["prompts"][i]["response_0_answer"] === "") {
                    gameState[gameID]["prompts"][i]["response_0_answer"] = "(blank)"; // change hre if want to do smth funny for timeout
                }
                if (gameState[gameID]["prompts"][i]["response_1_answer"] === "") {
                    gameState[gameID]["prompts"][i]["response_1_answer"] = "(blank)";
                }
            }
            allResponsesIn = false;
        }
    }
    if(allResponsesIn || timedOut){
        gameState[gameID]["promptsFinished"] = true;
    }
}

const submitVote = (id, gameID, promptID, timedOut, response) => {
    playerID = IDtoPlayerID(id, gameID);
    playerName = playerIDtoPlayerName(playerID, gameID);

    // Check if player has already voted.
    // I want the playerID not the like google ID.
    if (timedOut) {
        console.log("Player " + playerID + " timed out. Submitting no vote.");
        gameState[gameID]["prompts"][promptID]["numNoVote"] += 1;
    } else {
        console.log("Player " + playerID + " is voting for prompt " + promptID + " response " + response);
        if(gameState[gameID]["prompts"][promptID]["response_0_vote"].includes(playerID) ||
            gameState[gameID]["prompts"][promptID]["response_1_vote"].includes(playerID)){
            console.log("You have already voted for this prompt!");
            return;
        }

        if(response === 0){
            gameState[gameID]["prompts"][promptID]["response_0_vote"].push(playerID);
            gameState[gameID]["prompts"][promptID]["response_0_vote_names"].push(playerName);
        }else if(response === 1){
            gameState[gameID]["prompts"][promptID]["response_1_vote"].push(playerID);
            gameState[gameID]["prompts"][promptID]["response_1_vote_names"].push(playerName);
        }else{
            console.log("You can't vote for this response! ( response " + response + " )");
        }
    }
    
   console.log("BWWAHA1 ", gameState[gameID]["prompts"][promptID]["response_0_vote"]);
   console.log("BWWAHA2 ", gameState[gameID]["prompts"][promptID]["response_1_vote"]); 
    // Check if all votes are in for the current prompt.
    if(gameState[gameID]["prompts"][
        gameState[gameID]["votingRound"]
    ]["response_0_vote"].length
    + gameState[gameID]["prompts"][
        gameState[gameID]["votingRound"]
    ]["response_1_vote"].length + gameState[gameID]["prompts"][gameState[gameID]["votingRound"]]["numNoVote"]
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
    
    if(gameState[gameID]["votingRound"] >= gameState[gameID]["numPrompts"]){
        gameState[gameID]["votingFinished"] = true;
        uploadResults(gameID);
    }
}

const uploadResults = (gameID) => {
    // Find the player with the highest score.
    let maxScore = 0;
    let maxScorePlayer = -1;
    for(let i = 0; i < gameState[gameID]["num_Players"]; i++){
        if(gameState[gameID]["players"][i]["score"] > maxScore){
            maxScore = gameState[gameID]["players"][i]["score"];
            maxScorePlayer = i;
        }
    }
    
    // Update database with the results of the game.
    for(let i = 0; i < gameState[gameID]["num_Players"]; i++) {
        let player = gameState[gameID]["players"][i];
        let score = player["score"];
        let id = player["id"];
        
        // Update the user in the MongoDB database
        User.findById(id).then((user) => {
            if(score > user.high_score){
                user.high_score = score;
            }
            user.games_played += 1;
            if(i === maxScorePlayer){
                user.games_won += 1;
            }
            user.save();
        });
    }
}



const updateScore = (gameID) => {
    // Update score for the current voting round.
    const numPlayers = gameState[gameID]["num_Players"];
    let rd = gameState[gameID]["votingRound"];
    gameState[gameID]["players"][rd % numPlayers]["score"] += gameState[gameID]["prompts"][rd]["response_0_vote"].length * SCORE_MULTIPLIER;


    gameState[gameID]["players"][
        (rd + 1) % numPlayers
    ]["score"] += gameState[gameID]["prompts"][rd]["response_1_vote"].length * SCORE_MULTIPLIER;
}


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
    removePlayer,
    deletePlayerFromGame,
    getGame,
    createGame,
    startGame,
    submitResponse,
    submitVote,
    gameExists,
    doneVoting,
};
