import { describe, it, expect } from "vitest";

import Rover, { Move, Position, RoverInfo } from "./rover";
import MarsMap from "./map";
import Parser from "./parser";
import { readFileSync } from "fs";
const TEST_1 = "5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM";
const TEST_2 = "1 1\n0 0 N\nMRMR\n1 1 S\nMRMRRMLM";

// TODO: @levimk - read input in from external source, e.g. file system or command line

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
      console.log(rover.getPosition());
    });

    expect(rovers[0].getPosition()).toStrictEqual({
      x: 1,
      y: 3,
      orientation: "N",
    });
    expect(rovers[1].getPosition()).toStrictEqual({
      x: 5,
      y: 1,
      orientation: "E",
    });
  });
  it(`${TEST_2} (from file system)`, () => {
    const test_file = readFileSync(`${__dirname}/test_2.txt`, {
      encoding: "utf8",
      flag: "r",
    });
    const parser = new Parser(test_file);
    const map = new MarsMap(parser.mapSize().width, parser.mapSize().length);
    const rovers = parser.rovers().map((roverInfo: RoverInfo) => {
      return new Rover(roverInfo.position, map);
    });
    rovers.forEach((rover: Rover, index: number) => {
      parser.rovers()[index].moves.forEach((move: Move) => {
        rover.move(move);
      });
      console.log(rover.getPosition());
    });

    expect(rovers[0].getPosition()).toStrictEqual({
      x: 1,
      y: 1,
      orientation: "S",
    });
    expect(rovers[1].getPosition()).toStrictEqual({
      x: 1,
      y: 1,
      orientation: "N",
    });
  });
});
