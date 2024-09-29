export class Grid {
  constructor(rows, cols) {
    this._rows = rows;
    this._cols = cols;
    this._data = [];
    for (let r = 0; r < rows; r++) {
      this._data[r] = new Array(cols).fill(0); // Initialiserer alle celler som døde
    }
  }

  // Hjælpe metode til at parse position
  _parsePosition(arg1, arg2) {
    if (typeof arg1 === 'object') {
      return { row: arg1.row, col: arg1.col };
    } else {
      return { row: arg1, col: arg2 };
    }
  }

  // Sætter en celle til en bestemt værdi
  set(arg1, arg2, arg3) {
    let pos, value;
    if (typeof arg1 === 'object') {
      pos = this._parsePosition(arg1);
      value = arg2;
    } else {
      pos = this._parsePosition(arg1, arg2);
      value = arg3;
    }
    if (this._isValidPosition(pos.row, pos.col)) {
      this._data[pos.row][pos.col] = value;
    }
  }

  // Henter værdien af en bestemt celle
  get(arg1, arg2) {
    const pos = this._parsePosition(arg1, arg2);
    if (this._isValidPosition(pos.row, pos.col)) {
      return this._data[pos.row][pos.col];
    } else {
      return undefined;
    }
  }

  // Konverterer en position til et enkelt indeks
  indexFor(arg1, arg2) {
    const pos = this._parsePosition(arg1, arg2);
    if (this._isValidPosition(pos.row, pos.col)) {
      return pos.row * this._cols + pos.col;
    } else {
      return undefined;
    }
  }

  // Konverterer et enkelt indeks tilbage til en position
  rowColFor(index) {
    if (index >= 0 && index < this.size()) {
      const row = Math.floor(index / this._cols);
      const col = index % this._cols;
      return { row, col };
    } else {
      return undefined;
    }
  }

  // Finder alle gyldige naboer til en bestemt celle
  neighbours(arg1, arg2) {
    const pos = this._parsePosition(arg1, arg2);
    const { row, col } = pos;
    const neighbours = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue; // Spring den aktuelle celle over
        const r = row + dr;
        const c = col + dc;
        if (this._isValidPosition(r, c)) {
          neighbours.push({ row: r, col: c });
        }
      }
    }
    return neighbours;
  }

  // Henter værdierne af alle naboer til en bestemt celle
  neighbourValues(arg1, arg2) {
    const neighbours = this.neighbours(arg1, arg2);
    return neighbours.map(pos => ({
      row: pos.row,
      col: pos.col,
      value: this.get(pos),
    }));
  }

  // Generel metode til at finde en celle i en bestemt retning
  direction(arg1, arg2, dr, dc) {
    const pos = this._parsePosition(arg1, arg2);
    const { row, col } = pos;
    const r = row + dr;
    const c = col + dc;
    if (this._isValidPosition(r, c)) {
      return { row: r, col: c };
    } else {
      return undefined;
    }
  }

  // Retningsmetoder bruger den generelle direction metode
  north(arg1, arg2) {
    return this.direction(arg1, arg2, -1, 0);
  }

  south(arg1, arg2) {
    return this.direction(arg1, arg2, 1, 0);
  }

  east(arg1, arg2) {
    return this.direction(arg1, arg2, 0, 1);
  }

  west(arg1, arg2) {
    return this.direction(arg1, arg2, 0, -1);
  }

  nextInRow(arg1, arg2) {
    return this.east(arg1, arg2);
  }

  nextInCol(arg1, arg2) {
    return this.south(arg1, arg2);
  }

  // Metoder til at hente grid dimensioner
  rows() {
    return this._rows;
  }

  cols() {
    return this._cols;
  }

  // Total antal celler i grid'et
  size() {
    return this._rows * this._cols;
  }

  // Fylder hele grid'et med en bestemt værdi
  fill(value) {
    for (let r = 0; r < this._rows; r++) {
      this._data[r].fill(value);
    }
  }

  // Privat metode til at tjekke om en position er gyldig
  _isValidPosition(row, col) {
    return (
      row >= 0 &&
      row < this._rows &&
      col >= 0 &&
      col < this._cols
    );
  }
}
