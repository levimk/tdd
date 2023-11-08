import { describe, it, expect } from "vitest";

import MarsMap, { Coordinate } from "./map";
import Parser from "./parser";
import { Position } from "./rover";

const TEST_1 = "5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM";

describe("MarsMap", () => {
  describe("Creation", () => {
    it("should not create a 0x1 map", () => {
      const dimensions = new Parser("0 0").mapSize();
      const createMap = () => new MarsMap(dimensions.width, dimensions.length);
      expect(createMap).toThrow();
    });
    it("should not create a 1x0 map", () => {
      const createMap = () => new MarsMap(1, 0);
      expect(createMap).toThrow();
    });
    it(`should create 5x5 map from sample`, () => {
      const dimensions = new Parser(TEST_1).mapSize();
      const createMap = () => new MarsMap(dimensions.width, dimensions.length);
      expect(createMap).not.toThrow();
    });
  });

  describe("Check position", () => {
    it("should detect that x=0, y=2 is not on a 2x2 map", () => {
      const map = new MarsMap(2, 2);
      const coordinate: Coordinate = {
        x: 0,
        y: 2,
      };
      expect(map.isOnMap(coordinate)).toBe(false);
    });
    it("should detect that x=2, y=0 is not on a 2x2 map", () => {
      const map = new MarsMap(2, 2);
    });
  });
});
