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

  move(move: Move): void {
    if (!["L", "R", "M"].includes(move))
      throw new Error(`RoverError: move must be L, R, or M, received ${move}`);
    if (move == "M") {
      const updatedPosition: Position = this.handleMove();
      if (this.map.isOnMap(updatedPosition))
        this.position = { ...updatedPosition };
    } else {
      this.position = { ...this.position, orientation: this.rotate(move) };
    }
  }

  private handleMove(): Position {
    const moveMap: Record<Orientation, Position> = {
      N: {
        x: 0,
        y: 1,
        orientation: "N",
      },
      E: {
        x: 1,
        y: 0,
        orientation: "E",
      },
      S: {
        x: 0,
        y: -1,
        orientation: "S",
      },
      W: {
        x: -1,
        y: 0,
        orientation: "W",
      },
    };
    return {
      x: moveMap[this.position.orientation].x + this.position.x,
      y: moveMap[this.position.orientation].y + this.position.y,
      orientation: moveMap[this.position.orientation].orientation,
    };
  }

  private rotate(direction: "L" | "R"): Orientation {
    // assert(["l", "R"].includes(direction));
    type RotationMapping = {
      L: Orientation;
      R: Orientation;
    };
    const directionMapper: Record<Orientation, RotationMapping> = {
      N: { L: "W", R: "E" },
      E: { L: "N", R: "S" },
      S: { L: "E", R: "W" },
      W: { L: "S", R: "N" },
    };

    return directionMapper[this.position.orientation][direction];
  }

  getPosition(): Position {
    return { ...this.position };
  }
}
