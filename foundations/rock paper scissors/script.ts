enum Choice {
    Rock = 'rock',
    Paper = 'paper',
    Scissors = 'scissors'   
};

class Game {
    public currentRound : number;
    public maxRounds: number;
    public playerScore : number;
    public computerScore : number;
    private choices: Choice[];

    private static winnerMatrix = {
        [Choice.Rock] : Choice.Scissors,
        [Choice.Paper] : Choice.Rock,
        [Choice.Scissors] : Choice.Paper
    };

    constructor (maxRounds : number) {
        this.maxRounds = maxRounds;
        this.currentRound = 0;
        this.playerScore = 0;
        this.computerScore = 0;
        this.choices = [Choice.Rock, Choice.Paper, Choice.Scissors];
    }

    reStart() : void {
        this.currentRound = 0;
        this.playerScore = 0;
        this.computerScore = 0;
    }

    defineRoundWinner(playerItem: Choice, compItem: Choice) : void {
        if (playerItem === compItem) {
            this.currentRound++;
            return;
        } 

        if (Game.winnerMatrix[playerItem] === compItem) {
            this.playerScore++;
        } else {
            this.computerScore++;
        }

        this.currentRound++;
    }

    isGameFinished () : boolean {
        return this.currentRound >= this.maxRounds;
    }

    defineGameWinner () : string {
        if (this.playerScore > this.computerScore) return 'Player won';
        if (this.playerScore < this.computerScore) return 'Computer won';
        return 'Tie';
    }

    chooseComputerTurn () : Choice {
        const randomIndex = Math.floor(Math.random() * this.choices.length);        
        return this.choices[randomIndex];
    }
};

class Player {
    chooseItem (item: Choice) : Choice {
        return item;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game(3);
    const player = new Player();

    const board = document.querySelector('.board') as HTMLElement;
    const buttons = document.querySelectorAll('.choose-button') as NodeListOf<HTMLButtonElement>;
    const restartButton = document.querySelector('.restart-button') as HTMLButtonElement;

    const updateBoard = () : void => {
        board.innerHTML = `Player score: ${game.playerScore}
                           Computer score: ${game.computerScore}
                           Current round: ${game.currentRound}
                           Rounds remaining: ${game.maxRounds - game.currentRound}`;
    }

    updateBoard();

    buttons.forEach(btn => {
        btn.addEventListener('click', e => {
            const chosenItem = (e.target as HTMLButtonElement).innerHTML as Choice;
            console.log(chosenItem);
            
            game.defineRoundWinner(player.chooseItem(chosenItem), game.chooseComputerTurn());
            updateBoard();

            if (game.isGameFinished()) {
                setTimeout(() => {
                    alert(game.defineGameWinner());
                    game.reStart();
                    updateBoard();
                }, 1500);
            }            
        });
    });

    restartButton.addEventListener('click', e => {
        game.reStart();
        updateBoard();
    });
});

