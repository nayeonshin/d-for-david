const ALPHABET: Record<string, string> = {
  A: "Apple",
  B: "Boy",
  C: "Charlie",
  D: "David",
  E: "Edward",
  F: "Frank",
  G: "George",
  H: "Henry",
  I: "India",
  J: "John",
  K: "King",
  L: "Lincoln",
  M: "Mary",
  N: "Nancy",
  O: "Oscar",
  P: "Peter",
  Q: "Queen",
  R: "Robert",
  S: "Sam",
  T: "Tom",
  U: "Union",
  V: "Victor",
  W: "William",
  X: "X-ray",
  Y: "Yellow",
  Z: "Zebra",
};

const NUMBER_WORDS: Record<string, string> = {
  "0": "zero",
  "1": "one",
  "2": "two",
  "3": "three",
  "4": "four",
  "5": "five",
  "6": "six",
  "7": "seven",
  "8": "eight",
  "9": "nine",
};

const SYMBOL_WORDS: Record<string, string> = {
  "@": "at",
  ".": "dot",
  _: "underscore",
  "-": "dash",
  "/": "slash",
};

export function toSpellingFriendly(text: string): string {
  const lines: string[] = [];
  const textLines = text.split("\n");

  for (let lineIndex = 0; lineIndex < textLines.length; lineIndex++) {
    const line = textLines[lineIndex];
    const tokens: string[] = [];

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === " ") {
        tokens.push("");
        continue;
      }

      const upper = char.toUpperCase();
      if (ALPHABET[upper]) {
        tokens.push(`${upper} as in ${ALPHABET[upper]}`);
      } else if (NUMBER_WORDS[char]) {
        tokens.push(`${char} ${NUMBER_WORDS[char]}`);
      } else if (SYMBOL_WORDS[char]) {
        tokens.push(SYMBOL_WORDS[char]);
      } else {
        tokens.push(char);
      }
    }

    // Group tokens with blank lines between "words" (space-separated groups)
    const groups: string[][] = [[]];
    for (const token of tokens) {
      if (token === "") {
        if (groups[groups.length - 1].length > 0) {
          groups.push([]);
        }
      } else {
        groups[groups.length - 1].push(token);
      }
    }

    const formattedGroups = groups
      .filter((g) => g.length > 0)
      .map((g) => g.join("\n"));

    if (formattedGroups.length > 0) {
      lines.push(formattedGroups.join("\n\n"));
    } else if (line.length === 0) {
      lines.push("");
    }
  }

  return lines.join("\n\n");
}
