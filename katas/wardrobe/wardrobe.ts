export default class Wall {
  private length: number;
  private segments: number[];
  constructor({ length }: { length: number }) {
    this.length = length;
    this.segments = [];
  }

  combinations() {
    const combinations: number[][] = [];
    this.segments.forEach((segment: number) => {
      if (segment == this.length) {
        combinations.push([segment]);
      } else if (segment < this.length && this.length % segment == 0) {
        const numberOfSegs = this.length / segment;
        const multiSegment: number[] = [];
        for (let i = 0; i < numberOfSegs; i++) {
          multiSegment.push(segment);
        }
        combinations.push(multiSegment);
      }
    });
    return combinations;
  }

  addSegments(segments: number[]) {
    segments.forEach((segment: number) => {
      if (this.segments.indexOf(segment) == -1) {
        this.segments = [...this.segments, segment];
      }
    });
  }
}
