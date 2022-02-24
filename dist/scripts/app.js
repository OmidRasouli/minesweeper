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
  }

  //Check cell for game state
  checkCell(i, j) {
    //Is this a mine?
    if (this.board.board[i][j] === "*") {
      console.log("You lose!");
      buttons.get(`${i},${j}`).innerHTML = this.board.board[i][j];
      return "*";
    }
    //Is there a mine nearby?
    if (this.board.board[i][j] > 0) {
      console.log("Oops!");
      let btn = buttons.get(`${i},${j}`);
      btn.innerHTML = this.board.board[i][j];
      btn.classList.add(`n${this.board.board[i][j]}`);
      btn.disabled = true;
      return this.board.board[i][j];
    }
    //Wow safe field
    if (this.board.board[i][j] === 0) {
      //Check cell and its neighbours
      this.board.freeCells(i, j);
      console.log("Yey!");
      return null;
    }
  }

  gameOver(stat) {
    this.status = stat;
    if (stat === "win") {
    } else if (stat === "lose") {
    }
  }
}

//Create a game
let game = new Game(0);

//Add event to the dropdown list (difficulty)
document.querySelector("#difficulty").addEventListener("change", (x) => {
  game.difficulty = x.target.selectedIndex;
});

//Add event to button (Start Game)
document.querySelector("#start-game").addEventListener("click", () => {
  document.querySelector(".start-panel").style = "display:none";
  let board = document.querySelector(".board");
  board.classList.add(document.querySelector("#difficulty").value);
  document.querySelector("#game").classList.add("full-height");
  game.startGame(board);
});

//Need to exec once
(function () {})();
