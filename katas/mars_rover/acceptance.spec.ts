import { describe, it, expect } from "vitest";

import Rover, { Move, Position, RoverInfo } from "./rover";
import MarsMap from "./map";
import Parser from "./parser";

const TEST_1 = "5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM";

describe("Acceptance", () => {
  it(`${TEST_1}`, () => {
    const parser = new Parser(TEST_1);
    const map = new MarsMap(parser.mapSize().width, parser.mapSize().length);
    const rovers = parser.rovers().map((roverInfo: RoverInfo) => {
      return new Rover(roverInfo.position, map);
    });
    rovers.forEach((rover: Rover, index: number) => {
      parser.rovers()[index].moves.forEach((move: Move) => {
        rover.move(move);
      });
      //   console.log(rover.getPosition());
    });

    // expect(rovers[0].getPosition()).toStrictEqual({})
    // expect(rovers[1].getPosition()).toStrictEqual({})
  });
});
