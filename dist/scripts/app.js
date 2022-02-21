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
    //Define board dimensions (e.g.[9x9]) and mines count (e.g.[10])
    let grids = [
      [9, 9, 10],
      [16, 16, 40],
      [30, 16, 99],
    ];
    //Get index of the board
    let size = grids[this.difficulty][0] * grids[this.difficulty][1];
    //Generating mines
    let mines = this.mineGenerator(size, grids[this.difficulty][2]);

    //Craete board and fill it by 0
    this.board = Array.from({ length: grids[this.difficulty][0] }, () =>
      Array.from({ length: grids[this.difficulty][1] }, () => 0)
    );

    //Fill the board by mines
    mines.forEach((index) => {
      //Calc row and col by using index
      let row = Math.trunc(index / grids[this.difficulty][1]);
      let col = index - row * grids[this.difficulty][1];

      //Fill the cell by * char when it must be mine
      this.board[row][col] = "*";

      //Call the noticeAround for adding a number to cells which are around the mine
      this.noticeAround(
        row,
        col,
        grids[this.difficulty][0],
        grids[this.difficulty][1]
      );
    });
    //Generate the cells in the HTML file
    this.generateCells(boardEl);
    console.log(this.board);
  }

  //Generating random and unique number for index of the board
  mineGenerator(size, minesCount) {
    //By using Set() make it unique
    let mines = new Set();
    //Generate numbers
    while (mines.size < minesCount) {
      let number = Math.trunc(Math.random() * size);
      mines.add(number);
    }
    return [...mines];
  }

  //Add a number to the cells which are around the mine
  //The pattern is below
  //123
  //4*6
  //789
  noticeAround(row, col) {
    //Cell 1
    if (row - 1 > -1 && col - 1 > -1 && !isNaN(this.board[row - 1][col - 1]))
      this.board[row - 1][col - 1]++;

    //Cell 2
    if (row - 1 > -1 && !isNaN(this.board[row - 1][col]))
      this.board[row - 1][col]++;

    //Cell 3
    if (
      row - 1 > -1 &&
      col + 1 < this.board[0].length &&
      !isNaN(this.board[row - 1][col + 1])
    )
      this.board[row - 1][col + 1]++;

    //Cell 4
    if (col - 1 > -1 && !isNaN(this.board[row][col - 1]))
      this.board[row][col - 1]++;

    //Cell 6
    if (col + 1 < this.board[0].length && !isNaN(this.board[row][col + 1]))
      this.board[row][col + 1]++;

    //Cell 7
    if (
      row + 1 < this.board.length &&
      col - 1 > -1 &&
      !isNaN(this.board[row + 1][col - 1])
    )
      this.board[row + 1][col - 1]++;

    //Cell 8
    if (row + 1 < this.board.length && !isNaN(this.board[row + 1][col]))
      this.board[row + 1][col]++;

    //Cell 9
    if (
      row + 1 < this.board.length &&
      col + 1 < this.board[0].length &&
      !isNaN(this.board[row + 1][col + 1])
    )
      this.board[row + 1][col + 1]++;
  }
      return;
    }
    if (row - 1 > -1 && col - 1 > -1 && !isNaN(this.board[row - 1][col - 1]))
      this.board[row - 1][col - 1]++;

    //Cell 2
    if (row - 1 > -1 && !isNaN(this.board[row - 1][col]))
      this.board[row - 1][col]++;

    //Cell 3
    if (row - 1 > -1 && col + 1 < y && !isNaN(this.board[row - 1][col + 1]))
      this.board[row - 1][col + 1]++;

    //Cell 4
    if (col - 1 > -1 && !isNaN(this.board[row][col - 1]))
      this.board[row][col - 1]++;

    //Cell 6
    if (col + 1 < y && !isNaN(this.board[row][col + 1]))
      this.board[row][col + 1]++;

    //Cell 7
    if (row + 1 < x && col - 1 > -1 && !isNaN(this.board[row + 1][col - 1]))
      this.board[row + 1][col - 1]++;

    //Cell 8
    if (row + 1 < x && !isNaN(this.board[row + 1][col]))
      this.board[row + 1][col]++;

    //Cell 9
    if (row + 1 < x && col + 1 < y && !isNaN(this.board[row + 1][col + 1]))
      this.board[row + 1][col + 1]++;
  }

  //Generate the cells in the HTML file
  generateCells(board) {
    this.board.forEach((c, i) => {
      c.forEach((x, j) => {
        let button = document.createElement("button");
        button.addEventListener("click", () => this.checkCell(i, j));
        button.classList.add("cell");
        buttons.set(`${i},${j}`, board.appendChild(button));
      });
    });
  }
}

//Create a game
let game = new Game(0);

//Add event to the dropdown list (difficulty)
document.querySelector("#difficulty").addEventListener("change", (x) => {
  game.difficulty = x.target.selectedIndex;
});

//Add event to button (Start Game)
document.querySelector("#startGame").addEventListener("click", () => {
  document.querySelector(".startPanel").style = "display:none";
  let board = document.querySelector(".board");
  board.classList.add(document.querySelector("#difficulty").value);
  document.querySelector("#game").classList.add("fullHeight");
  game.startGame(board);
});

//Need to exec once
(function () {})();
