class Game {
  constructor(difficulty) {
    this.difficulty = difficulty;
  }

  startGame() {
    let grids = [
      [9, 9, 10],
      [16, 16, 40],
      [30, 16, 99],
    ];
    let size = grids[this.difficulty][0] * grids[this.difficulty][1];
    let mines = this.mineGenerator(size, grids[this.difficulty][2]);

    this.board = Array.from({ length: grids[this.difficulty][0] }, () =>
      Array.from({ length: grids[this.difficulty][1] }, () => 0)
    );

    mines.forEach((x) => {
      let row = Math.floor(x / grids[this.difficulty][0]);
      let col = x % grids[this.difficulty][1];

      this.board[row][col] = "*";
      this.noticeAround(
        row,
        col,
        grids[this.difficulty][0],
        grids[this.difficulty][1]
      );
    });
    console.log(this.board);
  }

  mineGenerator(size, minesCount) {
    let mines = new Set();
    while (mines.size < minesCount) {
      let number = Math.trunc(Math.random() * size);
      mines.add(number);
    }
    return [...mines];
  }

  noticeAround(row, col, x, y) {
    if (
      row - 1 > -1 &&
      col - 1 > -1 &&
      !isNaN(this.board[row - 1][col - 1])
    )
      this.board[row - 1][col - 1]++;

    if (row - 1 > -1 && !isNaN(this.board[row - 1][col]))
      this.board[row - 1][col]++;

    if (
      row - 1 > -1 &&
      col + 1 < y &&
      !isNaN(this.board[row - 1][col + 1])
    )
      this.board[row - 1][col + 1]++;

    if (col - 1 > -1 && !isNaN(this.board[row][col - 1]))
      this.board[row][col - 1]++;

    if (col + 1 < y && !isNaN(this.board[row][col + 1]))
      this.board[row][col + 1]++;

    if (
      row + 1 < x &&
      col - 1 > -1 &&
      !isNaN(this.board[row + 1][col - 1])
    )
      this.board[row + 1][col - 1]++;

    if (row + 1 < x && !isNaN(this.board[row + 1][col]))
      this.board[row + 1][col]++;

    if (
      row + 1 < x &&
      col + 1 < y &&
      !isNaN(this.board[row + 1][col + 1])
    )
      this.board[row + 1][col + 1]++;
  }
}

let game = new Game(0);

document.querySelector("#difficulty").addEventListener("change", (x) => {
  game.difficulty = x.target.selectedIndex;
});
document.querySelector("#startGame").addEventListener("click", () => {
  document.querySelector(".startPanel").style = "display:none";
  game.startGame();
});

(function () {
  document.querySelector(".startPanel").style = "display:none";
  game.startGame();
})();
