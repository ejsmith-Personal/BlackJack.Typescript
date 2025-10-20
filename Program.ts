import { Player } from "./Player.ts"
import {GameRunner} from "./GameRunner.ts"
import {Deck} from "./Deck.ts"

const Eric = new Player("Eric", 25, false);
const Dealer = new Player("Dealer", 10000, true);
const _deck = new Deck();

const newGame = new GameRunner(Eric, Dealer, _deck);
newGame.BeginGame();
//newGame.BeginRound();


// const _deck =  new Deck()
// _deck.CreateDeck()
// _deck.ShuffleDeck()
// _deck.DealStartingHand(Eric, Dealer);
// Eric.PrintHandInfo();
// Dealer.PrintHandInfo();

//_deck.PrintAllCardInfo();
//console.log(_deck.PrintAllCardInfo());



