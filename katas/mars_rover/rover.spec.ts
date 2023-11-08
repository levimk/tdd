import { describe, it, expect } from "vitest";

import Rover, { Position } from "./rover";
import MarsMap from "./map";

describe("Rover", () => {
  it("should move one square north from origin", () => {
    const map: MarsMap = new MarsMap(5, 5);
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
  it("should rotate left", () => {
    const map: MarsMap = new MarsMap(5, 5);
    const position: Position = {
      x: 0,
      y: 0,
      orientation: "N",
    };
    const rover = new Rover(position, map);
    rover.move("L");
    const result: Position = {
      x: 0,
      y: 0,
      orientation: "W",
    };
    expect(rover.getPosition()).toStrictEqual(result);
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
    const result: Position = {
      x: 0,
      y: 0,
      orientation: "E",
    };
    expect(rover.getPosition()).toStrictEqual(result);
  });
});
