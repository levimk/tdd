type OFF = 0;
type ON = 1;
type CellType = ON | OFF;

class Grid {
  private grid: Array<Array<CellType>>;
  private length: number;
  private height: number;
  static OFF: OFF = 0;
  static ON: ON = 1;

  constructor(length: number, height: number) {
    this.length = length;
    this.height = height;
    this.grid = [];
    for (let i = 0; i < height; i++) {
      this.grid.push([]);
      for (let j = 0; j < length; j++) {
        this.grid[i].push(0);
      }
    }
  }

  sum(): number {
    let sum = 0;
    this.grid.forEach((row: Array<CellType>) => {
      row.forEach((cell: CellType) => {
        sum += cell ? 1 : 0;
      });
    });
    return sum;
  }

  setCells(to: CellType, x0: number, y0: number, x1: number, y1: number) {
    if (to != 0 && to != 1)
      throw new Error(`Cannot set cell to invalid value ${to}`);
    this.validRange(x0, y0, x1, y1);
    for (let i = y0; i <= y1; i++) {
      for (let j = x0; j <= x1; j++) {
        this.grid[i][j] = to;
      }
    }
  }

  private validRange(x0: number, y0: number, x1: number, y1: number) {
    if (x0 < 0 || x0 >= this.length)
      throw new Error(`x0 not in range 0 to ${this.length}`);
    if (y0 < 0 || y0 >= this.height)
      throw new Error(`y0 not in range 0 to ${this.height}`);
    if (x1 < 0 || x1 >= this.length)
      throw new Error(`x1 not in range 0 to ${this.length}`);
    if (y1 < 0 || y1 >= this.height)
      throw new Error(`y1 not in range 0 to ${this.height}`);
  }

  getCell(x: number, y: number) {
    if (x < 0 || x >= this.length)
      throw new Error(`x not in range 0 to ${this.length}`);
    if (y < 0 || y >= this.height)
      throw new Error(`y not in range 0 to ${this.height}`);
    return this.grid[y][x];
  }

  toggle({
    x0,
    y0,
    x1,
    y1,
  }: {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
  }) {
    for (let i = y0; i <= y1; i++) {
      for (let j = x0; j <= x1; j++) {
        this.flip(j, i);
      }
    }
  }

  flip(x: number, y: number): void {
    this.grid[y][x] = this.grid[y][x] == 0 ? 1 : 0;
  }
}

export default class ChristmasLights {
  private length: number;
  private height: number;
  private grid: Grid;

  constructor(length: number, height: number) {
    this.length = length;
    this.height = height;
    this.grid = new Grid(length, height);
  }

  total() {
    return this.length * this.height;
  }

  hasOn() {
    return this.grid.sum();
  }

  turnOn({
    x0,
    y0,
    x1,
    y1,
  }: {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
  }): ChristmasLights {
    this.grid.setCells(Grid.ON, x0, y0, x1, y1);
    return this;
  }

  turnOff({
    x0,
    y0,
    x1,
    y1,
  }: {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
  }): ChristmasLights {
    this.grid.setCells(Grid.OFF, x0, y0, x1, y1);
    return this;
  }

  isOn({ x, y }: { x: number; y: number }): boolean {
    return this.grid.getCell(x, y) == Grid.ON;
  }

  isOff({ x, y }: { x: number; y: number }): boolean {
    return this.grid.getCell(x, y) == Grid.OFF;
  }

  toggle({
    x0,
    y0,
    x1,
    y1,
  }: {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
  }): ChristmasLights {
    this.grid.toggle({
      x0,
      y0,
      x1,
      y1,
    });
    return this;
  }
}
