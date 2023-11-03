export type Round = {
  bowl_1: undefined | number;
  bowl_2: undefined | number;
  subtotal: undefined | number;
};

const ROUNDS = 10;

const NOT_BOWLED = -1;
type BOWL = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

class Frame {
  private bowl_1: BOWL;
  private bowl_2: BOWL;
  private total: number;
  private previous: Frame | undefined;
  private next: Frame | undefined;
  private round: number;

  constructor(round: number, previous: Frame | undefined) {
    this.round = round;
    this.bowl_1 = -1;
    this.bowl_2 = -1;
    this.total = 0;
    this.previous = previous;
    this.next = undefined;
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

  private isStrike() {
    return this.bowl_1 == 10;
  }

  private isSpare() {
    const bowled_both = this.bowl_1 != NOT_BOWLED && this.bowl_2 != NOT_BOWLED;
    const total = this.bowl_1 + this.bowl_2;
    return bowled_both && total == 10;
  }

  bowl(pins: BOWL): void {
    if (this.bowl_1 == NOT_BOWLED) {
      this.bowl_1 = pins;
      if (this.previous) this.previous.onNextBowl_1(pins);
    } else if (this.bowl_2 == NOT_BOWLED) {
      this.bowl_2 = pins;
      if (this.previous) this.previous.onNextBowl_2(pins);
    }
    throw new Error(`Frame ${this.round} already fulled bowled`);
  }

  getTotal() {
    return this.total;
  }
}

export default class BowlingGame {
  private subtotal = 0;

  private rounds: Array<Frame> = new Array();

  constructor() {
    for (let round = 0; round < ROUNDS; round++) {
      const frame = new Frame(
        round,
        round == 0 ? undefined : this.rounds[round - 1]
      );
      this.rounds.push(frame);
    }
  }

  score(): number {
    this.subtotal = 0;
    this.rounds.forEach((frame: Frame) => {
      this.subtotal += frame.getTotal();
    });
    return this.subtotal;
  }

  bowl(pins: BOWL): void {
    this.validateBowl(pins);
    this.subtotal += pins;
    for (let i = 0; i < ROUNDS; i++) {
      if (this.rounds[i] == undefined) {
        this.handle_bowl_1(pins, i);
        break;
      } else if (this.rounds[i].bowl_2 == undefined) {
        this.handle_bowl_2(pins, i);
        break;
      }
    }
  }

  private validateBowl(pins: number) {
    if (pins < 0 || pins > 10)
      throw new Error(
        `InvalidBowlError: bowl must be in range 1-10, received ${pins} is out`
      );
  }

  private handle_bowl_1(pins: number, round: number) {
    this.rounds[round].bowl_1 = pins;
    this.rounds[round].subtotal = pins;
    const not_round_1 = round > 0;
    const carry_spare =
      not_round_1 && this.rounds[round - 1].subtotal == undefined;
    if (not_round_1 && carry_spare) {
      const spare_bowl_1 = this.rounds[round - 1].bowl_1 || 0;
      const spare_bowl_2 = this.rounds[round - 1].bowl_2 || 0;
      this.rounds[round - 1].subtotal = spare_bowl_1 + spare_bowl_2 + pins;
    }
  }

  private handle_bowl_2(pins: number, round: number) {
    this.rounds[round].bowl_2 = pins;
    const bowl_1 = this.rounds[round].bowl_1 || 0;
    const bowl_2 = this.rounds[round].bowl_2 || 0;
    const subtotal = bowl_1 + bowl_2;
    this.rounds[round].subtotal = subtotal == 10 ? undefined : bowl_1 + bowl_2;
  }

  round(round: number): Round {
    if (round < 1 || round > 10)
      throw new Error(
        `InvalidRoundError: round must be in range 1-10, received ${round} is out`
      );

    return this.rounds[round - 1];
  }
}
