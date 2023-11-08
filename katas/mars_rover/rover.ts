import MarsMap from "./map";

export type Dimensions = {
  width: number;
  length: number;
};

export type RoverInfo = {
  position: Position;
  moves: Move[];
};

export type Orientation = "N" | "E" | "S" | "W";

export type Move = "L" | "R" | "M";

export type Position = {
  x: number;
  y: number;
  orientation: Orientation;
};

export default class Rover {
  private position: Position;
  private map: MarsMap;
  constructor(position: Position, map: MarsMap) {
    this.position = position;
    this.map = map;
  }

  move(move: Move): void {}

  getPosition(): Position {
    return {
      x: 0,
      y: 1,
      orientation: "N",
    };
  }
}
