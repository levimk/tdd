import { describe, it, expect, beforeEach } from "vitest";
import ChristmasLights from "./ChristmasLights";

/*
Because your neighbors keep defeating you in the holiday house decorating contest year after year, you’ve decided to deploy one million lights in a 1000x1000 grid. Furthermore, because you’ve been especially nice this year, Santa has mailed you instructions on how to display the ideal lighting configuration.Lights in your grid are numbered from 0 to 999 in each direction; the lights at each corner are at 0,0, 0,999, 999,999, and 999,0. The instructions include whether to turn on, turn off, or toggle various inclusive ranges given as coordinate pairs. Each coordinate pair represents opposite corners of a rectangle, inclusive; a coordinate pair like 0,0 through 2,2 therefore refers to 9 lights in a 3x3 square. The lights all start turned off. To defeat your neighbors this year, all you have to do is set up your lights by doing the instructions Santa sent you in order.

Examples
turn on 0,0 through 999,999 would turn on (or leave on) every light.
toggle 0,0 through 999,0 would toggle the first line of 1000 lights, turning off the ones that were on, and turning on the ones that were off.
turn off 499,499 through 500,500 would turn off (or leave off) the middle four lights.
*/

const HEIGHT = 1000;
const LENGTH = 1000;

describe("Christmas Lights", () => {
  let xmasDisplay: ChristmasLights;

  beforeEach(() => {
    xmasDisplay = new ChristmasLights(HEIGHT, LENGTH);
  });

  it("should have 1,000,000 lights", () => {
    const totalLights = xmasDisplay.total();
    const expectedTotal = 1000000;
    expect(totalLights).toEqual(expectedTotal);
  });

  it("should have 0 on to begin", () => {
    expect(xmasDisplay.hasOn()).toBe(0);
  });

  it("turn on 0,0 through 999,999 should turn on every light", () => {
    xmasDisplay.turnOn({ x0: 0, y0: 0, x1: 999, y1: 999 });
    expect(xmasDisplay.hasOn()).toBe(1000000);
  });

  it("turn on 0,0 through 999,0 should turn on the first row", () => {
    xmasDisplay.turnOn({ x0: 0, y0: 0, x1: 999, y1: 0 });
    expect(xmasDisplay.hasOn()).toBe(1000);
    expect(xmasDisplay.isOn({ x: 0, y: 0 })).toBe(true);
    expect(xmasDisplay.isOn({ x: 999, y: 0 })).toBe(true);
    expect(xmasDisplay.isOn({ x: 0, y: 999 })).toBe(false);
  });

  it("should turn on lights that are turned off", () => {
    xmasDisplay.turnOn({ x0: 0, y0: 0, x1: 0, y1: 0 });
    expect(xmasDisplay.isOn({ x: 0, y: 0 })).toBe(true);
  });

  it("should leave on lights that are already on", () => {
    xmasDisplay.turnOn({ x0: 0, y0: 0, x1: 0, y1: 0 });
    xmasDisplay.turnOn({ x0: 0, y0: 0, x1: 0, y1: 0 });
    expect(xmasDisplay.isOn({ x: 0, y: 0 })).toBe(true);
  });

  it("should turn off lights that are on", () => {
    xmasDisplay.turnOn({ x0: 0, y0: 0, x1: 0, y1: 0 });
    xmasDisplay.turnOff({ x0: 0, y0: 0, x1: 0, y1: 0 });
    expect(xmasDisplay.isOff({ x: 0, y: 0 })).toBe(true);
  });

  it("should leave off lights that are already off", () => {
    xmasDisplay.turnOff({ x0: 0, y0: 0, x1: 0, y1: 0 });
    expect(xmasDisplay.isOff({ x: 0, y: 0 })).toBe(true);
  });

  it("should toggle a single bulb OFF to ON", () => {
    xmasDisplay.toggle({ x0: 0, y0: 0, x1: 0, y1: 0 });
    expect(xmasDisplay.isOn({ x: 0, y: 0 })).toBe(true);
  });

  it("should toggle a single bulb ON to OFF", () => {
    xmasDisplay.turnOn({ x0: 0, y0: 0, x1: 0, y1: 0 });
    xmasDisplay.toggle({ x0: 0, y0: 0, x1: 0, y1: 0 });
    expect(xmasDisplay.isOff({ x: 0, y: 0 })).toBe(true);
  });

  it("should toggle a range of light bulbs", () => {
    xmasDisplay.turnOn({ x0: 1, y0: 1, x1: 1, y1: 1 });
    xmasDisplay.toggle({ x0: 0, y0: 0, x1: 1, y1: 1 });
    expect(
      xmasDisplay.isOn({ x: 0, y: 0 }) && xmasDisplay.isOff({ x: 1, y: 1 })
    ).toBe(true);
  });

  it("turn off 499,499 through 500,500 should turn off (or leave off) the middle four lights", () => {
    xmasDisplay.turnOn({
      x0: 499,
      y0: 499,
      x1: 500,
      y1: 500,
    });
    xmasDisplay.turnOff({
      x0: 499,
      y0: 499,
      x1: 500,
      y1: 500,
    });
    const light1Off = xmasDisplay.isOff({
      x: 499,
      y: 499,
    });
    const light2Off = xmasDisplay.isOff({
      x: 500,
      y: 499,
    });
    const light3Off = xmasDisplay.isOff({
      x: 499,
      y: 500,
    });
    const light4Off = xmasDisplay.isOff({
      x: 500,
      y: 500,
    });
    expect(light1Off && light2Off && light3Off && light4Off).toBe(true);
  });
});
