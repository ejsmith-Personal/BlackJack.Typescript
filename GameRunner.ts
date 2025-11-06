import { Deck } from "./Deck.ts";
import { Player } from "./Player.ts";
import * as readline from "readline"
import { createInterface } from 'node:readline/promises';
import { resolve } from "node:dns";
import { promisify } from "node:util";

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
        this.currentPlayers.push(this._player1, this._dealer)
        this._drawDeck = Deck;
    }

    GameSetup(): void {

        this.RequestPlayAnotherRound()
        this.RequestPlayerDeposit();
        this.BeginGame()
    }
    BeginGame(): void {

        this._discardDeck = new Deck();
        this._drawDeck.CreateDeck();
        this._drawDeck.ShuffleDeck();
        this.BeginRound()
    }

    BeginRound(): void {
        // const playerBetInput = require('Enter the amount of your bet');
        // const currentBet = playerBetInput !== null ? parseInt(playerBetInput) : 0;
        // if (this._player1.CheckCurrentMoney() > currentBet){
        //     this._player1.BetMoney(currentBet);
        // }
        console.log("----------Beginning Round----------\n");
        //logic for betting
        // rl.question(`${this._player1.GetPlayerName()}. How much would you like to bet this round?\n`, (userInput)=>{
        //     this.currentBet = Number(userInput);
        //     console.log(`${this._player1.GetPlayerName()} has bet ${this.currentBet}`)
        // });
        //Left off here 11/5/2025. Is the player making the bet not the same one as losing the hand somehow?
        console.log("Here is the place where you'll be asked for a bet amount \n");
        this.currentBet = 100;
        this._player1.BetMoney(this.currentBet);
        console.log(`${this._player1.CheckCurrentMoney()}`)
        this._drawDeck.DealStartingHand(this._dealer, this._player1);
        // this.PrintGameInformation();
        // this.RequestPlayerToHit(this._player1);
        this.currentPlayers.forEach(player => {
            player.BustPlayer(false);
            this.PlayerTurn(player);
        })
        this.EndRound();
    }

    PlayerTurn(player: Player): void {
        console.log(`-----Player Turn: ${player.GetPlayerName()}-----`)

            if(player.IsDealerCheck() == false){
                player.PrintHandInfo();
                this.RequestPlayerToHit(player);
                if(player.GetHandValue() > 21){
                    console.log(`You have ${player.GetHandValue()}. You have busted!`);
                    player.BustPlayer(true);
                // commenting this out because the EndRound() method already discards. Even though techincally it should happen here.
                //player.DiscardCards();
            }
            //need logic to continue asking if player would like to hit. FOr now we'll do nothing just to exit the loop.
        }
            if (player.IsDealerCheck() == true){
                player.CurrentCards[1]?.TurnCardFaceUp();
                player.PrintHandInfo();
                while(player.GetHandValue() <= 16){
                    this._drawDeck.DrawCardAndDeal(player, false)
                    console.log(`The dealer now has ${player.GetHandValue()}.`)
                    if(player.GetHandValue() > 16 && player.GetHandValue() < 22){
                    console.log(`The dealer now has ${player.GetHandValue()}.`)
                }
                    if(player.GetHandValue() > 21){
                    console.log(`The dealer has ${player.GetHandValue()}. The dealer has busted!`)
                    player.BustPlayer(true);
                };
            }
            if (player.IsPlayerBusted() == false){
            console.log(`The ${player.GetPlayerName()} stay with ${player.GetHandValue()}.`)
            }
        }
    }

    EndRound(): void {
        var dealerHandTotal = this._dealer.GetHandValue();
        var everyoneBusted: boolean;
        if(this._dealer.IsPlayerBusted() && this._player1.IsPlayerBusted())
            //I need to look at this. This isn't a real situation.
            everyoneBusted = true;
        //Need a method to pay out the player bet/subtract from total.
        this.currentPlayers.forEach(player => {
            //player beats the dealer
            if(player.GetHandValue() > dealerHandTotal && player.IsPlayerBusted() == false){
                console.log(`Congratulations ${player.GetPlayerName()} you have won ${player.CurrentBet}!`);
                player.DepositMoney(player.CurrentBet* 2);
                console.log(`Your winnings total is ${player.CheckCurrentMoney()}`)
                console.log(`${player.GetPlayerName()} currently has $${player.CheckCurrentMoney()}.`)
            }
            //dealer beats the player
            if(player.GetHandValue() < dealerHandTotal || player.IsPlayerBusted() == true){
                console.log(`Dealer has ${dealerHandTotal}, you have ${player.GetHandValue()}. You lose $${player.CurrentBet}`)
                player.CurrentBet = 0; 
                console.log(`${player.GetPlayerName()} currently has $${player.CheckCurrentMoney()}.`)
            }
            //dealer and player have the same hand total.
            if(player.GetHandValue() == dealerHandTotal && player.GetPlayerName() !== "Dealer" && everyoneBusted !== true){
                console.log(`The dealer and ${player.GetPlayerName()} have the same hand total of: ${dealerHandTotal}. Push!`)
                player.DepositMoney(player.CurrentBet);
                console.log(`${player.GetPlayerName()} receives their $${String(player.CurrentBet)} back.`)
                console.log(`${player.GetPlayerName()} currently has $${player.CheckCurrentMoney()}.`)
            }
        });

        this.DiscardCards(this._discardDeck, this._dealer);
        this.DiscardCards(this._discardDeck, this._player1);
        console.log("----------Round has ended-----------");
        this.RequestPlayAnotherRound();
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
            this._drawDeck.DrawCardAndDeal(player, false);
            console.log(`${player.GetPlayerName()} has hit. Current hand value: ${player.GetHandValue()}\n`);
        } else {
            console.log(`${player.GetPlayerName()} will stay with ${player.GetHandValue()}\n`);
        }
    }

    async EnterPlayerInformation2(player: Player): Promise<void> {
        const question = promisify(rl.question).bind(rl)
        const playerName = await question("Please enter your player name \n");

        player.SetPlayerName(String(playerName));
        console.log(`Welcome to the game ${playerName}`)
        rl.close();
    }

    EnterPlayerInformation(): void {
        var playerDeposit: number;
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
                player.SetPlayerName("Eric");
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

    async RequestPlayAnotherRound(): Promise<void> {
        var answer = "N"
        await rl.question("Would you like to play another round? \n", (userInput)=>{
            answer = userInput;
                rl.close();
                
        })
        if(answer == "Y"){
            this.BeginRound()
        }
        else {
            process.exit();
        }
    }
}

