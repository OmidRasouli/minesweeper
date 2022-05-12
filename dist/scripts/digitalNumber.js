class DigitalNumber {
  //The pattern of the numbers which lines must be shown
  numberPatterns = [
    [1, 2, 3, 5, 6, 7], //0
    [6, 7], //1
    [2, 3, 4, 5, 6], //2
    [3, 4, 5, 6, 7], //3
    [1, 4, 6, 7], //4
    [1, 3, 4, 5, 7], //5
    [1, 2, 3, 4, 5, 7], //6
    [3, 6, 7], //7
    [1, 2, 3, 4, 5, 6, 7], //8
    [1, 3, 4, 5, 6, 7], //9
  ];
  //Show number which passed as parameter
  showNumber(index, lines) {
    this.reset(lines);
    this.numberPatterns[index].forEach((x) =>
      lines[x - 1].classList.add("show-number")
    );
  }

  //Reset number lines that must be turned off
  reset(lines) {
    lines.forEach((x) => x.classList.remove("show-number"));
  }
}
