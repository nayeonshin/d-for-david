interface ExpirationNoticeProps {
  code: string;
}

export function ExpirationNotice({ code }: ExpirationNoticeProps) {
  return (
    <p className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-center text-sm text-slate-700 shadow-sm">
      Tell the other person:{" "}
      <span className="font-semibold">
        Go to D for David and enter code {code}.
      </span>
    </p>
  );
}
