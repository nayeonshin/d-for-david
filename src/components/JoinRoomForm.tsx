"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { normalizeRoomCode, isValidRoomCode } from "@/lib/room-code";

export function JoinRoomForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const normalized = normalizeRoomCode(code);
    if (!isValidRoomCode(normalized)) {
      setError("Enter a 3-digit room code.");
      return;
    }

    router.push(`/${normalized}`);
  };

  const handleChange = (value: string) => {
    setCode(normalizeRoomCode(value));
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">
      <label htmlFor="room-code" className="block text-sm font-medium text-slate-700">
        Join with a code
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="room-code"
          type="text"
          value={code}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="123"
          maxLength={3}
          className="min-h-14 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-center font-mono text-2xl font-bold uppercase tracking-widest text-slate-900 shadow-sm placeholder:text-slate-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          autoComplete="off"
          autoCorrect="off"
          inputMode="numeric"
          autoCapitalize="off"
          spellCheck={false}
        />
        <button
          type="submit"
          disabled={code.trim().length < 3}
          className="min-h-14 rounded-xl border border-slate-200 bg-white px-8 py-4 text-lg font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Join Room
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
