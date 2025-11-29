import { Card } from "./Card.ts"
import { Player } from "./Player.ts"

export class Deck{

    public _deck: Card[];
    public _currentCardInfo: string;

    constructor(){
        this._deck = [];
    }

    CreateDeck(): void {



        this._deck.push(new Card("Three", "Hearts", false, 3))
        this._deck.push(new Card("Three", "Diamonds", false, 3))
        this._deck.push(new Card("Three", "Spades", false, 3))
        this._deck.push(new Card("Three", "Clubs", false, 3))

        this._deck.push(new Card("Four", "Hearts", false, 4))
        this._deck.push(new Card("Four", "Diamonds", false, 4))
        this._deck.push(new Card("Four", "Spades", false, 4))
        this._deck.push(new Card("Four", "Clubs", false, 4))

        this._deck.push(new Card("Five", "Hearts", false, 5))
        this._deck.push(new Card("Five", "Diamonds", false, 5))
        this._deck.push(new Card("Five", "Spades", false, 5))
        this._deck.push(new Card("Five", "Clubs", false, 5))

        this._deck.push(new Card("Six", "Hearts", false, 6))
        this._deck.push(new Card("Six", "Diamonds", false, 6))
        this._deck.push(new Card("Six", "Spades", false, 6))
        this._deck.push(new Card("Six", "Clubs", false, 6))
        
        this._deck.push(new Card("Seven", "Hearts", false, 7))
        this._deck.push(new Card("Seven", "Diamonds", false, 7))
        this._deck.push(new Card("Seven", "Spades", false, 7))
        this._deck.push(new Card("Seven", "Clubs", false, 7))

        this._deck.push(new Card("Eight", "Hearts", false, 8))
        this._deck.push(new Card("Eight", "Diamonds", false, 8))
        this._deck.push(new Card("Eight", "Spades", false, 8))
        this._deck.push(new Card("Eight", "Clubs", false, 8))

        this._deck.push(new Card("Nine", "Hearts", false, 9))
        this._deck.push(new Card("Nine", "Diamonds", false, 9))
        this._deck.push(new Card("Nine", "Spades", false, 9))
        this._deck.push(new Card("Nine", "Clubs", false, 9))

        this._deck.push(new Card("Ten", "Hearts", false, 10))
        this._deck.push(new Card("Ten", "Diamonds", false, 10))
        this._deck.push(new Card("Ten", "Spades", false, 10))
        this._deck.push(new Card("Ten", "Clubs", false, 10))

        this._deck.push(new Card("Jack", "Hearts", false, 10))
        this._deck.push(new Card("Jack", "Diamonds", false, 10))
        this._deck.push(new Card("Jack", "Spades", false, 10))
        this._deck.push(new Card("Jack", "Clubs", false, 10))

        this._deck.push(new Card("Queen", "Hearts", false, 10))
        this._deck.push(new Card("Queen", "Diamonds", false, 10))
        this._deck.push(new Card("Queen", "Spades", false, 10))
        this._deck.push(new Card("Queen", "Clubs", false, 10))

        this._deck.push(new Card("King", "Hearts", false, 10))
        this._deck.push(new Card("King", "Diamonds", false, 10))
        this._deck.push(new Card("King", "Spades", false, 10))
        this._deck.push(new Card("King", "Clubs", false, 10))

        this._deck.push(new Card("Two", "Hearts", false, 2));
        this._deck.push(new Card("Two", "Diamonds", false, 2))
        this._deck.push(new Card("Two", "Spades", false, 2))
        this._deck.push(new Card("Two", "Clubs", false, 2))

        this._deck.push(new Card("Ace", "Hearts", false, 11))
        this._deck.push(new Card("Ace", "Diamonds", false, 11))
        this._deck.push(new Card("Ace", "Spades", false, 11))
        this._deck.push(new Card("Ace", "Clubs", false, 11))
    }

    // shuffles the deck of cards
    ShuffleDeck(): void {
        // this._deck.sort((a,b)=> 0.5 - Math.random());
        // this._deck.sort
        console.log("The deck has been shuffled.\n");
    }

    //DrawCardAndDeal should only return a card, it shouldn't know about players or what round it is.
    DrawCard(): Card {
        var drawnCard = this._deck.pop()
        if(drawnCard){
        return drawnCard;
        } else {
            throw new Error("No cards left in the deck");
        }
        //will need to trigger a reshuffle if not already handled in some way.
    }

    ReceiveDiscardCards(card: Card): void {
        this._deck.push(card);
    }
}
