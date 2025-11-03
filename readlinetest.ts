import * as readline from "readline";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({input: process.stdin, output: process.stdout});

let num1 = Math.floor((Math.random() * 10) + 1);
let num2 = Math.floor((Math.random() * 10) + 1);
let answer = num1 + num2;

console.log("Opening Statement)")

rl.question(`What is ${num1} + ${num2}? \n`, (userInput)=>{
    console.log(userInput);
    let userInputToNumber = Number(userInput);
    if(userInputToNumber == answer){
        rl.close();
    }
    else {
        rl.setPrompt('Incorrect response, please try again \n');
        rl.prompt();
        rl.on('line', (userInput) => {
            let userInputToNumber = Number(userInput)
            if(userInputToNumber == answer){
                rl.close();
            }
            else{      
                rl.setPrompt(`Your answer of ${userInput} is incorrect \n`);
                rl.prompt();
            }
        });
    }
});

rl.on('close', ()=>{
    console.log('Correct');
})