import { Card } from "./Card.ts"
import { Deck } from "./Deck.ts"
import * as readlinesync from "readline-sync"
import * as readline from "readline"

const rl = readline.createInterface({input: process.stdin, output: process.stdout})

export class Player{
    private Name: string;
    public CurrentCards: Card[];
    private GamblingMoney: number;
    private IsDealer: boolean;
    public CurrentBet: number;
    private IsBusted: boolean;

    constructor(name: string, money: number, dealer: boolean){

        this.Name = name;
        this.GamblingMoney = money;
        this.IsDealer = dealer;
        this.CurrentCards = [];
        this.CurrentBet = 0;
    }  

    ReceiveCard(card: Card): void {
        if (this.IsDealer == true && this.CurrentCards.length == 0){
            card.TurnCardFaceUp();
            console.log(`${this.GetPlayerName()} receives a ${card.PrintCardNameAndSuit()}\n`)
        }
        if (this.IsDealer == false){
            card.TurnCardFaceUp(); 
            console.log(`${this.GetPlayerName()} receives a ${card.PrintCardNameAndSuit()}\n`)
        }
        if(this.IsDealer == true && this.CurrentCards.length == 1){
            console.log(`${this.GetPlayerName()} receives a face down card.\n`)
        } 
        if(this.IsDealer == true && this.CurrentCards.length > 1){
            card.TurnCardFaceUp(); 
            console.log(`${this.GetPlayerName()} receives a ${card.PrintCardNameAndSuit()}\n`)
        } 
        this.CurrentCards.push(card);
    }

    PrintHandInfo(): void {
        var cardInForLoop: Card;
        this.CurrentCards.forEach((card) => {
            cardInForLoop = card;
            if(card.faceUp == true){
            console.log(`${this.Name} has ${cardInForLoop.PrintCardNameAndSuit()} card.`)
                } else {
                console.log(`${this.Name} has a face down card.`)
                }
        });
        console.log(`${this.GetPlayerName()} has ${this.GetHandValue()}.\n`);
    }

    // GetHandValue(): number {
    //     var cardInForLoop: Card;
    //     var handTotal = 0;
    //     this.CurrentCards.forEach((card) => {
    //         cardInForLoop = card;
    //         handTotal += card.cardValue;
    //         if(handTotal > 21){
    //             this.CurrentCards.forEach((card) => {
    //                 var currentCard: Card;
    //                 currentCard = card;
    //                 if(currentCard.cardName == "Ace"){
    //                     handTotal += card.altAceCardValue;
    //                 } else {
    //                     handTotal += card.cardValue;
    //                 }
    //             });
    //         }
    //     });
    //     // need some Ace logic here to handle it's 11 or 1 value.
    //     return handTotal;
    // }

    GetHandValue(): number{
        let aceCount = 0;
        let handTotal = 0;
        //find out how many aces the player has.
        this.CurrentCards.forEach((card) => {
            let currentCard = card;
            if(currentCard.cardName == "Ace"){
                aceCount ++
            }
        });
        this.CurrentCards.forEach((card) => {
            let currentCard = card;
            handTotal += card.cardValue;
            if(handTotal > 21 && aceCount > 0){
                handTotal = handTotal - 10;
                aceCount --;
            }
        });

        return handTotal;
    }

    IsDealerCheck(): boolean {
        if(this.IsDealer == true){
            return true;
        } else {
            return false;
        }
    }

    SetPlayerName(playerName: string): void {
        this.Name = playerName;
    }

    GetPlayerName(): string {
        const playerName = this.Name;
        return playerName;
    }

    DepositMoney(deposit: number): void {
        this.GamblingMoney = this.GamblingMoney + deposit;
    }

    CheckCurrentMoney(): number {
        const playerMoney = this.GamblingMoney;
        return playerMoney;
    }

    BetMoney(bet: number): void {
        this.CurrentBet = bet;
        this.GamblingMoney = this.GamblingMoney - bet;
    }

    HitOrStay(): string {
        if (this.IsDealerCheck() == false && this.GetHandValue() == 10 || this.GetHandValue() == 11 ){
            var answer = readlinesync.question("Would you like to (H)it, (S)tay or (D)ouble Down \n",).toUpperCase();
        } else { 
            answer = readlinesync.question("Would you like to (H)it or (S)tay? \n",).toUpperCase();
        }
        switch (answer){
            case "H":
                return answer;
            case "S":
                return answer;
            case "D":
                return answer;
            default:
                console.log("Please enter a valid input");
                answer = readlinesync.question("Would you like to (H)it or (S)tay? \n",).toUpperCase();
                return answer;
        }
    }

    DiscardCards(): void {
        this.CurrentCards = [];
    }

    BustPlayer(isBusted: boolean): void {
        this.IsBusted = isBusted;
    }

    IsPlayerBusted(): boolean {
        return this.IsBusted;
    }
}

