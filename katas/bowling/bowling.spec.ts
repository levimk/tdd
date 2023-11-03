import { describe, it, expect } from "vitest";
import BowlingGame from "./Bowling";
/*
The game consists of 10 frames as shown above.  In each frame the player has
two opportunities to knock down 10 pins.  The score for the frame is the total
number of pins knocked down, plus bonuses for strikes and spares.

A spare is when the player knocks down all 10 pins in two tries.  The bonus for
that frame is the number of pins knocked down by the next roll.  So in frame 3
above, the score is 10 (the total number knocked down) plus a bonus of 5 (the
number of pins knocked down on the next roll.)

A strike is when the player knocks down all 10 pins on his first try.  The bonus
for that frame is the value of the next two balls rolled.

In the tenth frame a player who rolls a spare or strike is allowed to roll the extra
balls to complete the frame.  However no more than three balls can be rolled in
tenth frame.
*/

/*
TODO: requirements
  [_] 10 frames
  [_] 1 frame
      [_] Two opportunities to knock down 10 pins
  [_] Spare: all ten pins in two tries
      [_] Bonus: the number of pins knocked down in the NEXT bowl
  [_] Strike: all ten pins in one try
      [_] Bonus: the value of the next two balls rolled
  [_] Tenth roll: a spare or a strike gets another roll.
      [_] Constraint: no more than three bowls in the tenth frame

TODO: rolling
  [_] Frame 1. Bowl 1 = 1. Bowl 2 = 4. Total = 5
*/

describe("Bowling Game", () => {
  it("should start the game on 0", () => {
    const game = new BowlingGame();
    expect(game.score()).toBe(0);
  });

  it("should validate score for a bowl", () => {
    const game = new BowlingGame();
    const tooLow = () => game.bowl(-1);
    const tooHigh = () => game.bowl(11);
    expect(tooLow).toThrowError();
    expect(tooHigh).toThrowError();
  });

  it("should score regular frame: 1, 4", () => {
    const game = new BowlingGame();
    game.bowl(1);
    game.bowl(4);
    expect(game.score()).toBe(5);
  });

  it("should score multiple regular frames: 1, 2, 3, 4", () => {
    const game = new BowlingGame();
    game.bowl(1);
    game.bowl(2);
    game.bowl(3);
    game.bowl(4);
    expect(game.score()).toBe(10);
  });

  it("should show the score for a particular round", () => {
    const game = new BowlingGame();
    game.bowl(1);
    game.bowl(4);
    expect(game.round(1).bowl_1).toBe(1);
    expect(game.round(1).bowl_2).toBe(4);
    expect(game.round(1).subtotal).toBe(5);
  });

  it("should show score for a round after first bowl", () => {
    const game = new BowlingGame();
    game.bowl(1);
    expect(game.round(1).bowl_1).toBe(1);
    expect(game.round(1).bowl_2).toBe(undefined);
    expect(game.round(1).subtotal).toBe(1);
  });

  it("should not have scores for rounds that have not been played yet", () => {
    const game = new BowlingGame();
    game.bowl(1);
    game.bowl(4);
    expect(game.round(2).bowl_1).toBe(undefined);
    expect(game.round(2).bowl_2).toBe(undefined);
    expect(game.round(2).subtotal).toBe(undefined);
  });

  it("should not have a score for a spare frame if there is not a next bowl yet", () => {
    const game = new BowlingGame();
    game.bowl(5);
    game.bowl(5);
    expect(game.round(1).subtotal).toBe(undefined);
  });

  it("should add the pins from the next roll to the score of preceding spare frame", () => {
    const game = new BowlingGame();
    game.bowl(5);
    game.bowl(5);
    game.bowl(1);
    expect(game.round(1).subtotal).toBe(11);
  });

  it.skip("should not have a score for a frame unless the next two bowls", () => {
    const game = new BowlingGame();
    game.bowl(10);
    expect(game.round(1).subtotal).toBe(undefined);
    game.bowl(0);
    expect(game.round(1).subtotal).toBe(undefined);
  });

  it.skip("should add the value of the next two rolls to a strike frame", () => {
    const game = new BowlingGame();
    game.bowl(10);
    game.bowl(1);
    game.bowl(2);
    expect(game.round(1).subtotal).toBe(13);
  });
});

describe("Bowling playthroughs", () => {
  it.skip("should score a full game", () => {
    const game = new BowlingGame();
    game.bowl(1);
    game.bowl(4);
    game.bowl(6);
    game.bowl(4);
    game.bowl(5);
    game.bowl(5);
    game.bowl(10);
    game.bowl(0);
    game.bowl(1);
    game.bowl(7);
    game.bowl(3);
    game.bowl(6);
    game.bowl(4);
    game.bowl(10);
    game.bowl(2);
    game.bowl(8);
    game.bowl(6);
    expect(game.score()).toBe(133);
  });
});
