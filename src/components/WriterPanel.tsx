"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toSpellingFriendly } from "@/lib/spelling";
import { SpellingModeView } from "./SpellingModeView";

interface WriterPanelProps {
  code: string;
  initialText: string;
  creatorToken: string;
}

const PLACEHOLDER = `Name or company
example@email.com
Confirmation number: AB-2941`;

export function WriterPanel({
  code,
  initialText,
  creatorToken,
}: WriterPanelProps) {
  const [text, setText] = useState(initialText);
  const [saving, setSaving] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const updateRoomText = useMutation(api.rooms.updateRoomText);
  const clearRoomText = useMutation(api.rooms.clearRoomText);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const saveText = useCallback(
    async (newText: string) => {
      setSaving(true);
      try {
        await updateRoomText({ code, text: newText, creatorToken });
      } catch (err) {
        console.error("Failed to save:", err);
      } finally {
        setSaving(false);
      }
    },
    [code, creatorToken, updateRoomText]
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      void saveText(newText);
    }, 300);
  };

  const handleClear = async () => {
    setText("");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    try {
      await clearRoomText({ code, creatorToken });
    } catch (err) {
      console.error("Failed to clear:", err);
    }
  };

  const spellingText = toSpellingFriendly(text);

  return (
    <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">Writer Mode</h2>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-slate-500">
            {text.length} character{text.length !== 1 ? "s" : ""}
            {saving ? " · saving..." : ""}
          </span>
          <button
            type="button"
            onClick={handleClear}
            disabled={!text}
            className="min-h-10 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear Text
          </button>
        </div>
      </div>

      <textarea
        value={text}
        onChange={handleChange}
        placeholder={PLACEHOLDER}
        className="min-h-[240px] w-full resize-y rounded-2xl border border-slate-200 bg-white p-4 text-lg leading-relaxed text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        autoFocus
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="mb-2 text-sm font-medium text-slate-600">Raw text</p>
          <SpellingModeView text={text} />
        </div>
        <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-4">
          <p className="mb-2 text-sm font-medium text-brand-700">
            Spelling-friendly version
          </p>
          <SpellingModeView text={spellingText} />
        </div>
      </div>
    </section>
  );
}
