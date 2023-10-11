const DEFAULT_DELIMITERS = "\n,";
const DEFAULT_DELIMITERS_REGEX = new RegExp(`[${DEFAULT_DELIMITERS}]+`);

function hasCustomDelimiter(input: string) {
    return input.startsWith("//");
}

function validate(input: string, delimiters: string) {
  if (!input.length) return;

  if (!hasCustomDelimiter(input) && delimiters != DEFAULT_DELIMITERS) {
    throw new Error(
      "Must use default delimiters if delimiter is not specified by user."
    );
  }

  const validChars = new RegExp(`[${delimiters}]+|[0-9]+`);
  if (hasCustomDelimiter(input)) {
    Array.from(input
        .slice(input.indexOf("\n") + 1))
      .forEach((_char) => {
        if (!validChars.test(_char)) {
          throw new Error("invalid character");
        }
      });
  } else {
    input.split(DEFAULT_DELIMITERS_REGEX).forEach((_char) => {
      if (!validChars.test(_char)) {
        throw new Error("invalid character");
      }
    });
  }

  if (delimiterToRegex(delimiters).test(input[input.length - 1])) {
    throw new Error("Last character must not be a separator");
  }
  if (delimiterToRegex(delimiters).test(input[0])) {
    throw new Error("First character must not be a separator");
  }
}

function extractDelimiter(input: string): string {
  if (input.startsWith("//")) {
    const from = 2;
    const to = input.indexOf("\n");
    return input.slice(from, to);
  } else {
    return "\n,";
  }
}

function delimiterToRegex(input: string) {
  return new RegExp(`[${extractDelimiter(input)}]+`);
}

function hasDelimiters(input: string) {
  return input.startsWith("//");
}

function removeDelimiter(input: string) {
  if (hasDelimiters(input)) {
    return input.slice(input.indexOf("\n") + 1);
  }
  return input;
}

function parseInput(input: string): number[] {
  const delimiters = delimiterToRegex(input);
  validate(input, extractDelimiter(input));
  return removeDelimiter(input)
    .split(delimiters)
    .map((numString: string) => {
      return Number.parseInt(numString);
    });
}

export class StringCalculator {
  static Add(input: string) {
    if (!input) return 0;

    return parseInput(input).reduce((acc: number, curr: number) => {
      return acc + curr;
    }, 0);
  }
}
