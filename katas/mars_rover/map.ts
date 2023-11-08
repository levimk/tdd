export type Coordinate = {
  x: number;
  y: number;
};

export default class MarsMap {
  private width: number;
  private length: number;

  constructor(width: number, length: number) {
    this.validateInput(width, length);
    this.width = width;
    this.length = length;
  }

  private validateInput(width: number, length: number): void {
    if (width < 1)
      throw new Error(`MapError: width must be 1 or more, received ${width}`);
    if (length < 1)
      throw new Error(`MapError: length must be 1 or more, received ${length}`);
  }

  isOnMap(coordinate: Coordinate): boolean {
    if (coordinate.x < 0 || coordinate.y < 0) {
      return false;
    } else {
      const beyondWidth = coordinate.x >= this.width;
      const beyondHeight = coordinate.y >= this.length;
      return !beyondWidth && !beyondHeight;
    }
  }
}
