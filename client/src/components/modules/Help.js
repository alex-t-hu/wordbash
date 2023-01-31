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

const Help = (props) => {
    
  const [chatOpen, setChatOpen] = useState(false);

    return (
        <>
        <div className="h-full flex flex-col justify-end w-0 left-8 bottom-8">
            <button
              className={`${chatOpen ? 
                "ease-in-out duration-500 -translate-x-full bg-gray-50 bg-opacity-0 hover:bg-opacity-30 border border-gray-500": 
                "ease-in-out duration-500 -translate-x-full bg-blue-500 hover:bg-blue-400"
              } w-14 h-14 font-semibold py-2 px-4 rounded-full shadow flex text-l items-center cursor-pointer bottom-6 z-50`}
              onClick={() => setChatOpen(!chatOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>

            </button>
          </div>
          
          <div className={`left-0 text-white z-20 ease-in-out duration-500 
          ${
            chatOpen ? "w-[30%]" : "w-0"
          }`}>
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

                <button className="w-11/12 bg-[#615756] text-white font-bold py-2 rounded-xl" onClick={() => setChatOpen(!chatOpen)}>Got it!</button>
            </div>

        </div>

          </div>
        
        </> 
)
            }
            export default Help;
