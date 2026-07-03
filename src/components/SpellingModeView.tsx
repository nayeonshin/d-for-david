interface SpellingModeViewProps {
  text: string;
  large?: boolean;
}

export function SpellingModeView({ text, large = false }: SpellingModeViewProps) {
  if (!text.trim()) {
    return (
      <p className="text-slate-400 italic">
        Spelling mode will appear here when there is text.
      </p>
    );
  }

  return (
    <pre
      className={`whitespace-pre-wrap font-sans leading-relaxed text-slate-700 ${
        large ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
      }`}
    >
      {text}
    </pre>
  );
}
