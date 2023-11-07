import { describe, it, expect } from "vitest";
import BowlingGame, { Frame } from "./Bowling";
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

describe("Bowling Game", () => {
  it("should start the game on 0", () => {
    const game = new BowlingGame();
    expect(game.score()).toBe(0);
  });

  it("should not accept bowls below 0 or above 10", () => {
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
    expect(game.round(1).getBowl_1()).toBe(1);
    expect(game.round(1).getBowl_2()).toBe(4);
    expect(game.round(1).frameTotal()).toBe(5);
  });

  it("should not have scores for rounds that have not been played yet", () => {
    const game = new BowlingGame();
    game.bowl(1);
    game.bowl(4);
    expect(game.round(2).getBowl_1()).toBe(undefined);
    expect(game.round(2).getBowl_2()).toBe(undefined);
    expect(game.round(2).frameTotal()).toBe(0);
    expect(game.score()).toBe(5);
  });

  it("should add the value of the next two rolls to a strike frame", () => {
    const game = new BowlingGame();
    game.bowl(10);
    game.bowl(1);
    game.bowl(2);
    expect(game.round(1).frameTotal()).toBe(13);
  });
});

describe("Frame", () => {
  describe("Normal frame", () => {
    it("should record bowl 1 of a normal frame", () => {
      const frame = new Frame(1, undefined);
      frame.bowl(1);
      expect(frame.frameTotal()).toBe(1);
    });
    it("should record bowl 2 of a normal frame", () => {
      const frame = new Frame(1, undefined);
      frame.bowl(1);
      frame.bowl(1);
      expect(frame.frameTotal()).toBe(2);
    });
    it("should add the previous frame's total to the running total", () => {
      const frame_1 = new Frame(1, undefined);
      const frame_2 = new Frame(2, frame_1);
      frame_1.bowl(1);
      frame_1.bowl(4);
      frame_2.bowl(4);
      frame_2.bowl(5);
      expect(frame_1.frameTotal()).toBe(5);
      expect(frame_2.frameTotal()).toBe(9);
      expect(frame_2.runningTotal()).toBe(14);
    });
    it("should take 3 bowls for final frame", () => {
      const frame_1 = new Frame(1, undefined);
      const frame_2 = new Frame(2, frame_1);
      const frame_3 = new Frame(3, frame_2);
      const frame_4 = new Frame(4, frame_3);
      const frame_5 = new Frame(5, frame_4);
      const frame_6 = new Frame(6, frame_5);
      const frame_7 = new Frame(7, frame_6);
      const frame_8 = new Frame(8, frame_7);
      const frame_9 = new Frame(9, frame_8);
      const frame_10 = new Frame(10, frame_9);
      frame_9.bowl(1);
      frame_9.bowl(2);
      frame_10.bowl(3);
      frame_10.bowl(4);
      frame_10.bowl(5);
      expect(frame_10.frameTotal()).toBe(12);
      expect(frame_10.runningTotal()).toBe(15);
    });
  });
  describe("Spare frame", () => {
    it("should spare", () => {
      const frame = new Frame(1, undefined);
      frame.bowl(9);
      frame.bowl(1);
      expect(frame.isSpare()).toBe(true);
    });
    it("should add the first bowl of the next frame", () => {
      const frame_1 = new Frame(1, undefined);
      const frame_2 = new Frame(2, frame_1);
      frame_1.bowl(9);
      frame_1.bowl(1);
      frame_2.bowl(3);
      frame_2.bowl(4);
      expect(frame_1.frameTotal()).toBe(13);
      expect(frame_2.runningTotal()).toBe(20);
    });
  });
  describe("Strike frame", () => {
    it("should strike", () => {
      const frame = new Frame(1, undefined);
      frame.bowl(10);
      const badBowl = () => frame.bowl(1);
      expect(badBowl).toThrow();
      expect(frame.frameTotal()).toBe(10);
    });
    it("should add both bowls of the next frame", () => {
      const frame_1 = new Frame(1, undefined);
      const frame_2 = new Frame(2, frame_1);
      frame_1.bowl(10);
      frame_2.bowl(3);
      frame_2.bowl(4);
      expect(frame_1.frameTotal()).toBe(17);
      expect(frame_2.runningTotal()).toBe(24);
    });
  });
});

describe("Bowling playthroughs", () => {
  it("should score a full game", () => {
    const game = new BowlingGame();
    game.bowl(1);
    game.bowl(4);

    game.bowl(4);
    game.bowl(5);

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

    expect(game.round(1).runningTotal()).toBe(5);
    expect(game.round(2).runningTotal()).toBe(14);
    expect(game.round(3).runningTotal()).toBe(29);
    expect(game.round(4).runningTotal()).toBe(49);
    expect(game.round(5).runningTotal()).toBe(60);
    expect(game.round(6).runningTotal()).toBe(61);
    expect(game.round(7).runningTotal()).toBe(77);
    expect(game.round(8).runningTotal()).toBe(97);
    expect(game.round(9).runningTotal()).toBe(117);
    expect(game.round(10).frameTotal()).toBe(16);
    expect(game.round(10).runningTotal()).toBe(133);
    expect(game.score()).toBe(133);
  });
});
