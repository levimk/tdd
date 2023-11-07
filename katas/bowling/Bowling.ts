export type Round = {
  bowl_1: undefined | number;
  bowl_2: undefined | number;
  subtotal: undefined | number;
};

const ROUNDS = 10;
const STRIKE = 10;
const NOT_BOWLED = undefined;
type BOWL = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type ROUND = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export class Frame {
  private bowl_1: BOWL | undefined;
  private bowl_2: BOWL | undefined;
  private bowl_3: BOWL | undefined;
  private total: number;
  private previous: Frame | undefined;
  private round: number;

  constructor(round: ROUND, previous: Frame | undefined) {
    this.round = round;
    this.bowl_1 = undefined;
    this.bowl_2 = undefined;
    this.bowl_3 = undefined;
    this.total = 0;
    this.previous = previous;
    this.validateRounds2to10();
  }

  public isBowled(): boolean {
    let isBowled = this.bowl_1 != NOT_BOWLED && this.bowl_2 != NOT_BOWLED;
    if (this.isFinalFrame()) {
      isBowled = isBowled && this.bowl_3 != NOT_BOWLED;
    }
    return isBowled;
  }

  private onNextBowl_1(pins: number) {
    if (this.isSpare() || this.isStrike()) {
      this.total += pins;
    }
  }

  private onNextBowl_2(pins: number) {
    if (this.isStrike()) {
      this.total += pins;
    }
  }

  public isStrike() {
    return this.bowl_1 == 10;
  }

  public isSpare() {
    const bowled_both = this.bowl_1 != NOT_BOWLED && this.bowl_2 != NOT_BOWLED;
    const total = (this.bowl_1 ?? 0) + (this.bowl_2 ?? 0);
    return bowled_both && total == 10;
  }

  bowl(pins: BOWL): void {
    if (this.isFinalFrame()) {
      this.handleRound10(pins);
    } else {
      this.handleNormalRound(pins);
    }
  }

  private validateRounds2to10() {
    if (this.round != 1 && this.previous == undefined) {
      throw new Error(
        `FrameError: round #${this.round} must have a previous frame.`
      );
    }
  }

  private isFinalFrame(): boolean {
    return this.round == ROUNDS;
  }

  handleNormalRound(pins: BOWL): void {
    if (this.bowl_1 == NOT_BOWLED) {
      this.bowl_1 = pins;
      if (pins == STRIKE) this.bowl_2 = 0;
      if (this.previous) this.previous.onNextBowl_1(pins);
    } else if (this.bowl_2 == NOT_BOWLED) {
      if (this.isStrike())
        throw new Error(
          `FrameError: cannot bowl frame again after strike (round #${this.round})`
        );
      this.bowl_2 = pins;
      if (this.previous) this.previous.onNextBowl_2(pins);
    } else {
      throw new Error(`Frame ${this.round} already fully bowled`);
    }
    this.total += pins;
  }

  handleRound10(pins: BOWL) {
    if (this.previous == undefined)
      throw new Error("FrameError: tenth frame must have a previous frame.");
    if (this.bowl_1 == NOT_BOWLED) {
      this.previous.onNextBowl_1(pins);
      this.bowl_1 = pins;
    } else if (this.bowl_2 == NOT_BOWLED) {
      this.previous.onNextBowl_2(pins);
      this.bowl_2 = pins;
    } else if (this.bowl_3 == NOT_BOWLED) {
      this.bowl_3 = pins;
    } else {
      throw new Error(`Frame ${this.round} already fully bowled`);
    }
    this.total += pins;
  }

  frameTotal() {
    return this.total;
  }

  runningTotal(): number {
    return (
      this.total +
      (this.previous != undefined ? this.previous.runningTotal() : 0)
    );
  }

  getBowl_1(): BOWL | undefined {
    return this.bowl_1;
  }

  getBowl_2(): BOWL | undefined {
    return this.bowl_2;
  }

  equals(other: unknown): boolean {
    if (!(other instanceof Frame)) {
      return false;
    }
    return (
      other.round == this.round &&
      other.bowl_1 == this.bowl_1 &&
      other.bowl_2 == this.bowl_1
    );
  }
}

export default class BowlingGame {
  private rounds: Array<Frame> = new Array();

  constructor() {
    for (let round = 0; round < ROUNDS; round++) {
      const frame = new Frame(
        (round + 1) as ROUND,
        round == 0 ? undefined : this.rounds[round - 1]
      );
      this.rounds.push(frame);
    }
  }

  score(): number {
    return this.rounds.reduce((accumulator: number, curr: Frame) => {
      return accumulator + curr.frameTotal();
    }, 0);
  }

  bowl(pins: BOWL): void {
    this.validateBowl(pins);
    this.rounds.find((round: Frame) => !round.isBowled())?.bowl(pins);
  }

  private validateBowl(pins: number) {
    if (pins < 0 || pins > 10)
      throw new Error(
        `InvalidBowlError: bowl must be in range 1-10, received ${pins} is out`
      );
  }

  round(round: number): Frame {
    if (round < 1 || round > 10)
      throw new Error(
        `InvalidRoundError: round must be in range 1-10, received ${round} is out`
      );

    return this.rounds[round - 1];
  }
}
