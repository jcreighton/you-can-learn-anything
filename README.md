# you-can-learn-anything

##Overview
Hello! This code challenge rocks and here are some notes on choices I made:

- A tech stack I'm familiar with and genuinely enjoy working with (React, Node)
- Web workers! I chose to use a Web Worker for parsing the code and generating the feedback messages. This moved the heavy lifting to another thread, freeing up the UI, and let me play with a new technology.
- Esprima and Acorn were relatively comparative. Acorn came with its own walker, which is nice, and the documentation looked nicer but I checked the speed comparisons for Esprima before making a choice. Acorn was faster in Chrome but Esprima beat Acorn in all other browsers and the difference in Safari was quite staggering.
- I needed a walk function, so I borrowed that from here: https://github.com/jrajav/esprima-walk
- I modified the walk function to create the `walkStructure` function
- The Feedback UI alerts the user to when she/he writes the correct structure. It does not alert them when the structure is incorrect. I debated what to do about this as I felt it might be annoying to receive an IncorrectStructure message when you're first writing out a program. I'd love to discuss this part.
- The Feedback UI alerts the user to when she/he writes a whitelist or blacklist item but just once. Example: If the user wrote multiple VariableDeclarations, the Feedback UI would alert the user once.
- No testing (for now). I didn't start off with a great idea of what this would look like and refactored as I went, so I chose to abandon testing for the meanwhile. I ran out of time to add it later.
- No production build for Webpack (yet)

##Architecture
- NodeJS
- Webpack
- React 
- React-Codemirror 
- CSS

##Run it
- npm install
- npm run build
- npm run start
- localhost:8000/editor

##Whitelist, Blacklist, Structure Example
- blacklist: ['IfStatement'],
- whitelist: ['ForStatement', 'WhileStatement', 'VariableDeclaration'],
- structure: 'function _(_) { while(_) {} }'

##To Do
- Implement tests
- Nicer feedback statements using ES6 string templates
- Separate feedback functionality into separate script
- Production Webpack build
