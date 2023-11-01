import { test, expect, describe } from "vitest";
import Wall from "./wardrobe";

/*
Imagine you have just moved into your new apartment, and then you notice that you still need a new wardrobe for your dressing room. Regrettably, you won’t find a wardrobe that fits exactly to the size of your wall. But fortunately, the Swedish furniture dealer of your choice offers you the opportunity to build your own, customized wardrobe by combining individual wardrobe elements.

The wardrobe elements are available in the following sizes:
- 50cm
- 75cm
- 100cm
- 120cm

The wall on which the wardrobe elements are placed has a total length of 250cm. With which combinations of wardrobe elements can you make the most of the space?

Write a function that returns all combinations of wardrobe elements that exactly fill the wall.

# Additional Task
Here is the price list for the available wardrobe elements:

50cm => 59 USD
75cm => 62 USD
100cm => 90 USD
120cm => 111 USD

Write a second function that checks which of the resulting combinations is the cheapest one.
*/
describe("Wall", () => {
  test("should have empty combinations if no segments registers", () => {
    const wall = new Wall({ length: 250 });
    expect(wall.combinations()).toStrictEqual([]);
  });

  test("should have one combination if an exact segment is added", () => {
    const wall = new Wall({ length: 250 });
    wall.addSegments([250]);
    expect(wall.combinations()).toStrictEqual([[250]]);
  });

  test("should multiply a segment to add up to length", () => {
    const wall = new Wall({ length: 250 });
    wall.addSegments([50]);
    expect(wall.combinations()).toStrictEqual([[50, 50, 50, 50, 50]]);
  });

  test("should have 3 combos for 100cm and 50cm", () => {
    const wall = new Wall({ length: 250 });
    wall.addSegments([100, 50]);
    const expected = [
      [100, 100, 50],
      [100, 50, 50, 50],
      [50, 50, 50, 50, 50],
    ];
    expect(wall.combinations()).toStrictEqual(expected);
  });
});
