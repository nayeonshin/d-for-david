"use client";

import { useEffect, useState } from "react";
import { formatCountdown, getMsRemaining } from "@/lib/time";

interface CountdownTimerProps {
  expiresAt: number;
  onExpired?: () => void;
}

export function CountdownTimer({ expiresAt, onExpired }: CountdownTimerProps) {
  const [remaining, setRemaining] = useState(() => getMsRemaining(expiresAt));

  useEffect(() => {
    const tick = () => {
      const ms = getMsRemaining(expiresAt);
      setRemaining(ms);
      if (ms <= 0) {
        onExpired?.();
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [expiresAt, onExpired]);

  const isLow = remaining > 0 && remaining < 5 * 60 * 1000;

  return (
    <p
      className={`text-sm font-medium ${
        remaining <= 0
          ? "text-slate-500"
          : isLow
            ? "text-slate-700"
            : "text-slate-600"
      }`}
    >
      {remaining <= 0
        ? "Room expired"
        : `Expires in ${formatCountdown(remaining)}`}
    </p>
  );
}
