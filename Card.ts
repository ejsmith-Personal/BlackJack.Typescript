

export class Card{
    public cardName: string;
    public Suit: string;
    public faceUp: boolean
    public cardValue: number;

    constructor(name: string, suit: string, isFaceUp: boolean, value: number){
        this.cardName = name;
        this.Suit = suit;
        this.faceUp = isFaceUp
        this.cardValue = value;
    }

    PrintCardNameAndStatus(): string{
        return (`The ${this.cardName} of ${this.Suit} is face up: ${this.faceUp}`)
    }

    PrintCardNameAndSuit(): string{
        return (`The ${this.cardName} of ${this.Suit}`)
    }

    TurnCardFaceUp(): void {
        this.faceUp = true;
    }
}