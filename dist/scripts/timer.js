//You can check this repo: https://github.com/OmidRasouli/digital-clock

class Timer {
  //List for second lines [Tens[], Ones[]]
  secondsLines = [];
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
  gameStopped = false;
  //Exec once to store lines in lists
  constructor() {
    this.secondsLines.push(
      document.querySelectorAll("#seconds-100 div[data-edge]")
    );
    this.secondsLines.push(
      document.querySelectorAll("#seconds-10 div[data-edge]")
    );
    this.secondsLines.push(
      document.querySelectorAll("#seconds-1 div[data-edge]")
    );
    this.time = 0;

    this.countDown();
  }
  //Reset number lines that must be turned off
  reset(list) {
    list.forEach((x) => x.classList.remove("show-number"));
  }

  //Timer function (this is obvious :D)
  countDown() {
    //If the time is greater than 999 it shows 999
    if (this.time > 999 || this.gameStopped) return;

    //Calc hundreds of the seconds
    let secondsHundreds = Math.trunc(this.time / 100);
    //Calc tens of the seconds
    let secondsTens = Math.trunc((this.time / 10) % 10);
    //Calc ones of the seconds
    let secondsOnes = Math.trunc(this.time % 10);

    //Reset all numbers
    this.reset(this.secondsLines[0]);
    this.reset(this.secondsLines[1]);
    this.reset(this.secondsLines[2]);

    //Show number (hundreds - seconds)
    this.numberPatterns[secondsHundreds].forEach((x) =>
      this.secondsLines[0][x - 1].classList.add("show-number")
    );

    //Show number (tens - seconds)
    this.numberPatterns[secondsTens].forEach((x) =>
      this.secondsLines[1][x - 1].classList.add("show-number")
    );

    //Show number (ones - seconds)
    this.numberPatterns[secondsOnes].forEach((x) =>
      this.secondsLines[2][x - 1].classList.add("show-number")
    );

    let self = this;
    //Call this function after 1s
    setTimeout(function () {
      self.countDown(++self.time);
    }, 1000);
  }
}
