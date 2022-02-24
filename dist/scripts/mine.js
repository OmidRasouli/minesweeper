class Mine {
  constructor() {}

  //Generating random and unique number for index of the board
  mineGenerator(size, count) {
    //By using Set() make it unique
    let mines = new Set();
    //Generate numbers
    while (mines.size < count) {
      let number = Math.trunc(Math.random() * size);
      mines.add(number);
    }
    return [...mines];
  }
}
