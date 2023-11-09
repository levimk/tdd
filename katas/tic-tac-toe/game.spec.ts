import { it, describe, expect } from "vitest";
import { Game, Board, Field, FieldMap, Coordinates } from "./game";

/*
Setup
there are two players in the game (X and O)
a game has nine fields in a 3x3 grid

Play
a player can take a field if not already taken
players take turns taking fields until the game is over

End game
a game is over when all fields are taken
a game is over when all fields in a row are taken by a player
a game is over when all fields in a column are taken by a player
a game is over when all fields in a diagonal are taken by a player
*/

describe("Tic Tac Toe", () => {
  describe("Game", () => {
    it("should start a game on 3x3 board", () => {
      const createGame = () => new Game(3);
      expect(createGame).not.toThrow();
    });
    it("should a on a board that is too small", () => {
      const createGame = (n: number) => () => new Game(n);
      expect(createGame(-1)).toThrow();
      expect(createGame(0)).toThrow();
      expect(createGame(1)).toThrow();
    });

    it("should move on to the next player after one player has taken a turn", () => {
      const game = new Game(3);
      game.takeTurn(0, 0);
      game.takeTurn(1, 2);
      const board = new Board(3);
      board.mark(Field.X, 0, 0);
      board.mark(Field.O, 1, 2);
      expect(game.getBoard()).toEqual(board);
    });

    it("should allow a player to take a turn", () => {
      const game = new Game(3);
      const field_0x0 = new Field();
      field_0x0.mark(Field.X);
      game.takeTurn(0, 0);
      expect(game.getBoard().field(0, 0)).toEqual(field_0x0);
      const field_1x1 = new Field();
      field_1x1.mark(Field.O);
      game.takeTurn(1, 1);
      expect(game.getBoard().field(1, 1)).toEqual(field_1x1);
    });

    it("should be finished when all the squares are full", () => {});
  });

  describe.skip("Player", () => {
    it.skip("should...", () => {
      expect(true).toBe(false);
    });
  });

  describe("Board", () => {
    it("should be a square", () => {
      const board_3x3 = new Board(3);
      expect(board_3x3.size()).toBe(9);
      const board_4x4 = new Board(4);
      expect(board_4x4.size()).toBe(16);
    });

    it("should be a valid size", () => {
      const createBoard = (n: number) => () => new Board(n);
      expect(createBoard(0)).toThrow();
      expect(createBoard(-1)).toThrow();
    });

    it("should mark fields", () => {
      const board = new Board(3);
      const expectedField_1 = new Field();
      const expectedField_2 = new Field();

      board.mark(Field.X, 1, 1);
      expectedField_1.mark(Field.X);
      expect(board.field(1, 1)).toEqual(expectedField_1);

      board.mark(Field.O, 0, 0);
      expectedField_2.mark(Field.O);
      expect(board.field(0, 0)).toEqual(expectedField_2);
    });

    it("should have empty fields by default", () => {
      const board = new Board(3);
      const expectedField = new Field();
      expect(board.field(1, 1)).toEqual(expectedField);
    });

    it("should not allow out of bounds marks", () => {
      const board = new Board(3);
      const outOfBounds_1 = () => board.mark(Field.X, 0, -1);
      const outOfBounds_2 = () => board.mark(Field.X, -1, 0);
      const outOfBounds_3 = () => board.mark(Field.X, 3, 4);
      const outOfBounds_4 = () => board.mark(Field.X, 4, 3);
      expect(outOfBounds_1).toThrow();
      expect(outOfBounds_2).toThrow();
      expect(outOfBounds_3).toThrow();
      expect(outOfBounds_4).toThrow();
    });

    it("should not get out of bounds fields", () => {
      const board = new Board(3);
      const outOfBounds_1 = () => board.field(0, -1);
      const outOfBounds_2 = () => board.field(-1, 0);
      const outOfBounds_3 = () => board.field(3, 4);
      const outOfBounds_4 = () => board.field(4, 3);
      expect(outOfBounds_1).toThrow();
      expect(outOfBounds_2).toThrow();
      expect(outOfBounds_3).toThrow();
      expect(outOfBounds_4).toThrow();
    });

    it("should list all fields as available by default", () => {
      const board = new Board(3);
      const expected: Coordinates = [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
      ];
      expect(board.availableFields()).toStrictEqual(expected);
    });

    it("should have no available fields after all the fields are marked", () => {
      const board = new Board(3);
      board.mark(Field.X, 0, 0);
      board.mark(Field.X, 0, 1);
      board.mark(Field.X, 0, 2);
      board.mark(Field.X, 1, 0);
      board.mark(Field.X, 1, 1);
      board.mark(Field.X, 1, 2);
      board.mark(Field.X, 2, 0);
      board.mark(Field.X, 2, 1);
      board.mark(Field.X, 2, 2);
      expect(board.availableFields()).toStrictEqual([]);
    });
  });

  describe("Field", () => {
    it("should be empty by default", () => {
      const field = new Field();
      expect(field.getMark()).toBe(undefined);
    });

    it("should mark with X", () => {
      const field = new Field();
      field.mark(Field.X);
      expect(field.getMark()).toBe(Field.X);
    });

    it("should mark with O", () => {
      const field = new Field();
      field.mark(Field.O);
      expect(field.getMark()).toBe(Field.O);
    });

    it("should not be able to mark twice", () => {
      const field = new Field();
      field.mark(Field.O);
      const remark = () => field.mark(Field.O);
      expect(remark).toThrow();
    });

    it("should handle equality", () => {
      const field_1 = new Field();
      const field_2 = new Field();
      field_1.mark(Field.X);
      field_2.mark(Field.X);
      expect(field_1).toEqual(field_2);
      const field_3 = new Field();
      const field_4 = new Field();
      field_3.mark(Field.O);
      field_4.mark(Field.O);
      expect(field_3).toEqual(field_4);
    });
  });
});
