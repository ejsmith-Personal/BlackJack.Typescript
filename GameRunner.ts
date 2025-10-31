import { Deck } from "./Deck.ts";
import { Player } from "./Player.ts";
import * as readline from "readline"
import { createInterface } from 'node:readline/promises';

const rl = readline.createInterface({input: process.stdin, output: process.stdout})

export class GameRunner{
    public _dealer: Player;
    public _player1: Player;
    public currentPlayers: Player[];
    public _drawDeck: Deck;
    public _discardDeck: Deck;
    public currentBet: number;
    public playerNameEntry: string;
    public playerDepositEntry: number;

    constructor(Deck: Deck){
        this.currentPlayers = [];
        this._dealer = new Player ("Dealer", 99999, true);
        this._player1 = new Player("Placeholder", 0, false);
        this.currentPlayers.push(this._dealer, this._player1)
        this._drawDeck = Deck;
    }

    BeginGame(): void {
        this.RequestPlayerName()
        this.RequestPlayerDeposit();
        
        this._discardDeck = new Deck();
        this._drawDeck.CreateDeck();
        this._drawDeck.ShuffleDeck();
    }

    PrintGameInformation(): void {
        this._player1.PrintHandInfo();
        this._dealer.PrintHandInfo();
        var name = this._player1.GetPlayerName();
        var total = this._player1.GetHandValue(); 
        console.log(`${name} has a hand total of ${total} and the current bet is ${this.currentBet}\n`);
        name = this._dealer.GetPlayerName();
        total = this._dealer.GetHandValue();
        console.log(`${name} has a hand total of ${total}\n`);
        // console.log(this._dealer.GetHandValue());
    }

    RequestPlayerToHit(player: Player): void {
        // const requestPlayerHit = require("Would the player like to hit? Y/N?")
        // return requestPlayerHit;
        var playerHitOrStay: string;
        playerHitOrStay = player.HitOrStay();
        if (playerHitOrStay == "hit"){
            this._drawDeck.DrawCardAndDeal(player);
            console.log(`Player ${player.GetPlayerName()} current hand value: ${player.GetHandValue()}`);
        } else {
            console.log(`${player.GetPlayerName()} will stay with ${player.GetHandValue()}`);
        }
    }


    BeginRound(): void {
        // const playerBetInput = require('Enter the amount of your bet');
        // const currentBet = playerBetInput !== null ? parseInt(playerBetInput) : 0;
        // if (this._player1.CheckCurrentMoney() > currentBet){
        //     this._player1.BetMoney(currentBet);
        // }
        this.currentBet = 100;
        this._player1.BetMoney(this.currentBet);
        this._drawDeck.DealStartingHand(this._dealer, this._player1);
        this.PrintGameInformation();
        // this.RequestPlayerToHit(this._player1);
        this.currentPlayers.forEach(player => {
            this.PlayerTurn(player);
        })
    }

    PlayerTurn(player: Player): void {
        if(player.IsDealerCheck() == false){
            this.RequestPlayerToHit(player);
            if(player.GetHandValue() > 21){
                console.log(`You have ${player.GetHandValue()}. You have busted!`);
                player.DiscardCards();
            }
            //need logic to continue asking if player would like to hit. FOr now we'll do nothing just to exit the loop.
        }
        if (player.IsDealerCheck() == true){
            while(player.GetHandValue() < 16){
                this._drawDeck.DrawCardAndDeal(player)
                if(player.GetHandValue() > 21){
                    console.log(`The dealer has ${player.GetHandValue()}. The dealer has busted!`)
                };
            }
        }
    }


    EndRound(): void {
        //Need a method to pay out the player bet/subtract from total.
        this.DiscardCards(this._discardDeck, this._dealer);
        this.DiscardCards(this._discardDeck, this._player1);
        console.log("Round has ended");
        this.RequestPlayAnotherRound("N");

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
        this.currentPlayers.forEach(player => {
            //Go through the array of players and check if any given player is the dealer.
            if(player.IsDealerCheck() == false){
                //request player name
                player.SetPlayerName("EricNew");
            }
        })
        // rl.question("Please enter your player Name \n", (userInput)=>{
        // this.playerNameEntry = String(userInput);
        // console.log(`Welcome to the game ${this.playerNameEntry}`);
        // rl.close();
    }

    RequestPlayerDeposit(): void{
        this.currentPlayers.forEach(player => {
            if(player.IsDealerCheck() == false){
                player.DepositMoney(500);
            }
        })
        // var playerDeposit: number;
        // console.log("Please enter your deposit:");
        // playerDeposit = Number(rl.prompt());
    }

    DiscardCards(discardDeck: Deck, player: Player): void {
    //iterate through the cards that the player has
    player.CurrentCards.forEach(card => {
        // for each cards in the players hand. Add it to the discard it to the discard pile.
        var currentCard = card
        this._discardDeck.ReceiveDiscardCards(card);
        card.TurnCardFaceUp();
        player.DiscardCards();
        });
    }

    RequestPlayAnotherRound(answer: string): void {
        if(answer == "Y"){
            this.BeginRound()
        }
        else {
            process.exit();
        }
    }
}

