const CREATOR_TOKEN_PREFIX = "dfd_creator_";

export function getCreatorTokenKey(code: string): string {
  return `${CREATOR_TOKEN_PREFIX}${code.toUpperCase()}`;
}

export function saveCreatorToken(code: string, token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(getCreatorTokenKey(code), token);
}

export function getCreatorToken(code: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(getCreatorTokenKey(code));
}

export function isRoomCreator(code: string): boolean {
  return getCreatorToken(code) !== null;
}
