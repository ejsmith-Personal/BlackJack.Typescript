import { Deck } from "./Deck.ts";
import { Player } from "./Player.ts";
import * as readline from "readline"
import { createInterface } from 'node:readline/promises';

const rl = readline.createInterface({input: process.stdin, output: process.stdout})

export class GameRunner{
    public _dealer: Player;
    public _player1: Player;
    public _deck: Deck;
    public currentBet: number;
    public playerNameEntry: string;
    public playerDepositEntry: number;

    constructor(Dealer: Player, Player1: Player, Deck: Deck){
        this._dealer = Dealer;
        this._player1 = Player1;
        this._deck = Deck;
    }

    BeginGame(): void {
        this.RequestPlayerName()
        this.RequestPlayerDeposit();
        
        this._player1 = new Player(this.playerNameEntry, this.playerDepositEntry, false);
        this._dealer = new Player("Dealer", 10001, true)
        
        this._deck.CreateDeck();
        this._deck.ShuffleDeck();
    }

    PrintGameInformation(): void {
        this._player1.PrintHandInfo();
        this._dealer.PrintHandInfo();
        var name = this._player1.GetPlayerName();
        var total = this._player1.GetHandValue(); 
        console.log(`${name} has a hand total of ${total} and the current bet is ${this.currentBet}`);
        name = this._dealer.GetPlayerName();
        total = this._dealer.GetHandValue();
        console.log(`${name} has a hand total of ${total}`);
        // console.log(this._dealer.GetHandValue());
    }

    RequestPlayerToHit(): string {
        // const requestPlayerHit = require("Would the player like to hit? Y/N?")
        // return requestPlayerHit;
        return "hello";
    }

    BeginRound(): void {
        // const playerBetInput = require('Enter the amount of your bet');
        // const currentBet = playerBetInput !== null ? parseInt(playerBetInput) : 0;
        // if (this._player1.CheckCurrentMoney() > currentBet){
        //     this._player1.BetMoney(currentBet);
        // }
        this._deck.DealStartingHand(this._dealer, this._player1);
        this.PrintGameInformation();
    }

    // async function EnterPlayerInformation2(): Promise<void> {
    //     var playerDeposit: number;
    //     this._dealer = new Player("Dealer", 10001, true)
    //     const playerNameEntry = await rl.question("Please enter your player Name \n", (userInput)=>{
    //             this.playerNameEntry = String(userInput);;
    //             console.log(`Welcome to the game ${playerNameEntry}`);
    //         rl.close();
    //     });
    // }

    EnterPlayerInformation(): void {
        var playerDeposit: number;
        this._dealer = new Player("Dealer", 10001, true)
        rl.question("Please enter your player Name \n", (userInput)=>{

                console.log(`Welcome to the game ${this.playerNameEntry}`);
                rl.close();
                
        })
        rl.question("Please the amount of your deposit:", (userInput)=>{
                    playerDeposit = Number(userInput);
                    console.log(`You have deposited $${playerDeposit}`);
                    this._player1 = new Player (this.playerNameEntry, this.playerDepositEntry, false);
                    console.log(`Player ${this._player1.GetPlayerName()} has ${this._player1.CheckCurrentMoney()}`)  
                    rl.close();      
        });
    }

    RequestPlayerName(): void{
        rl.question("Please enter your player Name \n", (userInput)=>{
        this.playerNameEntry = String(userInput);
        console.log(`Welcome to the game ${this.playerNameEntry}`);
        rl.close();
    });
}


    RequestPlayerDeposit(): void{
        var playerDeposit: number;
        console.log("Please enter your deposit:");
        playerDeposit = Number(rl.prompt());
    }
}