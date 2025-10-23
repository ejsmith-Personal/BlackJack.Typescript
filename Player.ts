import { Card } from "./Card.ts"
import { Deck } from "./Deck.ts"

export class Player{
    private Name: string;
    public CurrentCards: Card[];
    private GamblingMoney: number;
    private IsDealer: boolean;
    private cardInForLoop: Card;

    constructor(name: string, money: number, dealer: boolean){

        this.Name = name;
        this.GamblingMoney = money;
        this.IsDealer = dealer;
        this.CurrentCards = [];
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
        this.CurrentCards.forEach((card) => {
            this.cardInForLoop = card;
            if(card.faceUp == true){
            console.log(`${this.Name} has ${this.cardInForLoop.PrintCardNameAndSuit()} card.`)
                } else {
                console.log(`${this.Name} has a face down card.`)
                }
        });
    }

    GetHandValue(): number {
        var handTotal = 0;
        this.CurrentCards.forEach((card) => {
            this.cardInForLoop = card;
            handTotal += card.cardValue;
        });
        return handTotal;
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
        this.GamblingMoney =- bet;
    }

    HitOrStay(): string {
        var userInput: string = "hit";
        return userInput;
    }

    DiscardCards(): void {
        this.CurrentCards = [];
    }
}

