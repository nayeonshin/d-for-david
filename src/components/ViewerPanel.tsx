"use client";

import { toSpellingFriendly } from "@/lib/spelling";
import { SpellingModeView } from "./SpellingModeView";

interface ViewerPanelProps {
  text: string;
}

export function ViewerPanel({ text }: ViewerPanelProps) {
  const spellingText = toSpellingFriendly(text);
  const hasText = text.trim().length > 0;

  return (
    <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">Viewer Mode</h2>
      </div>

      {!hasText ? (
        <div className="flex min-h-[40vh] items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8">
          <p className="text-center text-xl text-slate-400 sm:text-2xl">
            Waiting for the other person to type...
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm sm:p-8">
          <p className="mb-4 text-sm font-medium text-slate-500">Raw text</p>
          <SpellingModeView text={text} large />
          <p className="mb-4 mt-6 text-sm font-medium text-brand-700">
            Spelling-friendly version
          </p>
          <SpellingModeView text={spellingText} large />
        </div>
      )}
    </section>
  );
}
