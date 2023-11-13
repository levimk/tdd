export type Mark = "X" | "O";
export type Player = 1 | 2;
export type Result = "Draw" | "X" | "O";
export class Game {
  private size: number = 3;
  private currPlayer: Player = 1;
  private result: Result | undefined = undefined;
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

  getResult(): Result | undefined {
    this.result = this.setResult();
    return this.result;
  }

  private setResult(): Result | undefined {
    if (this.checkRows() != undefined) return this.checkRows() as Mark;
    if (this.checkColumns() != undefined) return this.checkColumns() as Mark;
    if (this.checkTLtoBR() != undefined) return this.checkTLtoBR() as Mark;
    if (this.checBLtoTR() != undefined) return this.checBLtoTR() as Mark;
    if (this.isDraw()) {
      return "Draw";
    }
    return undefined;
  }

  private checkTLtoBR(): Mark | undefined {
    let tl = this.board.field(0, this.board.size() - 1);
    for (let col = 0; col < this.board.size(); col++) {
      for (let row = this.board.size() - 1; row >= 0; row--) {
        const isOnDiagnol: boolean = col + row + 1 == this.board.size();
        const isSameMark: boolean =
          this.board.field(col, row).getMark() == tl.getMark();
        if (isOnDiagnol && !isSameMark) {
          return undefined;
        }
      }
    }
    return tl.getMark();
  }

  private checBLtoTR(): Mark | undefined {
    let bottomLeft = this.board.field(0, 0);
    for (let i = 1; i < this.board.size(); i++) {
      const isSameMark: boolean =
        this.board.field(i, i).getMark() ==
        this.board.field(i - 1, i - 1).getMark();
      if (!isSameMark) {
        return undefined;
      }
    }
    return bottomLeft.getMark();
  }

  private checkRows(): Mark | undefined {
    for (let row = 0; row < this.board.size(); row++) {
      let isWin = this.board.field(0, row).equals(this.board.field(1, row));
      for (let col = 1; col < this.board.size(); col++) {
        isWin =
          isWin &&
          this.board.field(col, row).equals(this.board.field(col - 1, row));
      }
      if (isWin) return this.board.field(0, row).getMark() as Mark;
    }
  }
  private checkColumns(): Mark | undefined {
    for (let col = 0; col < this.board.size(); col++) {
      let isWin = this.board.field(col, 0).equals(this.board.field(col, 1));
      for (let row = 1; row < this.board.size(); row++) {
        isWin =
          isWin &&
          this.board.field(col, row).equals(this.board.field(col, row - 1));
      }
      if (isWin) return this.board.field(col, 0).getMark() as Mark;
    }
  }

  private isDraw() {
    return this.board.availableFields().length == 0;
  }
  isFinished(): boolean {
    return this.result != undefined;
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

  isMarked(): boolean {
    return this._mark != undefined;
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
export type Coordinate = { x: number; y: number };
export type Coordinates = Coordinate[];
export class Board {
  private _size: number;
  private fieldMap: FieldMap;

  constructor(size: number) {
    if (size < 1)
      throw new Error(`BoardError: size must be >= 1, received ${size}`);
    this._size = size;
    this.fieldMap = Board.buildFreshFieldMap(size);
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
    return this._size;
  }

  squares(): number {
    return this._size * this._size;
  }

  mark(mark: Mark, x: number, y: number): void {
    this.validateMark(x, y);
    this.fieldMap[x][y].mark(mark);
  }

  validateMark(x: number, y: number) {
    if (x < 0 || x >= this._size || y < 0 || y >= this._size)
      throw new Error(
        `BoardError: out of bounds mark ${x}, ${y} on ${this._size}x${this._size} board.`
      );
  }

  static from(board: Board): Board {
    const newBoard = new Board(board._size);
    newBoard.fieldMap = { ...board.fieldMap };
    return newBoard;
  }

  availableFields(): Coordinates {
    let available: Coordinates = [];
    Object.entries(this.fieldMap).forEach(
      ([x, yField]: [x: string, yField: Record<number, Field>]) => {
        Object.entries(yField).forEach(
          ([y, field]: [y: string, field: Field]) => {
            if (!field.isMarked()) {
              available.push({
                x: parseInt(x),
                y: parseInt(y),
              });
            }
          }
        );
      }
    );
    return available;
  }

  private static buildFreshFieldMap(size: number): FieldMap {
    let fieldMap: FieldMap = {};
    for (let i = 0; i < size; i++) {
      fieldMap[i] = {};
      for (let j = 0; j < size; j++) {
        fieldMap[i][j] = new Field();
      }
    }
    return fieldMap;
  }
}
