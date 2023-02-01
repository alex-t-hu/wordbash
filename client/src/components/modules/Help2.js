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
        <div className={`absolute left-[-25%] top-0 w-[150%] h-full justify-center items-center ${props.helpVisible ? "z-[1]" : "z-[-1]"}`}>
           {!props.helpVisible ? 
            <div className=" flex flex-col justify-end w-0 left-8 bottom-8 items-center">
                    <button className="absolute bottom-[-50%] right-[38%] bg-blue-500 hover:bg-blue-400 text-white rounded-xl font-semibold py-2 px-4 border border-gray-400 shadow transition ease-in-out delay-50 hover:scale-[1.05] hover:scale-130 duration-300" onClick={()=>{props.setHelpVisible(true)}}>
                        <div className="flex flex-row space-x-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                            </svg>
                            <h1 className="text-xl">How to play</h1>
                        </div>
                    </button> 
            </div>
             :
          <div className={`absolute left-0 text-white z-20 `}>
            <div className="w-full bg-gray-50 flex flex-col space-y-4 items-center rounded-xl pb-4">
          <h1 className="w-full text-center bg-[#615756] text-white font-bold py-2 rounded-t-xl">First time?</h1>
            <div className="w-full flex flex-col space-y-4 items-center">
                <p className="w-11/12 text-center text-gray-700">
                Wordbash is a party game revolving around crazy AI-generated prompts and hilarious human-written responses.
                </p>
                
                <p className="w-11/12 text-center text-gray-700">
                You can get started very easily! First, invite your friends to a lobby by sending them a join code.
                Then, adjust the game settings depending on how wacky you want the AI's prompts to be and how many prompts each player answers.
                </p>
                <p className="w-11/12 text-center text-gray-700">

                Bash your head coming up with the funniest responses to these various AI-generated prompts!
                Each prompt that you answer will also be answered by a random friend. Players have limited time to respond, so wordbash quickly!
                </p>
                <p className="w-11/12 text-center text-gray-700">

                After everyone is done writing their responses, the voting phase of the game commences. For each prompt, everyone votes on the response
                they like more, and these votes award the players who wrote the responses up to 1000 points. If you beat your opponent in votes, you gain 100 points; 
                furthermore, if you win all the votes, you get a knockout worth an extra 1000 points!
                </p>
                <p className="w-11/12 text-center text-gray-700">

                At the end of the game, the player with the most points wins!
                </p>

                <button className="w-11/12 bg-[#615756] text-white font-bold py-2 rounded-xl hover:scale-[1.05] hover:scale-130 transition delay-50 ease-in-out duration-300" onClick={() => {props.setHelpVisible(false)}}>
                    Got it!
                </button>
            </div>
        </div>
        </div>}
        </div> 
    );
}
export default Help2;
