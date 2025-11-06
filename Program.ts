import { Player } from "./Player.ts"
import {GameRunner} from "./GameRunner.ts"
import {Deck} from "./Deck.ts"

const _deck = new Deck();
const newGame = new GameRunner(_deck);
newGame.GameSetup();




