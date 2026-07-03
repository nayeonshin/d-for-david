const NEW_CODE_PATTERN = /^\d{3}$/;
const LEGACY_CODE_PATTERN = /^\d{6}$/;
const LEGACY_ROOM_CODE_PATTERN = /^[A-Z]+-[A-Z]+$/;
const LEGACY_SHORT_CODE_PATTERN = /^[A-Z0-9]{5}$/;

export function normalizeRoomCode(code: string): string {
  return code.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function isValidRoomCode(code: string): boolean {
  const normalized = normalizeRoomCode(code);
  return (
    NEW_CODE_PATTERN.test(normalized) ||
    LEGACY_CODE_PATTERN.test(normalized) ||
    LEGACY_ROOM_CODE_PATTERN.test(normalized) ||
    LEGACY_SHORT_CODE_PATTERN.test(normalized)
  );
}

export function generateReadableRoomCode(): string {
  const min = 100;
  const max = 999;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}
