import { Card } from "./Card.ts"
import { Player } from "./Player.ts"

export class Deck{

    public _deck: Card[];
    public _currentCardInfo: string;

    constructor(){
        this._deck = [];
    }

    CreateDeck(): void {

        const card1 = new Card("Two", "Hearts", false, 2)
        const card2 = new Card("Two", "Diamonds", false, 2)
        const card3 = new Card("Two", "Spades", false, 2)
        const card4 = new Card("Two", "Clubs", false, 2)

        const card5 = new Card("Three", "Hearts", false, 3)
        const card6 = new Card("Three", "Diamonds", false, 3)
        const card7 = new Card("Three", "Spades", false, 3)
        const card8 = new Card("Three", "Clubs", false, 3)

        const card9 = new Card("Four", "Hearts", false, 4)
        const card10 = new Card("Four", "Diamonds", false, 4)
        const card11 = new Card("Four", "Spades", false, 4)
        const card12 = new Card("Four", "Clubs", false, 4)

        const card13 = new Card("Five", "Hearts", false, 5)
        const card14 = new Card("Five", "Diamonds", false, 5)
        const card15 = new Card("Five", "Spades", false, 5)
        const card16 = new Card("Five", "Clubs", false, 5)

        const card17 = new Card("Six", "Hearts", false, 6)
        const card18 = new Card("Six", "Diamonds", false, 6)
        const card19 = new Card("Six", "Spades", false, 6)
        const card20 = new Card("Six", "Clubs", false, 6)
        
        const card21 = new Card("Seven", "Hearts", false, 7)
        const card22 = new Card("Seven", "Diamonds", false, 7)
        const card23 = new Card("Seven", "Spades", false, 7)
        const card24 = new Card("Seven", "Clubs", false, 7)

        const card25 = new Card("Eight", "Hearts", false, 8)
        const card26 = new Card("Eight", "Diamonds", false, 8)
        const card27 = new Card("Eight", "Spades", false, 8)
        const card28 = new Card("Eight", "Clubs", false, 8)

        const card29 = new Card("Nine", "Hearts", false, 9)
        const card30 = new Card("Nine", "Diamonds", false, 9)
        const card31 = new Card("Nine", "Spades", false, 9)
        const card32 = new Card("Nine", "Clubs", false, 9)

        const card33 = new Card("Ten", "Hearts", false, 10)
        const card34 = new Card("Ten", "Diamonds", false, 10)
        const card35 = new Card("Ten", "Spades", false, 10)
        const card36 = new Card("Ten", "Clubs", false, 10)

        const card37 = new Card("Jack", "Hearts", false, 10)
        const card38 = new Card("Jack", "Diamonds", false, 10)
        const card39 = new Card("Jack", "Spades", false, 10)
        const card40 = new Card("Jack", "Clubs", false, 10)

        const card41 = new Card("Queen", "Hearts", false, 10)
        const card42 = new Card("Queen", "Diamonds", false, 10)
        const card43 = new Card("Queen", "Spades", false, 10)
        const card44 = new Card("Queen", "Clubs", false, 10)

        const card45 = new Card("King", "Hearts", false, 10)
        const card46 = new Card("King", "Diamonds", false, 10)
        const card47 = new Card("King", "Spades", false, 10)
        const card48 = new Card("King", "Clubs", false, 10)

        const card49 = new Card("Ace", "Hearts", false, 11)
        const card50 = new Card("Ace", "Diamonds", false, 11)
        const card51 = new Card("Ace", "Spades", false, 11)
        const card52 = new Card("Ace", "Clubs", false, 11)

        // function addCard(value: Card): void {
        //     const card: 
        // }

        for (let i = 1; i < 52; i++){
            let addedCard: string;
            addedCard = "card" + i;
            // console.log(eval(addedCard));
            this._deck.push(eval(addedCard));
            // this._deck.
        }
    }

    // shuffles the deck of cards
    ShuffleDeck(): void {
        this._deck.sort((a,b)=> 0.5 - Math.random());
        this._deck.sort
    }
    // iterates through the deck and prints info on each card
    PrintAllCardInfo(): void {
        this._deck.forEach(card => {
            this._currentCardInfo = card.PrintCardNameAndStatus();
            console.log(this._currentCardInfo);
        });
    }

    DrawCardAndDeal(player: Player, isOpeningRound: boolean): void {
        const card = this._deck.pop();
        if (isOpeningRound){
        if (card){
            player.ReceiveCard(card);
            if(card.faceUp){
                console.log(`${player.GetPlayerName()} receives the ${card.PrintCardNameAndSuit()}\n`);
            }
            if(card.faceUp == false){
                console.log(`${player.GetPlayerName()} receives a facedown card.\n`)
            }
            } else {
                console.log("No more cards in the deck");
        }
    }
        if(isOpeningRound == false){
            if (card){
                player.ReceiveCard(card);
                    console.log(`${player.GetPlayerName()} receives the ${card.PrintCardNameAndSuit()}\n`);
        } else {
            console.log("No more cards in the deck");
        }
    }
}

    DealStartingHand(dealer: Player, player1: Player): void {
        this.DrawCardAndDeal(player1, true);
        this.DrawCardAndDeal(dealer, true);
        this.DrawCardAndDeal(player1, true);
        this.DrawCardAndDeal(dealer, true);
    }

    ReceiveDiscardCards(card: Card): void {
        this._deck.push(card);
    }
}
