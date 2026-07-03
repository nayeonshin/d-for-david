import Link from "next/link";

export function InvalidRoomState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="max-w-xl space-y-2 rounded-2xl border border-black/10 bg-white px-6 py-8 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-500">
          D for David
        </p>
        <h1 className="text-3xl font-semibold text-ink">Room not found</h1>
        <p className="text-slate-700">
          That code doesn&apos;t match any active room. Double-check the code
          from the person on the phone, or ask them to create a new one.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex min-h-12 items-center justify-center rounded-xl border border-black/10 bg-white px-8 py-3 text-lg font-medium text-ink shadow-sm transition hover:bg-slate-50 active:scale-[0.98]"
      >
        Back to homepage
      </Link>
    </div>
  );
}
