//Map of buttons
const buttons = new Map();

//Class of the game
class Game {
  //Set difficulty
  constructor(difficulty) {
    this.difficulty = difficulty;
  }

  //By calling this method game will start
  startGame(boardEl) {
    this.board = new Board();
    this.board.generateBoard(this.difficulty, boardEl, this);

    this.stateButton = document.querySelector("#game-stat");

    this.stateButton.addEventListener("click", () => {
      document.querySelector(".start-panel").removeAttribute("style");
      let gameBoard = document.querySelector("#game");
      gameBoard.classList.remove("full-height");
      gameBoard.classList.add("hidden");
      this.board.stopTimer();
      buttons.clear();
      let board = document.querySelector(".board");
      board.classList.remove(`difficulty-${this.difficulty}`);
      game = new Game(0);
    });
    this.gameState("idle");
  }

  //Check if the game i's finished
  checkGame(correctAnswers, minesCount, boardSize) {
    if (correctAnswers === boardSize - minesCount) this.gameState("win");
  }

  //Check cell for game state
  checkCell(i, j) {
    if (this.gameIsOver()) return;

    if (buttons.get(`${i},${j}`).classList.contains("mark")) {
      return;
    }

    if (this.board.board[i][j] === "*") {
      //Is this a mine?
      console.log("You lose!");
      //buttons.get(`${i},${j}`).innerHTML = this.board.board[i][j];
      buttons.get(`${i},${j}`).classList.remove("mark");
      buttons.get(`${i},${j}`).classList.add("mine");
      buttons.get(`${i},${j}`).disabled = true;
      //Game over - Lose
      this.gameState("lose");
      return "*";
    }
    //Is there a mine nearby?
    if (this.board.board[i][j] > 0) {
      console.log("Oops!");
      buttons.get(`${i},${j}`).classList.remove("mark");
      let btn = buttons.get(`${i},${j}`);
      btn.innerHTML = this.board.board[i][j];
      btn.classList.add(`n${this.board.board[i][j]}`);
      btn.disabled = true;
      this.board.board[i][j] = "-";
      this.board.checkBoard();
      return this.board.board[i][j];
    }
    //Wow safe field
    if (this.board.board[i][j] === 0) {
      //Check cell and its neighbours
      this.board.freeCells(i, j);
      console.log("Yey!");
      buttons.get(`${i},${j}`).classList.remove("mark");
      return null;
    }
  }

  gameState(stat) {
    this.status = stat;
    if (this.status === "win") {
      this.stateButton.classList.add("sunglasses");
      this.board.stopTimer();
    } else if (this.status === "lose") {
      this.stateButton.classList.add("sad");
      this.board.stopTimer();
    } else if (this.status === "idle") {
      this.stateButton.classList.remove("sad", "sunglasses");
    }
  }

  gameIsOver() {
    return this.status !== "idle";
  }
}

//Create a game
let game = new Game(0);

//Need to exec once
(function () {
  document.querySelector("#game").classList.add("hidden");
  //Get start buttons
  const startButtons = document.querySelectorAll(".start-button");

  //Add event to buttons (Start Game)
  startButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log(e.target.dataset.difficulty);
      game.difficulty = e.target.dataset.difficulty;
      document.querySelector(".start-panel").style = "display:none";
      let board = document.querySelector(".board");
      board.classList.add(`difficulty-${e.target.dataset.difficulty}`);
      let gameBoard = document.querySelector("#game");
      gameBoard.classList.add("full-height");
      gameBoard.classList.remove("hidden");
      game.startGame(board);
    });
  });
})();
