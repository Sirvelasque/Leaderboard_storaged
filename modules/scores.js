import Player from './player.js';
import display from './ui.js';

export default class score {
  static scores = [];

  static high = 0;

  static addScore(score, name) {
    let lower = 0;
    if (!localStorage.getItem('scores')) {
      localStorage.setItem('scores', JSON.stringify(this.scores));
    }
    const play = new Player(score, name);

    this.scores.forEach((actual) => {
      if (parseInt(score, 10) > parseInt(actual.score, 10)
      && parseInt(lower, 10) <= parseInt(actual.score, 10)) {
        lower = actual.score;
      }
    });
    let indexh = -1;
    let indexl = -1;
    for (let i = 0; i < this.scores.length; i += 1) {
      if (parseInt(this.scores[i].score, 10) === parseInt(this.high, 10)) {
        indexh = i;
        break;
      }
    }

    for (let i = 0; i < this.scores.length; i += 1) {
      if (parseInt(this.scores[i].score, 10) === parseInt(lower, 10)) {
        indexl = i;
        break;
      }
    }

    if (parseInt(score, 10) > parseInt(this.high, 10)) {
      this.scores.splice(indexh + 1, 0, play);
      this.high = parseInt(score, 10);
    } else {
      this.scores.splice(indexl + 1, 0, play);
    }

    if (this.scores.length > 1) {
      display.display(parseInt(score, 10), name, parseInt(lower, 10));
    } else {
      display.firstdisplay(parseInt(score, 10), name);
    }
    this.storage();
  }

  static refresh() {
    this.scores.length = 0;
    this.scores = [];
    console.log(this.scores)
    this.storage();
    display.remove();
  }

  static init() {
    this.scores.slice().reverse().forEach((e) => {
      display.display(e.score, e.name);
    });
  }

  static loadDataFromStorage() {
    const data = JSON.parse(localStorage.getItem('scores'));
    if (data && data !== '') {
      this.scores = data.map((value) => new Player(value.score, value.name));
    }
    this.init();
  }

  static storage() {
    localStorage.setItem('scores', JSON.stringify(this.scores));
  }
}