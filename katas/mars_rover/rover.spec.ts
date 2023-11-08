import { describe, it, expect } from "vitest";

import Rover, { Position } from "./rover";
import MarsMap from "./map";

describe("Rover", () => {
  it("should move one square north", () => {
    const map: MarsMap = new MarsMap(2, 2);
    const position: Position = {
      x: 0,
      y: 0,
      orientation: "N",
    };
    const rover = new Rover(position, map);
    rover.move("M");
    const result: Position = {
      x: 0,
      y: 1,
      orientation: "N",
    };
    expect(rover.getPosition()).toStrictEqual(result);
  });
  it("should move one square east", () => {
    const map: MarsMap = new MarsMap(2, 2);
    const position: Position = {
      x: 0,
      y: 0,
      orientation: "E",
    };
    const rover = new Rover(position, map);
    rover.move("M");
    const result: Position = {
      x: 1,
      y: 0,
      orientation: "E",
    };
    expect(rover.getPosition()).toStrictEqual(result);
  });
  it("should move one square west", () => {
    const map: MarsMap = new MarsMap(2, 2);
    const position: Position = {
      x: 1,
      y: 1,
      orientation: "W",
    };
    const rover = new Rover(position, map);
    rover.move("M");
    const result: Position = {
      x: 0,
      y: 1,
      orientation: "W",
    };
    expect(rover.getPosition()).toStrictEqual(result);
  });
  it("should move one square south", () => {
    const map: MarsMap = new MarsMap(2, 2);
    const position: Position = {
      x: 1,
      y: 1,
      orientation: "S",
    };
    const rover = new Rover(position, map);
    rover.move("M");
    const result: Position = {
      x: 1,
      y: 0,
      orientation: "S",
    };
    expect(rover.getPosition()).toStrictEqual(result);
  });

  it("should rotate left", () => {
    const map: MarsMap = new MarsMap(2, 2);
    const position: Position = {
      x: 0,
      y: 0,
      orientation: "N",
    };
    const rover = new Rover(position, map);
    rover.move("L");
    expect(rover.getPosition().orientation).toBe("W");
    rover.move("L");
    expect(rover.getPosition().orientation).toBe("S");
    rover.move("L");
    expect(rover.getPosition().orientation).toBe("E");
    rover.move("L");
    expect(rover.getPosition().orientation).toBe("N");
  });

  it("should rotate right", () => {
    const map: MarsMap = new MarsMap(5, 5);
    const position: Position = {
      x: 0,
      y: 0,
      orientation: "N",
    };
    const rover = new Rover(position, map);
    rover.move("R");
    expect(rover.getPosition().orientation).toBe("E");
    rover.move("R");
    expect(rover.getPosition().orientation).toBe("S");
    rover.move("R");
    expect(rover.getPosition().orientation).toBe("W");
    rover.move("R");
    expect(rover.getPosition().orientation).toBe("N");
  });

  it("should not move off the map", () => {
    const map: MarsMap = new MarsMap(2, 2);
    const position: Position = {
      x: 0,
      y: 0,
      orientation: "N",
    };
    const rover: Rover = new Rover(position, map);
    rover.move("M");
    rover.move("M");
    rover.move("M");
    rover.move("R");
    rover.move("M");
    expect(rover.getPosition()).toStrictEqual({
      x: 1,
      y: 1,
      orientation: "E",
    });
  });
});
