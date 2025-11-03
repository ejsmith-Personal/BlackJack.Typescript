import { Card } from "./Card.ts"
import { Deck } from "./Deck.ts"
import * as readline from "readline"

const rl = readline.createInterface({input: process.stdin, output: process.stdout})

export class Player{
    private Name: string;
    public CurrentCards: Card[];
    private GamblingMoney: number;
    private IsDealer: boolean;
    private CardInForLoop: Card;
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
        }
        if (this.IsDealer == false){
            card.TurnCardFaceUp(); 
        }
        this.CurrentCards.push(card);
    }

    PrintHandInfo(): void {
        console.log(`${this.GetPlayerName()} has ${this.GetHandValue()}`);
        this.CurrentCards.forEach((card) => {
            this.CardInForLoop = card;

            if(card.faceUp == true){
            console.log(`${this.Name} has ${this.CardInForLoop.PrintCardNameAndSuit()} card.`)
                } else {
                console.log(`${this.Name} has a face down card.`)
                }
        });
        console.log("\n")
    }

    GetHandValue(): number {
        var handTotal = 0;
        this.CurrentCards.forEach((card) => {
            this.CardInForLoop = card;
            handTotal += card.cardValue;
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

    DepositMoney(deposit: number): void {
        this.GamblingMoney = deposit;
    }

    GetPlayerName(): string {
        const playerName = this.Name;
        return playerName;
    }

    CheckCurrentMoney(): number {
        const playerMoney = this.GamblingMoney;
        return playerMoney;
    }

    BetMoney(bet: number): void {
        this.CurrentBet = bet;
        this.GamblingMoney =- bet;
    }

    HitOrStay(): string {
        var userInput: string;
        if(this.GetHandValue() > 11){
        userInput = "stay";
        return userInput;
        } else {
            userInput = "hit"
            return userInput;

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

