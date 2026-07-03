"use client";

import { useState, useCallback } from "react";

interface CopyButtonProps {
  label: string;
  value: string;
  className?: string;
}

export function CopyButton({ label, value, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [value]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex min-h-12 items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-3 text-base font-medium text-ink shadow-sm transition hover:bg-slate-50 active:scale-[0.98] ${className}`}
    >
      {copied ? "Copied!" : label}
    </button>
  );
}
