class Mine {
  //List for mines count lines [Tens[], Ones[]]
  lines = [];
  //Exec once to store lines in lists
  constructor() {
    this.lines.push(document.querySelectorAll("#mines-100 div[data-edge]"));
    this.lines.push(document.querySelectorAll("#mines-10 div[data-edge]"));
    this.lines.push(document.querySelectorAll("#mines-1 div[data-edge]"));

    this.digitalNumber = new DigitalNumber();

    this.guess = 0;
    this.size = 0;
  }

  //Add a mark when right click event calls
  addGuess() {
    this.guess = Math.min(this.guess + 1, this.count);
    this.showCounts();
  }

  //Remove the guess
  removeGuess() {
    this.guess--;
    this.showCounts();
  }

  //Check guess counts
  checkGuess() {
    return this.count > this.guess;
  }

  //Show mine counts
  showCounts() {
    let remain = this.count - this.guess;
    this.digitalNumber.showNumber(Math.trunc(remain / 100), this.lines[0]);
    this.digitalNumber.showNumber(
      Math.trunc((remain / 10) % 10),
      this.lines[1]
    );
    this.digitalNumber.showNumber(Math.trunc(remain % 10), this.lines[2]);
  }

  //Generating random and unique number for index of the board
  mineGenerator(size, count) {
    this.count = count;
    //By using Set() make it unique
    let mines = new Set();
    //Generate numbers
    while (mines.size < count) {
      let number = Math.trunc(Math.random() * size);
      mines.add(number);
    }
    this.showCounts();
    return [...mines];
  }
}
