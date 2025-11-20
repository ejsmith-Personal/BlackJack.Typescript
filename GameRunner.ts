import { Deck } from "./Deck.ts";
import { Player } from "./Player.ts";
import * as readline from "readline"
import { createInterface } from 'node:readline/promises';
import { resolve } from "node:dns";
import { promisify } from "node:util";
import * as readlineSync from "readline-sync";

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
        this.RequestPlayerName();
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
        console.log("----------Beginning Round----------\n");
        this.currentPlayers.forEach(player => {
            if(player.IsDealerCheck() == false){
        var playerBetInput = readlineSync.question("How much would you like to bet? \n",);
        if (Number(playerBetInput)){
                player.BetMoney(Number(playerBetInput))
        } else {
            playerBetInput = readlineSync.question("Please enter a valid $ amount. How much would you like to bet? \n",);
        }
        //I will need to rewrite this if I ever add more players.
        console.log(`Player: ${player.GetPlayerName()} has bet $${Number(playerBetInput)}`)
            }
        });
        this.DealStartingHand();
        this.currentPlayers.forEach(player => {
            player.BustPlayer(false);
            this.PlayerTurn(player);
        })
        this.EndRound();
    }

    PlayerTurn(player: Player): void {
        console.log(`-----Player Turn: ${player.GetPlayerName()}-----`)
        //need logic to detect a 21 and automatically pay out 1.5x
            if(player.IsDealerCheck() == false){
                player.PrintHandInfo();
                var lastPlayerAction = this.RequestPlayerToHit(player);
                if(player.GetHandValue() < 21 && lastPlayerAction !== "S"){
                    lastPlayerAction = this.RequestPlayerToHit(player);
                }
                if(player.GetHandValue() > 21){
                    console.log(`You have ${player.GetHandValue()}. You have busted!\n`);
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
                    console.log(`The ${player.GetPlayerName()} hits.`)
                    player.ReceiveCard(this._drawDeck.DrawCard());
                    //this._drawDeck.DrawCardAndDeal(player, false, this._drawDeck, this._discardDeck)
                    //console.log(`The dealer now has ${player.GetHandValue()}.`)
                    if(player.GetHandValue() > 16 && player.GetHandValue() < 22){
                    console.log(`The ${player.GetPlayerName()} now has ${player.GetHandValue()}.`)
                }
                    if(player.GetHandValue() > 21){
                    console.log(`The dealer has ${player.GetHandValue()}. The dealer has busted!\n`)
                    player.BustPlayer(true);
                };
            }
            if (player.IsPlayerBusted() == false){
            console.log(`The ${player.GetPlayerName()} stays with ${player.GetHandValue()}.\n`)
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
        //win conditions
        this.currentPlayers.forEach(player => {
            //player beats the dealer
            if(player.GetHandValue() > dealerHandTotal && player.IsPlayerBusted() == false && player.IsDealerCheck() == false
             || player.IsPlayerBusted() == false && this._dealer.IsPlayerBusted() == true && player.IsDealerCheck() == false){
                console.log(`Dealer has ${dealerHandTotal}, you have ${player.GetHandValue()}. Congratulations ${player.GetPlayerName()} you have won $${player.CurrentBet}!`);
                player.DepositMoney(player.CurrentBet* 2);
                //console.log(`Your winnings total is ${player.CheckCurrentMoney()}`)
                console.log(`${player.GetPlayerName()} currently has $${player.CheckCurrentMoney()}.`)
            }
            //dealer beats the player
            if(player.GetHandValue() < dealerHandTotal && this._dealer.IsPlayerBusted() == false || player.IsPlayerBusted() == true && player.IsDealerCheck() == false && this._dealer.IsPlayerBusted() == false ){
                console.log(`Dealer has ${dealerHandTotal}, you have ${player.GetHandValue()}. You lose $${player.CurrentBet}`)
                player.CurrentBet = 0; 
                console.log(`${player.GetPlayerName()} currently has $${player.CheckCurrentMoney()}.`)
            }
            //dealer and player have the same hand total.
            if(player.GetHandValue() == dealerHandTotal && player.IsDealerCheck() == false && everyoneBusted !== true && player.IsDealerCheck() == false){
                console.log(`The dealer and ${player.GetPlayerName()} have the same hand total of: ${dealerHandTotal}. Push!\n`)
                player.DepositMoney(player.CurrentBet);
                console.log(`${player.GetPlayerName()} receives their $${String(player.CurrentBet)} back.`)
                console.log(`${player.GetPlayerName()} Total Bankroll: $${player.CheckCurrentMoney()}.\n`)
            }
        });

        this.DiscardCards(this._discardDeck, this._dealer);
        this.DiscardCards(this._discardDeck, this._player1);
        console.log("----------Round has ended-----------\n");
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

    RequestPlayerToHit(player: Player): string {
        var playerHitOrStay: string;
        playerHitOrStay = player.HitOrStay();
        if (playerHitOrStay == "H"){
            player.ReceiveCard(this._drawDeck.DrawCard());
            // this._drawDeck.DrawCardAndDeal(player, false, this._drawDeck, this._discardDeck);
            console.log(`Current hand value: ${player.GetHandValue()}\n`);
            return playerHitOrStay;
        } else {
            console.log(`${player.GetPlayerName()} will stay with ${player.GetHandValue()}\n`);
            return playerHitOrStay;
        }
    }

    RequestPlayerName(): void{
        this.currentPlayers.forEach(player => {
            //Go through the array of players and check if any given player is the dealer.
            if(player.IsDealerCheck() == false){
                const answer = readlineSync.question("What is your player name? \n",);
                player.SetPlayerName(answer);
            }
        })
    }

    RequestPlayerDeposit(): void{
        this.currentPlayers.forEach(player => {
            if(player.IsDealerCheck() == false){
                const answer = readlineSync.question("How much would you like to deposit? \n",);
                if(Number(answer)){
                    player.DepositMoney(Number(answer));
                    console.log(`Player: ${player.GetPlayerName()} has deposited $${Number(answer)}`)
                } else {
                    console.log("Please enter a valid $ amount.");
                    this.RequestPlayerDeposit();
                }

            }
        })
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

    RequestPlayAnotherRound(){
        const answer = readlineSync.question("Would you like to play another round? \n",);
        console.log(`You entered: ${answer}`);
        if(answer == "Y"){
            this.BeginRound()
        } else {
            process.exit();
        }
    }

    //I should update this method to do a for each and go through the currentPlayers array instead of taking in each player seperately.
    DealStartingHand(): void {
        if (this._drawDeck._deck.length == 0){
            //Do the method that moves discard deck cards into deck.
            this.MoveDiscarDeckCardsIntoDrawDeck(this._drawDeck, this._discardDeck);
            this._drawDeck.ShuffleDeck()
        }
        for(let i = 0; i <= 3; i++){
            var drawnCard = this._drawDeck.DrawCard()
            if (drawnCard){
                //For the future I'd like this to be able to iterate through the players to give them a card rather than hardcoding the player and dealer.
                for (const [index, item] of this.currentPlayers.entries()){
                    if (index % 2 === 0){
                        this._player1.ReceiveCard(drawnCard);
                        var drawnCard = this._drawDeck.DrawCard()
                        i++
                        } 
                    if (index % 2 !== 0){
                        this._dealer.ReceiveCard(drawnCard);
                        var drawnCard = this._drawDeck.DrawCard()
                        i++
                    }
                }
            }
        }
    }

        MoveDiscarDeckCardsIntoDrawDeck(drawDeck: Deck, discardDeck: Deck): void{
        //iterate through the discardDeck for
        discardDeck._deck.forEach(card => {
            var currentCard = card;
            //for each card, move or copy that card into the drawDeck
            drawDeck._deck.push(currentCard);
        });
    }
}


