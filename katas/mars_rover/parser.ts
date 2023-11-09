import { Dimensions, RoverInfo, Move, Position, Orientation } from "./rover";

type RoverString = {
  positionString: string;
  movesString: string;
};
type InputParts = {
  mapSizeString: string;
  roverStrings: RoverString[];
};

export default class Parser {
  private parsedMapSize: Dimensions = { width: 0, length: 0 };
  private parsedRovers: RoverInfo[] = [];

  constructor(input: string) {
    const parts = this.parseParts(input);
    this.parseMapSize(parts.mapSizeString);
    this.parsedRovers = this.parseRovers(parts.roverStrings);
  }

  private parseParts(input: string): InputParts {
    const parts = input.split("\n");
    if (parts.length % 2 != 1)
      throw new Error("ParserError: invalid input string");
    let rovers: RoverString[] = [];
    parts.slice(1).forEach((part: string, index: number) => {
      if (Number.isSafeInteger(parseInt(part[0])))
        rovers.push({
          positionString: part,
          movesString: parts[index + 2],
        });
    });
    const _parts = {
      mapSizeString: parts[0],
      roverStrings: rovers,
    };
    return _parts;
  }

  private parseRovers(rovers: RoverString[]): RoverInfo[] {
    return rovers.map((rover: RoverString) => this.parseRover(rover));
  }

  private parseRover(rover: RoverString): RoverInfo {
    const position = this.parsePositionString(rover.positionString);
    const moves: Move[] = this.parseMoves(rover.movesString);
    return {
      position,
      moves,
    };
  }

  private parseMoves(movesString: string): Move[] {
    return Array.from(movesString).map((move: string) => {
      if (!["L", "R", "M"].includes(move))
        throw new Error(
          `ParserError: move must be one of L, R, or M, received ${move}`
        );
      return move as Move;
    });
  }

  private parsePositionString(positionString: string): Position {
    const parts = positionString.split(" ");
    if (parts.length != 3)
      throw new Error(
        `ParserError: rover position string should have exactly 3 parts, received ${parts.length}`
      );
    if (!Number.isSafeInteger(Number.parseInt(parts[0])))
      throw new Error(
        `ParserError: rover X must be an integer, received ${parts[0]}`
      );
    if (!Number.isSafeInteger(Number.parseInt(parts[1])))
      throw new Error(
        `ParserError: rover Y must be an integer, received ${parts[1]}`
      );
    if (!["N", "S", "E", "W"].includes(parts[2]))
      throw new Error(
        `ParserError: rover orientation must be N, S, E, or W, received ${parts[2]}`
      );
    const position: Position = {
      x: parseInt(parts[0]),
      y: parseInt(parts[1]),
      orientation: parts[2] as Orientation,
    };
    return position;
  }

  private parseMapSize(line: string) {
    const parts = line.split(" ");
    if (parts.length != 2) {
      throw new Error(
        `ParserError: map size string should have exactly 2 parts, received ${parts.length}`
      );
    }
    if (!Number.isSafeInteger(Number.parseInt(parts[0])))
      throw new Error(
        `ParserError: width must be an integer, received ${parts[0]}`
      );
    if (!Number.isSafeInteger(Number.parseInt(parts[1])))
      throw new Error(
        `ParserError: length must be an integer, received ${parts[1]}`
      );

    this.parsedMapSize = {
      width: parseInt(parts[0]),
      length: parseInt(parts[1]),
    };
  }

  rover(index: number): RoverInfo {
    if (index < 0 || index >= this.parsedRovers.length)
      throw new Error("ParserError: rover index out of range");
    return this.parsedRovers[index];
  }

  rovers(): RoverInfo[] {
    return this.parsedRovers;
  }

  mapSize(): Dimensions {
    return this.parsedMapSize;
  }
}
