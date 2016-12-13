import {Player, Game} from "../model/model";
import {decks, Deck, winRates} from "../model/in_models";

export class GamesSimulator {

    private availablePlayers: Array<Player>;
    private players: Array<Player>;

    private games: Array<Game>;

    constructor() {
        this.createPlayers();
    }

    public launchSimulation(): void {

        console.log("launch simulation");

        this.displayMeta();

        this.games = new Array<Game>();

        setInterval(function() {

            // treat finished games
            for (let i = this.games.length - 1; i >=0; i--) {
                let game = this.games[i],
                    player1 = game.player1,
                    player2 = game.player2;

                if (game.currentTime >= game.endTime) { // game is finished

                    if (winRates[player1.currentDeck][player2.currentDeck] > (1 - Math.random())) {
                        player1.gameWon++;
                    } else {
                        player2.gameWon++;
                    }
                    player1.gamePlayed++;
                    player2.gamePlayed++;

                    this.availablePlayers.push(player1);
                    this.availablePlayers.push(player2);

                    this.games.splice(i, 1);

                    // player choose to change deck ?

                    this.playerCanChangeDeck(player1);
                    this.playerCanChangeDeck(player2);

                } else {
                    game.currentTime++;
                }
            }

            // create new games for available players
            while (this.availablePlayers.length > 0) {
                let player1 = this.availablePlayers.pop();
                let player2 = this.availablePlayers.pop();

                let game = new Game(player1, player2);

                this.games.push(game);
            }

            this.displayMeta();

        }.bind(this), 10);
    }

    private createPlayers() {
        this.availablePlayers = new Array<Player>();
        this.players = new Array<Player>();

        for (let i = 0; i < 5000; i++) {
            let player: Player = new Player();
            player.setDeck(this.getRandomDeck());

            this.availablePlayers.push(player);
            this.players.push(player);
        }
    }

    private playerCanChangeDeck(player: Player) {
        if (player.getGamePlayed() > 50 && (player.getGameWon() / player.getGamePlayed()) < 0.5) {
            player.setDeck(this.getRandomDeck());
            player.resetGameStat();
        }
    }

    private getRandomDeck(): Deck {
        let idx = Math.floor(Math.random() * decks.length);
        return decks[idx];
    }

    private sortObject(obj) {
        var arr = [];
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                arr.push({
                    'key': prop,
                    'value': obj[prop]
                });
            }
        }
        arr.sort(function(a, b) { return b.value - a.value; });
        //arr.sort(function(a, b) { a.value.toLowerCase().localeCompare(b.value.toLowerCase()); }); //use this to sort as strings
        return arr; // returns array
    }

    private displayMeta() {
        let deckPlayed = {};
        let deckPlayedPercent = {};

        for (let i = 0; i < this.players.length; i++) {
            let player = this.players[i];

            if (deckPlayed[player.getDeck()] == undefined) {
                deckPlayed[player.getDeck()] = 0;
            }

            deckPlayed[player.getDeck()]++;
            deckPlayedPercent[player.getDeck()] = Math.round((deckPlayed[player.getDeck()] / this.players.length) * 1000) / 10;
        }

        var arr = this.sortObject(deckPlayedPercent);

        console.log(arr);
    }

}