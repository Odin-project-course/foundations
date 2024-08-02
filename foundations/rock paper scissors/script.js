var _a;
var Choice;
(function (Choice) {
    Choice["Rock"] = "rock";
    Choice["Paper"] = "paper";
    Choice["Scissors"] = "scissors";
})(Choice || (Choice = {}));
;
var Game = /** @class */ (function () {
    function Game(maxRounds) {
        this.maxRounds = maxRounds;
        this.currentRound = 0;
        this.playerScore = 0;
        this.computerScore = 0;
        this.choices = [Choice.Rock, Choice.Paper, Choice.Scissors];
    }
    Game.prototype.reStart = function () {
        this.currentRound = 0;
        this.playerScore = 0;
        this.computerScore = 0;
    };
    Game.prototype.defineRoundWinner = function (playerItem, compItem) {
        if (playerItem === compItem) {
            this.currentRound++;
            return;
        }
        if (Game.winnerMatrix[playerItem] === compItem) {
            this.playerScore++;
        }
        else {
            this.computerScore++;
        }
        this.currentRound++;
    };
    Game.prototype.isGameFinished = function () {
        return this.currentRound >= this.maxRounds;
    };
    Game.prototype.defineGameWinner = function () {
        if (this.playerScore > this.computerScore)
            return 'Player won';
        if (this.playerScore < this.computerScore)
            return 'Computer won';
        return 'Tie';
    };
    Game.prototype.chooseComputerTurn = function () {
        var randomIndex = Math.floor(Math.random() * this.choices.length);
        return this.choices[randomIndex];
    };
    Game.winnerMatrix = (_a = {},
        _a[Choice.Rock] = Choice.Scissors,
        _a[Choice.Paper] = Choice.Rock,
        _a[Choice.Scissors] = Choice.Paper,
        _a);
    return Game;
}());
;
var Player = /** @class */ (function () {
    function Player() {
    }
    Player.prototype.chooseItem = function (item) {
        return item;
    };
    return Player;
}());
;
document.addEventListener('DOMContentLoaded', function () {
    var game = new Game(3);
    var player = new Player();
    var board = document.querySelector('.board');
    var buttons = document.querySelectorAll('.choose-button');
    var restartButton = document.querySelector('.restart-button');
    var updateBoard = function () {
        board.innerHTML = "Player score: ".concat(game.playerScore, "\n                           Computer score: ").concat(game.computerScore, "\n                           Current round: ").concat(game.currentRound, "\n                           Rounds remaining: ").concat(game.maxRounds - game.currentRound);
    };
    updateBoard();
    buttons.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var chosenItem = e.target.innerHTML;
            console.log(chosenItem);
            game.defineRoundWinner(player.chooseItem(chosenItem), game.chooseComputerTurn());
            updateBoard();
            if (game.isGameFinished()) {
                setTimeout(function () {
                    alert(game.defineGameWinner());
                    game.reStart();
                    updateBoard();
                }, 1500);
            }
        });
    });
    restartButton.addEventListener('click', function (e) {
        game.reStart();
        updateBoard();
    });
});
