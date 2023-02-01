import React, { useEffect, useState } from "react";


const HELP_TEXT = `Wordbash is a party game about crazy AI generated prompts and hilarious human-written responses.

Gameplay is pretty simple. First, get together all your friends in a lobby by sending them the join code!
Adjust the game settings depending on how wacky you want the bot to be and how much time your friends have.

Then, each player will be presented their own unique AI-generate prompts!
Each player should answer with the funniest responses they can come up with.
Players have limit time to respond, so think quickly!

The voting phase of the game then begins. Players should pick whichever reponse they think is the funniest,
and the responders will accumulate points!

At the end of the game, the player with the most points wins!`

const Help2 = (props) => {
    

    return (
        <div className="w-full bg-gray-50 flex flex-col space-y-4 items-center rounded-xl pb-4">
          <h1 className="w-full text-center bg-[#615756] text-white font-bold py-2 rounded-t-xl">First time?</h1>
            <div className="w-full flex flex-col space-y-4 items-center">
                <p className="w-11/12 text-center text-gray-700">
                Wordbash is a party game about crazy AI generated prompts and hilarious human-written responses.
                </p>
                
                <p className="w-11/12 text-center text-gray-700">
                Gameplay is pretty simple. First, get together all your friends in a lobby by sending them the join code!
                Adjust the game settings depending on how wacky you want the bot to be and how much time your friends have.
                </p>
                <p className="w-11/12 text-center text-gray-700">

                Then, each player will be presented their own unique AI-generate prompts!
                Each player should answer with the funniest responses they can come up with.
                Players have limit time to respond, so think quickly!
                </p>
                <p className="w-11/12 text-center text-gray-700">

                The voting phase of the game then begins. Players should pick whichever reponse they think is the funniest,
                and the responders will accumulate points!
                </p>
                <p className="w-11/12 text-center text-gray-700">

                At the end of the game, the player with the most points wins!
                </p>

                <button className="w-11/12 bg-[#615756] text-white font-bold py-2 rounded-xl" onClick={() => {props.setHelpVisible(false)}}>Got it!</button>
            </div>

        </div>
    );
}
export default Help2;
