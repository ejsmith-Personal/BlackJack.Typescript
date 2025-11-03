import { Player } from "./Player.ts"
import {GameRunner} from "./GameRunner.ts"
import {Deck} from "./Deck.ts"

const _deck = new Deck();

const newGame = new GameRunner(_deck);
newGame.GameSetup();
// newGame.BeginGame();
// newGame.BeginRound();
// newGame.EndRound();


// const _deck =  new Deck()
// _deck.CreateDeck()
// _deck.ShuffleDeck()
// _deck.DealStartingHand(Eric, Dealer);
// Eric.PrintHandInfo();
// Dealer.PrintHandInfo();

//_deck.PrintAllCardInfo();
//console.log(_deck.PrintAllCardInfo());



