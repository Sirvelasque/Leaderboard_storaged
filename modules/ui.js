export default class Ui {
  static display(score, name, lower) {
    const container = document.getElementById('app');
    const row = document.createElement('li');
    row.classList.add('item');
    const lowerrow = this.locateLower(lower);
    row.innerHTML = `${name}: <div class='scored'>${score}</div>`;
    container.insertBefore(row, lowerrow);
  }

  static firstdisplay(score, name) {
    const container = document.getElementById('app');
    const row = document.createElement('li');
    row.classList.add('item');
    row.innerHTML = `${name}: <div class='scored'>${score}</div>`;
    container.appendChild(row);
  }

  static locateLower(lower) {
    let find;
    const items = document.querySelectorAll('.scored');
    items.forEach((item) => {
      const actual = parseInt(item.textContent, 10);

      if (lower === actual) {
        find = item.parentElement;
      }
    });
    return find;
  }

  static remove() {
    const container = document.getElementById('app');
    const items = document.querySelectorAll('.item');
    items.forEach((item) => {
      container.removeChild(item);
    });
  }
}