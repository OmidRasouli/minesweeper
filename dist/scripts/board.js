class Board {
  constructor() {
    this.disableRightClick();
    this.context = new Map();
  }

  //Events for right click
  moreActions(currentCell) {
    if (game.status != "idle") return;
    if (this.context.has(currentCell)) {
      currentCell.classList.remove("mark");
      this.context.delete(currentCell);
    } else {
      this.context.set(currentCell, "mark");
      currentCell.classList.add("mark");
    }
  }

  //Disable right click
  disableRightClick() {
    document.addEventListener("contextmenu", (event) => {
      //Disable right click
      event.preventDefault();

      let element = event.path[0];
      //Add event to right click
      if (element.classList.contains("cell") && !element.disabled)
        this.moreActions(event.path[0]);
    });
  }

  //By calling this method game will start
  generateBoard(difficulty, boardEl, game) {
    //Define board dimensions (e.g.[9x9]) and mines count (e.g.[10])
    let grids = [
      [9, 9, 10],
      [16, 16, 40],
      [30, 16, 99],
    ];
    //Get index of the board
    let size = grids[difficulty][0] * grids[difficulty][1];
    //Store mines count
    this.minesCount = grids[difficulty][2];
    //Generating mines
    let mines = new Mine().mineGenerator(size, this.minesCount);

    //Craete board and fill it by 0
    this.board = Array.from({ length: grids[difficulty][0] }, () =>
      Array.from({ length: grids[difficulty][1] }, () => 0)
    );

    //Fill the board by mines
    mines.forEach((index) => {
      //Calc row and col by using index
      let row = Math.trunc(index / grids[difficulty][1]);
      let col = index - row * grids[difficulty][1];

      //Fill the cell by * char when it must be mine
      this.board[row][col] = "*";

      //Call the noticeAround for adding a number to cells which are around the mine
      this.noticeAround(row, col);
    });
    //Generate the cells in the HTML file
    this.generateCells(boardEl, game);
    this.timer = new Timer();
    console.log(this.board);
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

  //Generate the cells in the HTML file
  generateCells(board, game) {
    this.board.forEach((c, i) => {
      c.forEach((x, j) => {
        let button = document.createElement("button");
        button.addEventListener("click", () => game.checkCell(i, j));
        button.classList.add("cell");
        buttons.set(`${i},${j}`, board.appendChild(button));
      });
    });
  }

  //Free empty cells
  freeCells(row, col) {
    //This isn't a mine or safe field
    if (this.board[row][col] > 0) {
      //Cell address
      let dim = [row, col];
      //Get button
      let btn = buttons.get(`${dim[0]},${dim[1]}`);
      //Disable button
      btn.disabled = true;
      //Show the number if the field as buttons value
      btn.innerHTML = this.board[dim[0]][dim[1]];
      //Add color of the text
      btn.classList.add(`n${this.board[dim[0]][dim[1]]}`);
      //Make it neutral
      this.board[dim[0]][dim[1]] = "-";
      //Remove mark class
      btn.classList.remove("mark");
      return;
    }

    //This is not a mine
    if (!isNaN(this.board[row][col])) {
      //Cell address
      let dim = [row, col];
      //If this is a safe field and make it neutral
      if (this.board[dim[0]][dim[1]] === 0) this.board[dim[0]][dim[1]] = "-";
      //Get button
      let btn = buttons.get(`${dim[0]},${dim[1]}`);
      //Disable button
      btn.disabled = true;
      //Remove mark class
      btn.classList.remove("mark");
    }

    //Cell 1
    if (row - 1 > -1 && col - 1 > -1 && !isNaN(this.board[row - 1][col - 1])) {
      //Cell address
      let dim = [row - 1, col - 1];
      //If this is a safe field and make it neutral
      if (this.board[dim[0]][dim[1]] === 0) this.board[dim[0]][dim[1]] = "-";
      //Get button
      let btn = buttons.get(`${dim[0]},${dim[1]}`);
      //Disable button
      btn.disabled = true;
      //Remove mark class
      btn.classList.remove("mark");
      //Check neighbors
      this.freeCells(...dim);
    }

    //Cell 2
    if (row - 1 > -1 && !isNaN(this.board[row - 1][col])) {
      //Cell address
      let dim = [row - 1, col];
      //If this is a safe field and make it neutral
      if (this.board[dim[0]][dim[1]] === 0) this.board[dim[0]][dim[1]] = "-";
      //Get button
      let btn = buttons.get(`${dim[0]},${dim[1]}`);
      //Disable button
      btn.disabled = true;
      //Remove mark class
      btn.classList.remove("mark");
      //Check neighbors
      this.freeCells(...dim);
    }

    //Cell 3
    if (
      row - 1 > -1 &&
      col + 1 < this.board[0].length &&
      !isNaN(this.board[row - 1][col + 1])
    ) {
      //Cell address
      let dim = [row - 1, col + 1];
      //If this is a safe field and make it neutral
      if (this.board[dim[0]][dim[1]] === 0) this.board[dim[0]][dim[1]] = "-";
      //Get button
      let btn = buttons.get(`${dim[0]},${dim[1]}`);
      //Disable button
      btn.disabled = true;
      //Remove mark class
      btn.classList.remove("mark");
      //Check neighbors
      this.freeCells(...dim);
    }

    //Cell 4
    if (col - 1 > -1 && !isNaN(this.board[row][col - 1])) {
      //Cell address
      let dim = [row, col - 1];
      //If this is a safe field and make it neutral
      if (this.board[dim[0]][dim[1]] === 0) this.board[dim[0]][dim[1]] = "-";
      //Get button
      let btn = buttons.get(`${dim[0]},${dim[1]}`);
      //Disable button
      btn.disabled = true;
      //Remove mark class
      btn.classList.remove("mark");
      //Check neighbors
      this.freeCells(...dim);
    }

    //Cell 6
    if (col + 1 < this.board[0].length && !isNaN(this.board[row][col + 1])) {
      //Cell address
      let dim = [row, col + 1];
      //If this is a safe field and make it neutral
      if (this.board[dim[0]][dim[1]] === 0) this.board[dim[0]][dim[1]] = "-";
      //Get button
      let btn = buttons.get(`${dim[0]},${dim[1]}`);
      //Disable button
      btn.disabled = true;
      //Remove mark class
      btn.classList.remove("mark");
      //Check neighbors
      this.freeCells(...dim);
    }

    //Cell 7
    if (
      row + 1 < this.board.length &&
      col - 1 > -1 &&
      !isNaN(this.board[row + 1][col - 1])
    ) {
      //Cell address
      let dim = [row + 1, col - 1];
      //If this is a safe field and make it neutral
      if (this.board[dim[0]][dim[1]] === 0) this.board[dim[0]][dim[1]] = "-";
      //Get button
      let btn = buttons.get(`${dim[0]},${dim[1]}`);
      //Disable button
      btn.disabled = true;
      //Remove mark class
      btn.classList.remove("mark");
      //Check neighbors
      this.freeCells(...dim);
    }

    //Cell 8
    if (row + 1 < this.board.length && !isNaN(this.board[row + 1][col])) {
      //Cell address
      let dim = [row + 1, col];
      //If this is a safe field and make it neutral
      if (this.board[dim[0]][dim[1]] === 0) this.board[dim[0]][dim[1]] = "-";
      //Get button
      let btn = buttons.get(`${dim[0]},${dim[1]}`);
      //Disable button
      btn.disabled = true;
      //Remove mark class
      btn.classList.remove("mark");
      //Check neighbors
      this.freeCells(...dim);
    }

    //Cell 9
    if (
      row + 1 < this.board.length &&
      col + 1 < this.board[0].length &&
      !isNaN(this.board[row + 1][col + 1])
    ) {
      //Cell address
      let dim = [row + 1, col + 1];
      //If this is a safe field and make it neutral
      if (this.board[dim[0]][dim[1]] === 0) this.board[dim[0]][dim[1]] = "-";
      //Get button
      let btn = buttons.get(`${dim[0]},${dim[1]}`);
      //Disable button
      btn.disabled = true;
      //Remove mark class
      btn.classList.remove("mark");
      //Check neighbors
      this.freeCells(...dim);
    }
  }
}
