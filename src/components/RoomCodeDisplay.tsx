interface RoomCodeDisplayProps {
  code: string;
}

export function RoomCodeDisplay({ code }: RoomCodeDisplayProps) {
  return (
    <div className="text-center">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.28em] text-slate-600">
        Room code
      </p>
      <p
        className="text-4xl font-black tracking-[0.1em] text-ink sm:text-6xl"
        aria-label={`Room code ${code.split("").join(" ")}`}
      >
        {code}
      </p>
      <p className="mt-2 text-sm text-slate-600">
        Say it as digits:{" "}
        <span className="font-semibold text-ink">{code.split("").join(" ")}</span>
      </p>
    </div>
  );
}
