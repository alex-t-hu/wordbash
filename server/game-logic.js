const ParentNamespace = require("socket.io/lib/parent-namespace");

const User = require("./models/user");


const PromptLoader = require("./prompt-loader");

const socketManager = require("./server-socket");



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
            returnToLobby: a list of which player's HEX IDs have returned to the lobby. Use Hex IDs to allow for players to potentially leave.

            votingResults: a boolean // This is the important one.
            // It gets toggled to true when all responses are in.
            // It gets toggled to false when the host starts the next round of voting.
            // If true, the clients are currently staring at the voting results boi.
            votingRound: a number
            promptStartTime: milliseconds since 1970 when the current prompt round was started (as of now, we have 1 prompt round)
            prompts: {
                id (a number from 0 to numPrompts-1):{
                    timestamp for round start (TODO)
                    votingStartTime: Date.now(); time in milliseconds since 1970 for when voting round was started
                    content
                    // players id%N and (id +1)%N will answer this, everyone else will vote.
                    
                    Response 0: a string (corresponds to id)
                    Response 1: a string (corresponds to id + 1)
                    response_0_vote_names: a list of strings
                    response_1_vote_names: a list of strings
                    response_0_avatar
                    response_1_avatar
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
                    avatar (actual avatar)
                    id (actual hex id)
                    score
                    scoreIncrease (the score increase for this round)
                    knockouts (number of 2000s)
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

const playerIDtoPlayerAvatar = (id, gameID) => {
    return gameState[gameID]["players"][id]['avatar'];
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
        prompts: [],
        returnToLobby: []
    }
    // console.log"Created game " + gameID);
    socketManager.gameJustChanged(gameState[gameID], "createGame");

    return gameID;
}

const removePlayer = (playerID) => {
    // Remove player from all games.
    for(let game in gameState) {
        for(let i = 0; i < gameState[game]["players"].length; i++) {
            if(gameState[game]["players"][i]["id"] === playerID) {
                deletePlayerFromGame(i, game);
                socketManager.gameJustChanged(gameState[game], "removePlayer");
            }
        }
    }
}

    

const deletePlayerFromGame = (playerID, gameID) => {
    if(!gameState[gameID]) {
        // console.log"Game " + gameID + " does not exist. (I'm inside deletePlayerFromGame)");
        return;
    }
    // console.log"blah");
    // console.logplayerID);
    // console.logIDtoPlayerID(playerID._id, gameID));
    gameState[gameID]["returnToLobby"].splice(IDtoPlayerID(playerID._id, gameID), 1);
    gameState[gameID]["players"].splice(IDtoPlayerID(playerID._id, gameID), 1);
    gameState[gameID]["num_Players"] -= 1;
    

    // TODO: More graceful handling of player removal?
    // console.log"Player " + playerID + " has been removed from game " + gameID);
    // gameState[gameID]["terminated"] = true;
    // // console.log"Game " + gameID + " has been terminated.");

    // TODO: Currently we ignore this for debug purposes.
    if(gameState[gameID]["num_Players"] <= 0){
        // console.log"Game " + gameID + " now has no players. It will be deleted.");
        delete gameState[gameID];
    }
    // console.loggameState[gameID]);
    socketManager.gameJustChanged(gameState[gameID], "deletePlayerFromGame");

}

/** Adds a player to the game state */
const spawnPlayer = (id, name, avatar, gameID) => {
    if(!gameState[gameID]) {
        // ur bad
        // console.log"Game " + gameID + " does not exist. (I'm inside spawnPlayer)");
    }else{

        // Check if a player is in any game. If they are, remove them.
        for(let game in gameState) {
            for(let i = 0; i < gameState[game]["num_Players"]; i++) {
                if(gameState[game]["players"][i]["id"] === id) {
                    // console.log"Player " + id + " is already in game " + game);
                    if(game === gameID){
                        // console.log"They are already in the game they are trying to join. Nothing will happen.");
                        return;
                    }else{
                        // console.log"They are in a different game. However, we are not handling this yet.");
                        // deletePlayerFromGame(i, game);
                    }
                }
            }
        }
        
        
        
        // console.log"Spawning player " + id + " in game " + gameID);
        
        gameState[gameID]["players"][gameState[gameID]["num_Players"]] = {
            id: id,
            score : 0,
            scoreIncrease : 0,
            name : name,
            avatar : avatar,
            knockouts : 0
        };

        gameState[gameID]["num_Players"] += 1;
        gameState[gameID]["returnToLobby"].push(id); // Hex ID.

    }
    // console.loggameState[gameID]);
    socketManager.gameJustChanged(gameState[gameID], "spawnPlayer");

};


const startGame = (gameID, temperature, numRounds) => {
    // // Check if the game has at least 3 players.
    // if(gameState[gameID]["num_Players"] < 3) {
    //     // console.log"Game " + gameID + " does not have enough players to start.");
    //     return;
    // }

    // Reset everything.
    gameState[gameID]["promptsFinished"] = false;
    gameState[gameID]["votingFinished"] = false;
    gameState[gameID]["votingResults"] = false;
    gameState[gameID]["votingRound"] = 0;
    gameState[gameID]["returnToLobby"] = [];

    if (gameState[gameID]["started"]) {
        // console.log"Game " + gameID + " has already started.");
        return;
    }

    gameState[gameID]["started"] = true;
    


    gameState[gameID]["numRounds"] = numRounds;
    gameState[gameID]["numPrompts"] = gameState[gameID]["num_Players"] * gameState[gameID]["numRounds"];

    gameState[gameID]["temperature"] = temperature;
    // Generate Prompts
    // TODO
    // console.log"Generating prompts..." + gameState[gameID]["numPrompts"]);
    PromptLoader.getPromptSubset(temperature, gameState[gameID]["numPrompts"]).then((subset) => {
        // console.log"Subset: " + subset);
        for(let i = 0; i < gameState[gameID]["numPrompts"]; i++) {
            gameState[gameID]["prompts"][i] = {
                content: subset[i],
                response_0_answer: "",
                response_1_answer: "",
                response_0_person_name: gameState[gameID]["players"][i %  gameState[gameID]["num_Players"]]["name"],
                response_1_person_name: gameState[gameID]["players"][(i + 1) %  gameState[gameID]["num_Players"]]["name"],
                response_0_avatar: gameState[gameID]["players"][i %  gameState[gameID]["num_Players"]]["avatar"],
                response_1_avatar: gameState[gameID]["players"][(i + 1) %  gameState[gameID]["num_Players"]]["avatar"],
                response_0_person_id: "",
                response_1_person_id: "",
                response_0_vote_names: [],
                response_0_vote_avatars: [],
                response_1_vote_names: [],
                response_1_vote_avatars: [],
                response_0_vote: [],
                response_1_vote: [],
                votingStartTime: 0
            }
        }
         
        gameState[gameID]["currentPrompt"] = 0;
        gameState[gameID]["promptStartTime"] = Date.now();
        // console.log"Starting game for real " + gameID);
        // console.log"start time is ", gameState[gameID]["promptStartTime"]);
        // console.log"Starting game " + gameID);


        socketManager.gameJustChanged(gameState[gameID], "startGame");

    });
}

/*
-------------------------------- Game Logic --------------------------------
*/

const submitResponse = (id, gameID, promptID, timedOut, response) => {
    // keke update promptNumber stored for the playerIdx to be 1 more than previously
    // console.log"just submitted response");
    const playerIdx = IDtoPlayerID(id, gameID);
    const numPlayers = gameState[gameID]["num_Players"];
    if(gameState[gameID]["promptsFinished"]) {
        // console.log"this shouldn't be happening. game-logic.js, still submitting responses after all responses have been submitted.");
    }
    // const numPrompts = gameState[gameID]["numPrompts"];
    let allResponsesIn = true;
    if (!timedOut) {
        if(promptID % numPlayers === playerIdx ){ // keke there's a random mapping from promptID to playerIdx. promptID from kN to (k+1)N-1 maps to perm[promptID%N], perm[promptID%N] -k
            gameState[gameID]["prompts"][promptID]["response_0_answer"] = response;
        }else if((promptID + 1) % numPlayers === playerIdx){
            gameState[gameID]["prompts"][promptID]["response_1_answer"] = response;
        }else{
            // console.log"You can't answer this prompt! ( prompt " + promptID + " player " + playerIdx + " )");
        }
        // Check if all responses are in 
        for(let i = 0; i < gameState[gameID]["numPrompts"]; i++) { // keke promptIdx / numPlayers
            // console.log"Checking prompt " + i + " responses: " + gameState[gameID]["prompts"][i]["response_0_answer"] + "|||" + gameState[gameID]["prompts"][i]["response_1_answer"]);
            if(gameState[gameID]["prompts"][i]["response_0_answer"] === "" || gameState[gameID]["prompts"][i]["response_1_answer"] === ""){
                // console.log"in game-logic/submitResponse, found that not timed out and all response are not in yet");
    
                allResponsesIn = false;
            }
        }
    } else {
        
        // Check if all responses are in
        // console.log"checking and replacing all empty responses with (blank) after timing out prompt. in game-logic.js.")
        for(let i = 0; i < gameState[gameID]["numPrompts"]; i++) {
            // console.log"Checking prompt " + i + " responses: " + gameState[gameID]["prompts"][i]["response_0_answer"] + "|||" + gameState[gameID]["prompts"][i]["response_1_answer"]);
                    if (gameState[gameID]["prompts"][i]["response_0_answer"] === "") {
                        gameState[gameID]["prompts"][i]["response_0_answer"] = "(blank)"; // change hre if want to do smth funny for timeout
    
                    }
                    if (gameState[gameID]["prompts"][i]["response_1_answer"] === "") {
                        gameState[gameID]["prompts"][i]["response_1_answer"] = "(blank)";
                    }
        }
    }
    
    if(allResponsesIn || timedOut){
        if (!gameState[gameID]["promptsFinished"]) {
            // console.log"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX All responses in for game " + gameID);
            // need to find the start time of the current round
        }
        gameState[gameID]["promptsFinished"] = true;
        gameState[gameID]["prompts"][0]["votingStartTime"] = Date.now();
    }
    socketManager.gameJustChanged(gameState[gameID], "submitResponse");

}

const submitVote = (id, gameID, timedOut, response) => {
    playerID = IDtoPlayerID(id, gameID);
    playerName = playerIDtoPlayerName(playerID, gameID);
    playerAvatar = playerIDtoPlayerAvatar(playerID, gameID);

    promptID = gameState[gameID]["votingRound"];

    // Check if player has already voted.
    // I want the playerID not the like google ID.
    if (timedOut) {
        // console.log"Player " + playerID + " timed out. Submitting no vote.");
        
        // console.log"Voting round " + gameState[gameID]["votingRound"] + " finished!");
        updateScore(gameID);


    } else {
        // console.log"Player " + playerID + " is voting for prompt " + promptID + " response " + response);
        // if(gameState[gameID]["prompts"][promptID]["response_0_vote"].includes(playerID) ||
        //     gameState[gameID]["prompts"][promptID]["response_1_vote"].includes(playerID)){
        if (gameState[gameID]["prompts"][promptID]["response_0_vote"].includes(playerID)) {
            let idx = gameState[gameID]["prompts"][promptID]["response_0_vote"].indexOf(playerID)

            gameState[gameID]["prompts"][promptID]["response_0_vote"].splice(idx, 1);
            gameState[gameID]["prompts"][promptID]["response_0_vote_names"].splice(idx, 1);
            gameState[gameID]["prompts"][promptID]["response_0_vote_avatars"].splice(idx, 1);
            console.log("Player " + playerID + " already voted for 0, so we will remove it.");
        }
        if (gameState[gameID]["prompts"][promptID]["response_1_vote"].includes(playerID)) {
            let idx = gameState[gameID]["prompts"][promptID]["response_1_vote"].indexOf(playerID)

            gameState[gameID]["prompts"][promptID]["response_1_vote"].splice(idx, 1);
            gameState[gameID]["prompts"][promptID]["response_1_vote_names"].splice(idx, 1);
            gameState[gameID]["prompts"][promptID]["response_1_vote_avatars"].splice(idx, 1);

            // console.log"Player " + playerID + " already voted for 1, so we will remove it.");
        }
        // }

        if(response === 0){
            gameState[gameID]["prompts"][promptID]["response_0_vote"].push(playerID);
            gameState[gameID]["prompts"][promptID]["response_0_vote_names"].push(playerName);
            gameState[gameID]["prompts"][promptID]["response_0_vote_avatars"].push(playerAvatar);
        }else if(response === 1){
            gameState[gameID]["prompts"][promptID]["response_1_vote"].push(playerID);
            gameState[gameID]["prompts"][promptID]["response_1_vote_names"].push(playerName);
            gameState[gameID]["prompts"][promptID]["response_1_vote_avatars"].push(playerAvatar);
        }else{
            // console.log"You can't vote for this response! ( response " + response + " )");
        }
    }
    
//    // console.log"BWWAHA1 ", gameState[gameID]["prompts"][promptID]["response_0_vote"]);
//    // console.log"BWWAHA2 ", gameState[gameID]["prompts"][promptID]["response_1_vote"]); 
    // Check if all votes are in for the current prompt.
    if(gameState[gameID]["prompts"][promptID]["response_0_vote"].length
    + gameState[gameID]["prompts"][promptID]["response_1_vote"].length
    >= gameState[gameID]["num_Players"]){ // TODO: for testing purposes. Later, change to >= blah - 2
        
        // console.log"Voting round " + promptID + " finished!");
        updateScore(gameID);
        // Don't update voting round yet!!
        // The voting round will get updated when the client sends a doneVoting message.
    }
    // Check if all votes are in for all prompts.
    socketManager.gameJustChanged(gameState[gameID], "submitVote");

    
}

const doneVoting = (gameID) => {
    if(gameState[gameID]["votingResults"]){
        gameState[gameID]["votingResults"] = false;
        gameState[gameID]["votingRound"] += 1;
        const promptIdx = gameState[gameID]["votingRound"];
        if (promptIdx < gameState[gameID]["numPrompts"]) {
            gameState[gameID]["prompts"][promptIdx]["votingStartTime"] = Date.now();
        }
        // console.log"We are done voting.");
        
        if(gameState[gameID]["votingRound"] >= gameState[gameID]["numPrompts"]){
            gameState[gameID]["votingFinished"] = true;
            gameState[gameID]["started"] = false;
            concludeGame(gameID);
        }

            
        // Reset all scoreincrease
        for(let i = 0; i < gameState[gameID]["num_Players"]; i++){
            gameState[gameID]["players"][i]["scoreIncrease"] = 0;
        }

        socketManager.gameJustChanged(gameState[gameID], "doneVoting");
    }else{
        // console.log"doneVoting called when votingResults is false.");
    }
}

const concludeGame = (gameID) => {
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
        let knockouts = player["knockouts"];
        
        // Update the user in the MongoDB database
        User.findById(id).then((user) => {
            if(score > user.high_score){
                user.high_score = score;
            }
            user.games_played += 1;
            if(i === maxScorePlayer){
                user.games_won += 1;
            }
            if(user.knockouts === undefined){
                user.knockouts = 0;
            }
            user.knockouts += knockouts;

            user.save();
        });
    }
}

const rejoinGame = (playerID, gameID) => {
    if(gameState[gameID]){
        gameState[gameID]["returnToLobby"].push(playerID); // Yay a player is returning to the lobby!
    }else{
        // console.log"rejoinGame called on a game that doesn't exist.");
    }
    socketManager.gameJustChanged(gameState[gameID], "rejoinGame");
}




const updateScore = (gameID) => {
    if(gameState[gameID]["votingResults"]){
        console.log("updateScore called when votingResults is true.");
        return;
    }
    gameState[gameID]["votingResults"] = true;
    // Update score for the current voting round.
    // console.log"Before update score, round ", gameState[gameID]["votingRound"]);
    // console.log"gameState: ", gameState[gameID]);
    // console.log"players", gameState[gameID]["players"]);
    const numPlayers = gameState[gameID]["num_Players"];
    let rd = gameState[gameID]["votingRound"];

    let vote0 = gameState[gameID]["prompts"][rd]["response_0_vote"].length;
    let vote1 = gameState[gameID]["prompts"][rd]["response_1_vote"].length;

    let score0 = 0;
    let score1 = 0;

    if(vote0 == vote1){
        // Tie. Both players get 500 points.
        score0 = 500;
        score1 = 500;
    }else{
        // Players get points proportional to the number of votes they got.
        score0 = Math.floor(vote0 / (vote0 + vote1) * 1000);
        score1 = Math.floor(vote1 / (vote0 + vote1) * 1000);

        // The winner gets a 100 point bonus.
        if(vote0 > vote1){
            score0 += 100;
        }else{
            score1 += 100;
        }

        // If one player got 0 votes, the other player gets 2000 points.
        if(vote0 == 0){
            score0 = 0;
            score1 = 2000;
            gameState[gameID]["players"][rd % numPlayers]["knockouts"] += 1;
        }else if(vote1 == 0){
            score0 = 2000;
            score1 = 0;
            gameState[gameID]["players"][(rd + 1) % numPlayers]["knockouts"] += 1;
        }
    }

    gameState[gameID]["players"][rd % numPlayers]["score"] += score0;
    gameState[gameID]["players"][(rd + 1) % numPlayers]["score"] += score1;

    // Update scoreIncrease for the current voting round.
    gameState[gameID]["players"][rd % numPlayers]["scoreIncrease"] = score0;
    gameState[gameID]["players"][(rd + 1) % numPlayers]["scoreIncrease"] = score1;
    // console.log"After update score, round ", gameState[gameID]["votingRound"]);
    // console.log"gameState: ", gameState[gameID]);
    // console.log"players", gameState[gameID]["players"]); 
}


/** Get a game. */
const getGame = (gameID) => {
    if(!(gameID in gameState)) {
        // ur bad
        // console.log"Game " + gameID + " does not exist. (Inside getGame)");
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
    rejoinGame,
    submitResponse,
    submitVote,
    gameExists,
    doneVoting,
};
