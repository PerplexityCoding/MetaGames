import {Deck} from "./in_models";

export class Player {
    private name: string;
    private currentDeck: Deck;

    private gameWon: number = 0;
    private gamePlayed: number = 0;

    public setDeck(deck: Deck) {
        this.currentDeck = deck;
    }

    public getDeck() {
        return this.currentDeck;
    }

    public getGameWon() {
        return this.gameWon;
    }

    public getGamePlayed() {
        return this.gamePlayed;
    }

    public resetGameStat() {
        this.gamePlayed = 0;
        this.gameWon = 0;
    }

}

export class Game {
    private player1: Player;
    private player2: Player;

    private currentTime: number = 0;
    private endTime: number = 0;
    private gameWon: number = 0;

    constructor(p1: Player, p2: Player) {
        this.player1 = p1;
        this.player2 = p2;
        this.endTime = Math.floor(Math.random() * 16) + 4;
    }
}
