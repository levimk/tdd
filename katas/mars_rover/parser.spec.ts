import { describe, it, expect } from "vitest";

import { Dimensions, RoverInfo } from "./rover";
import Parser from "./parser";

describe("Input Parsing", () => {
  it("should parse '0 0'", () => {
    const parser: Parser = new Parser("0 0");
    const result: Dimensions = parser.mapSize();
    expect(result).toStrictEqual({ width: 0, length: 0 });
  });
  it("should parse '1 2'", () => {
    const parser: Parser = new Parser("1 2");
    const result: Dimensions = parser.mapSize();
    expect(result).toStrictEqual({ width: 1, length: 2 });
  });

  it("should parse '5 5\\n1 2 N\\nLMLMLMLMM'", () => {
    const parser = new Parser("5 5\n1 2 N\nLMLMLMLMM");
    const result: RoverInfo = parser.rover(0);
    expect(result.position).toStrictEqual({
      x: 1,
      y: 2,
      orientation: "N",
    });
    expect(result.moves).toStrictEqual([..."LMLMLMLMM"]);
  });

  it("should parse '5 5\\n1 2 N\\nLMLMLMLMM\\n3 3 E\\nMMRMMRMRRM'", () => {
    const parser = new Parser("5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM");
    const rover_1 = {
      position: {
        x: 1,
        y: 2,
        orientation: "N",
      },
      moves: [..."LMLMLMLMM"],
    };
    const rover_2 = {
      position: {
        x: 3,
        y: 3,
        orientation: "E",
      },
      moves: [..."MMRMMRMRRM"],
    };
    expect(parser.rovers()).toStrictEqual([rover_1, rover_2]);
  });
});
