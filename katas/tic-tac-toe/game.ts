export type Mark = "X" | "O";
export type Player = 1 | 2;
export class Game {
  private size: number = 3;
  private currPlayer: Player = 1;
  private nextPlayerMap: Record<Player, Player> = {
    1: 2,
    2: 1,
  };
  private playerMarks: Record<Player, Mark> = {
    1: "X",
    2: "O",
  };
  private board: Board;
  constructor(size: number) {
    this.size = size;
    this.board = new Board(size);
    this.validate();
  }

  private validate() {
    if (this.size < 2)
      throw new Error(
        `GameError: game must be at least 2x2, received ${this.size}`
      );
  }

  getBoard(): Board {
    return Board.from(this.board);
  }

  takeTurn(x: number, y: number): void {
    this.board.mark(this.playerMarks[this.currPlayer], x, y);
    this.rotatePlayers();
  }

  private rotatePlayers() {
    this.currPlayer = this.nextPlayerMap[this.currPlayer];
  }
}

export class Field {
  static X: Partial<Mark> = "X";
  static O: Partial<Mark> = "O";
  private _mark: undefined | Mark;

  constructor() {
    this._mark = undefined;
  }

  getMark(): Mark | undefined {
    return this._mark;
  }

  mark(mark: Mark): void {
    if (this._mark != undefined) throw new Error("FieldError: already marked.");
    if (!(mark == "X" || mark == "O"))
      throw new Error(`FieldError: mark must be x or y, received ${mark}.`);
    this._mark = mark;
  }

  equals(other: Object): boolean {
    if (other instanceof Field) {
      return other._mark == this._mark;
    }
    return false;
  }
}

export type FieldMap = Record<number, Record<number, Field>>;

export class Board {
  private _size: number;
  private fieldMap: FieldMap;

  constructor(size: number) {
    if (size < 1)
      throw new Error(`BoardError: size must be >= 1, received ${size}`);
    this._size = size;
    this.fieldMap = {} as FieldMap;
  }

  field(x: number, y: number) {
    if (x < 0 || x >= this._size || y < 0 || y >= this._size)
      throw new Error(
        `BoardError: field ${x}, ${y} is out of bounds on ${this._size}x${this._size} board.`
      );
    if (this.fieldMap[x] == undefined || this.fieldMap[x][y] == undefined)
      return new Field();
    return this.fieldMap[x][y];
  }

  size(): number {
    return this._size * this._size;
  }

  mark(mark: Mark, x: number, y: number): void {
    if (x < 0 || x >= this._size || y < 0 || y >= this._size)
      throw new Error(
        `BoardError: out of bounds mark ${x}, ${y} on ${this._size}x${this._size} board.`
      );
    if (this.fieldMap[x] == undefined) {
      this.fieldMap[x] = {};
      this.fieldMap[x][y] = new Field();
      this.fieldMap[x][y].mark(mark);
    } else if (
      this.fieldMap[x] != undefined &&
      this.fieldMap[x][y] != undefined
    ) {
      throw new Error(`BoardError: field ${x}, ${y} is already marked.`);
    }
  }

  static from(board: Board): Board {
    const newBoard = new Board(board._size);
    newBoard.fieldMap = { ...board.fieldMap };
    return newBoard;
  }

  availableFields(): FieldMap {
    return {};
  }
}
