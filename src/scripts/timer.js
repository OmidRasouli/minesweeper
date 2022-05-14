//You can check this repo: https://github.com/OmidRasouli/digital-clock

class Timer {
  //List for second lines [Tens[], Ones[]]
  lines = [];
  gameStopped = false;
  //Exec once to store lines in lists
  constructor() {
    this.lines.push(document.querySelectorAll("#seconds-100 div[data-edge]"));
    this.lines.push(document.querySelectorAll("#seconds-10 div[data-edge]"));
    this.lines.push(document.querySelectorAll("#seconds-1 div[data-edge]"));

    this.digitalNumber = new DigitalNumber();
    this.gameStopped = false;

    this.time = 0;

    this.countDown();
  }

  //Stop the game
  stopTimer() {
    clearTimeout(this.timeout);
    this.gameStopped = true;
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

    //Show number (hundreds - seconds)
    this.digitalNumber.showNumber(secondsHundreds, this.lines[0]);

    //Show number (tens - seconds)
    this.digitalNumber.showNumber(secondsTens, this.lines[1]);

    //Show number (ones - seconds)
    this.digitalNumber.showNumber(secondsOnes, this.lines[2]);

    let self = this;
    //Call this function after 1s
    this.timeout = setTimeout(function () {
      self.countDown(++self.time);
    }, 1000);
  }
}
