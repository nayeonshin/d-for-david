const WORD_CODE_PATTERN = /^[A-Z]+-[A-Z]+$/;
const LEGACY_CODE_PATTERN = /^[A-Z0-9]{5}$/;

const CODE_ADJECTIVES = [
  "AQUA",
  "BRIGHT",
  "CALM",
  "COZY",
  "EASY",
  "FRESH",
  "MINT",
  "NICE",
  "SUNNY",
  "TIDY",
];

const CODE_NOUNS = [
  "BREEZE",
  "CLOUD",
  "COVE",
  "FERN",
  "GROVE",
  "HARBOR",
  "MAPLE",
  "MEADOW",
  "RIVER",
  "WAVE",
];

export function normalizeRoomCode(code: string): string {
  return code.toUpperCase().replace(/[^A-Z0-9-]/g, "").replace(/-+/g, "-");
}

export function isValidRoomCode(code: string): boolean {
  const normalized = normalizeRoomCode(code);
  return WORD_CODE_PATTERN.test(normalized) || LEGACY_CODE_PATTERN.test(normalized);
}

export function generateReadableRoomCode(): string {
  const adjective =
    CODE_ADJECTIVES[Math.floor(Math.random() * CODE_ADJECTIVES.length)];
  const noun = CODE_NOUNS[Math.floor(Math.random() * CODE_NOUNS.length)];
  return `${adjective}-${noun}`;
}
